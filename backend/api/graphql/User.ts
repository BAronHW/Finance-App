import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
import { Transaction } from "./Transaction";
import bcrypt from "bcrypt";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("firstName");
    t.string("lastName");
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.string("password"); // Google users don't have a password
    t.string("phone");
    t.nonNull.string("uid");
    t.nonNull.list.field("transactions", { type: Transaction });
  },
});

export const UID = objectType({
  name: 'uid',
  definition(t){
    t.nonNull.string('uid')
  },
})

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      async resolve(_root, _args, ctx) {
        const users = await ctx.db.user.findMany({
          include: {
            transactions: true,
          },
        });
        return users;
      },
    });
    t.nonNull.field("user", {
      type: "User",
      args: {
        uid: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { uid: args.uid },
          include: {
            transactions: true,
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
    t.field('fetchAccessTokenFromUser', {
      type: 'AccessToken',
      args: {
        userId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: {
            id: args.userId
          }
        });
        return {
          accessToken: user?.AccessToken
        };
      }
    });
    t.field('getuseruidfromuserid', {
      type: 'uid',
      args: {
        userId: nonNull(intArg())
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: {
            id: args.userId
          }
        });
    
        if (!user) {
          throw new Error(`No user found with ID ${args.userId}`);
        }
    
        if (!user.uid) {
          throw new Error(`User ${args.userId} has no UID`);
        }
    
        return {
          uid: user.uid
        }
      }
    })
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
        password: stringArg(),
        email: nonNull(stringArg()),
        uid: nonNull(stringArg()),
        phone: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        const hash = args.password
          ? await bcrypt.hash(args.password, 10)
          : null;
        return ctx.db.user.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            password: hash,
            email: args.email,
            uid: args.uid,
            phone: args.phone,
          },
          include: {
            transactions: true,
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
        password: stringArg(),
        email: nonNull(stringArg()),
        uid: nonNull(stringArg()),
        phone: stringArg(),
      },
      resolve: async (_root, args, ctx) => {
        const hash = args.password
          ? await bcrypt.hash(args.password, 10)
          : null;
        return ctx.db.user.update({
          where: { id: args.id },
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            password: hash ?? undefined,
            email: args.email,
            uid: args.uid,
          },
          include: {
            transactions: true,
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
            transactions: true,
          },
        });
      },
    });
    t.nonNull.field("emailSignIn", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.db.user.findUnique({
          where: { username: args.username },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            password: true,
            uid: true,
            phone: true,
            transactions: true,
          },
        });

        if (!user) {
          throw new Error("Invalid username");
        }

        if (!user.password) {
          throw new Error(
            "User signed in with Google and does not have stored password."
          );
        }

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new Error("Invalid username or password");
        }

        return user;
      },
    });
  },
});
