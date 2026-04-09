import z from "zod";

export default z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be no more than 20 characters")
      .refine(
        (password) => /[A-Z]/.test(password),
        "Must contain at least one uppercase letter",
      )
      .refine(
        (password) => /[a-z]/.test(password),
        "Must contain at least one lowercase letter",
      )
      .refine(
        (password) => /[0-9]/.test(password),
        "Must contain at least one number",
      )
      .refine(
        (password) => /[^A-Za-z0-9]/.test(password),
        "Must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
