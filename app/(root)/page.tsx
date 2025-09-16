import ArticleCards, { ArticleTypeCards } from "@/components/ArticleCards";
import SearchForm from "@/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/query";
// import { title } from "process";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const {data: articles} = await sanityFetch({query: ARTICLES_QUERY})
  return (
    <>
      <section className="bg-black text-white py-10">
        <h1 className="text-center text-5xl">Hero Section</h1>
        <SearchForm query={query} />
      </section>
      <section>
        <h2>{query ? `Search Result for "${query}"` : "All Articles"}</h2>
        <ul className="grid grid-cols-3 gap-2">
          {articles?.map((article: ArticleTypeCards) => (
            <li key={article?._id}>
              <ArticleCards article={article} />
            </li>
          ))}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
