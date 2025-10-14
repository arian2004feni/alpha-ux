"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { formSchema } from "@/lib/validation";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/actions";

const ArticleForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blog, setBlog] = useState("");

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        blog,
      };
      
      await formSchema.parseAsync(formValues);
      console.log(formValues);

      const result = await createArticle(prevState, formData, blog);
      console.log(result);

      if (result.status === "SUCCESS") {
        toast.success("Article submitted successfully!");
        router.push(`/article/${result._id}`);
      }
      
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const fe = error.flatten().fieldErrors;

        toast.error("Please check your inputs and try again.");

        setErrors(fe as unknown as Record<string, string>);

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error occurred");

      return { ...prevState, error: "Something went wrong", status: "ERROR" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="max-w-3xl px-6 mx-auto my-10 flex flex-col gap-5"
    >
      <div>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          name="title"
          className="py-6 rounded-full mt-2 ring-2 focus-visible:ring-black"
          placeholder="Article Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          className="py-4 h-24 rounded-2xl mt-2 ring-2 focus-visible:ring-black"
          placeholder="Article description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <Input
          id="category"
          name="category"
          className="py-6 rounded-full mt-2 ring-2 focus-visible:ring-black"
          placeholder="Article category"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link">Image Link</label>
        <Input
          id="link"
          name="link"
          className="py-6 rounded-full mt-2 ring-2 focus-visible:ring-black"
          placeholder="Image link"
        />
        {errors.link && (
          <p className="text-red-500 text-sm mt-1">{errors.link}</p>
        )}
      </div>
      <div data-color-mode="light">
        <label htmlFor="blog">Blog</label>
        <MDEditor
          value={blog}
          onChange={(e) => setBlog(e as string)}
          id="blog"
          preview="edit"
          height={300}
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid black",
          }}
          textareaProps={{
            placeholder: "Describe your article in details...",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.blog && (
          <p className="text-red-500 text-sm mt-1">{errors.blog}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-black text-white rounded-full px-6 py-3 hover:bg-gray-800"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your Article"}
      </Button>
    </form>
  );
};

export default ArticleForm;
