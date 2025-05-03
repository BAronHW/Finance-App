"use client";

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
import { LoaderCircle } from "lucide-react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

type GoogleSignUpSchemaType = {
  username?: string | undefined;
  firstName: string;
  lastName: string;
  phone?: string | undefined;
};

type GoogleSignUpFormData = UseFormReturn<GoogleSignUpSchemaType>;

type Props = {
  form: GoogleSignUpFormData;
  onSubmit: SubmitHandler<GoogleSignUpSchemaType>;
  isSubmitting: boolean;
};

export const GoogleSignUpForm = ({ form, onSubmit, isSubmitting }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center"
      >
        <div className="flex flex-row items-center justify-between w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name<span style={{ color: "red" }}>&nbsp;*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name<span style={{ color: "red" }}>&nbsp;*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="Enter your phone number"
                  placeholder="Phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin mr-2" /> Loading...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};
