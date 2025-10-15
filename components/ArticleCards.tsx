import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Article, Author } from "@/sanity/types";

export type ArticleTypeCards = Omit<Article, "author"> & {author?: Author};
const ArticleCards = ({ article }: { article: ArticleTypeCards }) => {
  const {
    title,
    _id,
    description,
    image,
    author,
    _createdAt,
    views,
    category,
  } = article;
  return (
    <div className="border-2 rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-5">
        <span className="p-2 bg-gray-200 rounded-4xl">
          {formatDate(_createdAt)}
        </span>
        <span className="flex items-center gap-1">
          <EyeIcon className="" />
          {views}
        </span>
      </div>
      <div className="flex justify-between items-center mb-3 gap-2">
        <div className="">
          <Link href={`/author/${author?._id}`} className="line-clamp-1">
            {author?.name}
          </Link>
          <Link href={`/article/${_id}`}>
            <h3 className="line-clamp-1 text-2xl font-bold" title={title}>{title}</h3>
          </Link>
        </div>
        <Link href={`/author/${author?._id}`} className="w-12 flex-shrink-0">
          <Image
            src={author?.image as string}
            alt='placehold'
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>
      </div>
      <Link href={`/article/${_id}`}>
      <p className="line-clamp-2 mb-3">{description}</p>
        <img
          src={image}
          alt="Image"
          className="rounded-md object-cover w-full h-40"
        />
      </Link>
      <div className="flex justify-between items-center mt-4 line-clamp-1">
        <Link href={`/?query=${category?.toLowerCase()}`}>{category}</Link>
        <Button asChild>
          <Link href={`/article/${_id}`}>Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default ArticleCards;
