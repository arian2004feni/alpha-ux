"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createArticle = async (
  state: any,
  form: FormData,
  blog: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "blog")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const formValues = {
      title,
      description,
      category,
      image: link,
      blog,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
    };

    const res = await writeClient.create({
      _type: "article",
      ...formValues,
    });

    return parseServerActionResponse({
      ...res,
      error: '',
      status: "SUCCESS"
    })

  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
