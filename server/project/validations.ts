import { z } from "zod";

export const CreateProjectValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  end_date: z.string().min(1, "Deadline is required"),
  content: z.string().min(1, "Content is required"),
  sdg: z.string().min(1, "SDG is required"),
  description: z.string().min(1, "Atleast Add a description to your project"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  photos: z.array(z.string()).optional(),
  status: z.string(),
});
