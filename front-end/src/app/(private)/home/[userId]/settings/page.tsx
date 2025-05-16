"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfilePicture } from "@/components/custom/pfp/ProfilePicture";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID, UPDATE_USER_DETAILS } from "@/lib/graphql/Users";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { SettingsSkeleton } from "@/components/custom/skeletons/SettingsSkeleton";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .optional(),
});

export default function SettingsPage() {
  const params = useParams();
  const userId = Array.isArray(params?.userId)
    ? Number(params?.userId[0])
    : Number(params?.userId);

  const { data, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: userId,
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const [updateUserDetails, { loading: updatingDetails }] = useMutation(
    UPDATE_USER_DETAILS,
    {
      variables: {
        id: userId,
        firstName: form.getValues("firstName"),
        lastName: form.getValues("lastName"),
        username: form.getValues("username"),
        email: form.getValues("email"),
        phone: form.getValues("phone"),
      },
      onCompleted: (data) => {
        console.log("User details updated successfully", { data });
      },
    }
  );

  useEffect(() => {
    if (data?.getUserById) {
      form.reset({
        username: data.getUserById.username || "",
        firstName: data.getUserById.firstName || "",
        lastName: data.getUserById.lastName || "",
        email: data.getUserById.email || "",
        phone: data.getUserById.phone || "",
      });
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUserDetails({
      variables: {
        id: userId,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        phone: values.phone,
      },
    });
  }

  if (userLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="w-1/2 justify-self-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 flex-1">
            <ProfilePicture
              className="w-40 h-40 rounded-full hover:opacity-75"
              userId={userId}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Change your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between w-full gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Change your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Change your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Change your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Change your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              className="mt-4"
              type="submit"
              disabled={
                Object.keys(form.formState.touchedFields).length === 0 ||
                updatingDetails
              }
            >
              {updatingDetails ? (
                <p>
                  <LoaderCircle className="animate-spin mr-2" />
                  Updating
                </p>
              ) : (
                "Update"
              )}{" "}
              Account Details
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
