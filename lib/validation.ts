import z from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long")
    .max(500, "Description must be at most 500 characters long"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters long")
    .max(100, "Category must be at most 50 characters long"),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType ? contentType.startsWith("image/") : false;
      } catch {
        return false;
      }
    }),
  blog: z.string().min(10, "Blog must be at least 10 characters long"),
});
