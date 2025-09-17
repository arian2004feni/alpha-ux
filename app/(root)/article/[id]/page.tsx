import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_ID_QUERY } from "@/sanity/lib/query";
import Image from "next/image";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/Views";
import Link from "next/link";

export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const md = markdownit();

  const article = await client.fetch(ARTICLE_BY_ID_QUERY, { id });

  const parsedBlog = md.render(article?.blog || "");

  return (
    <>
      <section className="bg-black text-white py-10">
        <h3 className="bg-amber-400 px-3 py-2 w-fit mx-auto mb-4">
          {formatDate(article._createdAt)}
        </h3>
        <h1 className="text-center text-5xl">{article.title}</h1>
        <p className="max-w-4xl mx-auto text-center mt-8 text-white/50">
          {article.description}
        </p>
      </section>
      <section className="container mx-auto mt-12 px-5">
        <img src={article.image} alt={article.title} />
        <div className="max-w-5xl mx-auto my-12">
          <div className="flex justify-between items-center">
            <Link href={`/author/${article?.author?._id}`} className="flex items-center gap-2">
              <Image
                src={article.author.image}
                alt={article.author.name}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="hover:underline">{article.author.name}</p>
                <p className="hover:underline">@{article.author.username}</p>
              </div>
            </Link>
            <Link href={`/?query=${article.category.toLowerCase()}`} className="bg-amber-100 py-3 px-4 rounded-full">
              {article.category}
            </Link>
          </div>
          {parsedBlog ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedBlog }}
              className="prose lg:prose-xl max-w-full mt-6 break-all"
            />
          ) : (
            <p>No content available</p>
          )}
        </div>
        <hr className="divider" />
        {/* TODO: Editor selected setup */}
        <Suspense fallback={<Skeleton className="bg-zinc-300 h-10 w-20 rounded-lg fixed bottom-3 right-3" />}>
          <Views id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
