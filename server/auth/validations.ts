import { z } from "zod";

export const LoginValidationSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterValidationSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    role: z.string().trim().min(1, "Role is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least one digit")
      .regex(
        /^(?=.*[^A-Za-z0-9])/,
        "Password must contain at least one special character"
      )
      .regex(/^.{8,}$/, "Password must be at least 8 characters long"),
    confirm_password: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });
