"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/store/use-auth";
import Link from "next/link";

export default function RegisterForm() {
  const { register, registerForm: form } = useAuth();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(register)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Role</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGO Representative">
                      NGO Representative
                    </SelectItem>
                    <SelectItem value="Researcher / Academian">
                      Researcher / Academian
                    </SelectItem>
                    <SelectItem value="Community Organizer">
                      Community Organizer
                    </SelectItem>
                    <SelectItem value="Business Leader">
                      Business Leader
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 mb-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-out duration-300"
          >
            Register
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-sm">
            already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login here
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
