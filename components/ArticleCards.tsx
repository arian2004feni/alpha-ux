import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const ArticleCards = ({ article }: { article: articleTypeCards }) => {
  const {
    title,
    _id,
    description,
    image,
    author: { _id: authorId, name, image: authorImage, bio },
    posted_date,
    views,
    category,
  } = article;
  return (
    <div className="border-2 rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-5">
        <span className="p-2 bg-gray-200 rounded-4xl">
          {formatDate(posted_date)}
        </span>
        <span className="flex items-center gap-1">
          <EyeIcon className="" />
          {views}
        </span>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="">
          <Link href={`/author/${authorId}`} className="line-clamp-1">
            {name}
          </Link>
          <Link href={`/article/${_id}`}>
            <h3 className="line-clamp-1 text-2xl font-bold">{title}</h3>
          </Link>
        </div>
        <Link href={`/author/${authorId}`}>
          <Image
            src={authorImage}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
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
        <Link href={`/?query=${category.toLowerCase()}`}>{category}</Link>
        <Button asChild>
          <Link href={`/article/${_id}`}>Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default ArticleCards;
