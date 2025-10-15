import { auth } from "@/auth";
import AuthorPosts from "@/components/AuthorPosts";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/query";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <>
      <section className="px-5 xl:flex gap-10 mt-12 max-w-10/12 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="bg-orange-800 rounded-2xl text-white flex flex-col items-center p-6 gap-4 relative">
            <h1 className="text-3xl font-bold ring-5 w-72 px-3 text-center line-clamp-1 bg-white text-black absolute -top-5">
              {user?.name}
            </h1>
            <img
              src={user?.image}
              alt={user?.name}
              className="rounded-full size-80 ring-2 mt-5"
            />
            <p className="text-2xl font-bold">@{user?.username}</p>
            <p className="text-lg text-center">{user?.bio}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 max-xl:mt-10">
          <p className="text-2xl font-bold">{session?.id === id ? "Your" : `${user?.name}'s`} Article</p>
          <ul className="grid sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-5 justify-center items-center">
            <Suspense fallback={<p>loading...</p>}>
              <AuthorPosts id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
