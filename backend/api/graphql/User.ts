import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import bcrypt from "bcrypt";
import { _coerceToDict } from "@langchain/core/dist/runnables/base";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/S3Bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("firstName");
    t.string("lastName");
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.string("phone");
    t.nonNull.string("uid");
    t.list.nonNull.field("Transactions", { type: "Transaction" });
    t.list.nonNull.field("Accounts", { type: "Account" });
    t.string("accessToken");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllUsers", {
      type: "User",
      async resolve(_root, _args, ctx) {
        const users = await ctx.db.user.findMany({
          include: {
            Transactions: true,
            Accounts: true,
          },
        });
        return users;
      },
    });
    t.nonNull.field("getUserByUid", {
      type: "User",
      args: {
        uid: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { uid: args.uid },
          include: {
            Transactions: true,
            Accounts: true,
          },
        });
        if (!user) {
          throw new Error(`No user with uid ${args.uid} found.`);
        }
        return user;
      },
    });
    /**
     * @param userId : an Integer that is the id of the user you wish to get access token for
     *
     * The idea of this query is to decrease the number of queries that you would need to make to the plaidAPI
     */
    t.field("getUserById", {
      type: "User",
      args: {
        userId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: {
            id: args.userId,
          },
        });

        if (!user) {
          throw new Error(`No user found with ID ${args.userId}`);
        }
        return user;
      },
    });
    t.boolean("usernameExists", {
      args: {
        username: nonNull(stringArg()),
      },
      resolve: async (_coerceToDict, args, ctx) => {
        const user = await ctx.db.user.findUnique({
          where: {
            username: args.username,
          },
          select: {
            id: true,
          },
        });
        if (!user) {
          return false;
        }
        return true;
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        uid: nonNull(stringArg()),
        phone: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        return await ctx.db.user.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            email: args.email,
            uid: args.uid,
            phone: args.phone,
          },
          include: {
            Transactions: true,
          },
        });
      },
    });
    t.nonNull.field("updateUserDetails", {
      type: "User",
      args: {
        id: nonNull(intArg()),
        firstName: stringArg(),
        lastName: stringArg(),
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        uid: nonNull(stringArg()),
        phone: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        return ctx.db.user.update({
          where: { id: args.id },
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            email: args.email,
            uid: args.uid,
          },
          include: {
            Transactions: true,
          },
        });
      },
    });
    t.nonNull.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.delete({
          where: { id: args.id },
          include: {
            Transactions: true,
          },
        });
      },
    });
    t.nonNull.string("updateProfilePhoto", {
      args: {
        userId: nonNull(intArg()),
      },
      resolve: async (_root, args, _ctx) => {
        const params = {
            Bucket: "finapp-pfp",
            Key: String(args.userId),
            ContentType: "PDF",
        }
        const command = new PutObjectCommand(params)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return url;
      }
    });
  }
});
