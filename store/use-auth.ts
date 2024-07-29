"use client";

import {
  LoginValidationSchema,
  RegisterValidationSchema,
} from "@/server/auth/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySession } from "@/server/session";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import {
  login as server_login,
  logout as server_lopout,
  signup as server_signup,
} from "@/server/auth";

export function useAuth() {
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof RegisterValidationSchema>>({
    resolver: zodResolver(RegisterValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "R_001",
    },
  });

  async function login(credentials: z.infer<typeof LoginValidationSchema>) {
    try {
      Swal.fire({
        title: "Logging in...",
        text: "Please wait while we process your signup.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await server_login(credentials);
      Swal.close();
      if (response.success) {
        Swal.fire(
          "Login Successful",
          "You have signed up successfully!",
          "success"
        );
        router.push("/dashboard");
      } else {
        Swal.fire(
          "Signup Failed",
          `An error occurred during signup. Please try again. \'${response.data}\'`,
          "error"
        );
      }
    } catch (error) {
      Swal.close();
      Swal.fire(
        "Signup Failed",
        `An error occurred during signup. Please try again. ${error}`,
        "error"
      );
    }
  }

  async function register(values: z.infer<typeof RegisterValidationSchema>) {
    try {
      Swal.fire({
        title: "Signing Up...",
        text: "Please wait while we process your signup.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await server_signup(values);
      Swal.close();
      if (response.success) {
        Swal.fire(
          "Signup Successful",
          "You have signed up successfully!",
          "success"
        );
        router.push("/dashboard");
      } else {
        Swal.fire(
          "Signup Failed",
          `An error occurred during signup. Please try again. \'${response.data}\'`,
          "error"
        );
      }
    } catch (err) {
      Swal.close();
      Swal.fire(
        "Signup Failed",
        `An error occurred during signup. Please try again. \'${err}\'`,
        "error"
      );
    }
  }

  async function logout() {
    try {
      await server_lopout();
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/auth/login");
    }
  }

  return {
    verifySession,
    login,
    loginForm,
    register,
    registerForm,
    logout,
  };
}
