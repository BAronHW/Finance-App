"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { color } from "framer-motion"
import styles from '../app/(auth)/sign-up/sign-up.module.css'

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Name must contain at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Name must contain at least 1 character.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(9, {
    message: "Password must be at least 9 characters long."
  }),
  confirmPassword: z.string().min(9, {
    message: "Password must be at least 9 characters long."
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).optional(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters."
  }).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match.",
  path: ["confirmPassword"],
}).transform((data) => ({
  ...data,
  username: data.username ? data.username : data.email, 
}));

export function SignUpForm() {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      phone: "",
    },
  })

  async function onSubmit() {
    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-center">
        <div className={styles.sameLineInput}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name<span style={{color: "red"}}>&nbsp;*</span></FormLabel>
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
                <FormLabel>Last Name<span style={{color: "red"}}>&nbsp;*</span></FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Email<span style={{color: "red"}}>&nbsp;*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password<span style={{color: "red"}}>&nbsp;*</span></FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password<span style={{color: "red"}}>&nbsp;*</span></FormLabel>
              <FormControl>
                <Input type="password" placeholder="Re-enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="Enter your phone number" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
      <div className="mt-6 space-y-4 text-center">
        <p className="text-lg">Already have an account?</p>
        <Link href="/sign-in" passHref>
          <Button className={styles.paddedButton}>Sign In</Button>
        </Link>
      </div>
    </Form>
  )
}

export default SignUpForm;