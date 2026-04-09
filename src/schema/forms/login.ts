import z from "zod";

export default z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
