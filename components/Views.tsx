import { formatViewCount } from "@/lib/utils";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { ARTICLE_VIEWS_QUERY } from "@/sanity/lib/query";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const Views = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(ARTICLE_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3 bg-amber-100 rounded">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <div className="font-medium text-base px-4 py-2 rounded-lg capitalize">
        <span className="font-black">{totalViews}</span>{" "}
        {formatViewCount(totalViews)}
      </div>
    </div>
  );
};

export default Views;
