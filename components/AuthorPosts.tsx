import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_AUTHOR_QUERY } from "@/sanity/lib/query";
import React from "react";
import ArticleCards, { ArticleTypeCards } from "./ArticleCards";

const AuthorPosts = async ({ id }: { id: string }) => {
  const articles = await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {articles?.length > 0 ? (
        articles.map((article: ArticleTypeCards) => (
          <ArticleCards key={article._id} article={article} />
        ))
      ) : (
        <p className="text-5xl">no</p>
      )}
    </>
  );
};

export default AuthorPosts;
