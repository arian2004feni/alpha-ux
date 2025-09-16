import ArticleCards from "@/components/ArticleCards";
import SearchForm from "@/components/SearchForm";
import { title } from "process";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const demo = [
    {
      title: "Demo Article",
      _id: "34554fg4",
      posted_date: new Date(),
      views: 12,
      category: 'demo',
      author: {
        _id: "@authorId",
        name: "Author Name",
        image: "https://placehold.co/100x100",
        bio: "Author bio goes here.",
      },
      description:
        "Lorem ipsum dolor, sit amet dddlkk consectetur adipisicing elit. Ducimus, optio soluta.  perspiciatis velit aliquam sunt similique necessitatibus adipisci fugit, provident ex magnam, earum dicta praesentium repudiandae? Fugit, aut quod.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, optio soluta. Ea perspiciatis velit aliquam sunt similique necessitatibus adipisci fugit, provident ex magnam, earum dicta praesentium repudiandae? Fugit, aut quod.",
      image: "https://i.ibb.co.com/kVSkv2Bd/Screenshot-2025-08-13-223739.png",
      pitch: "This is a demo pitch for the article.",
    },
  ];

  return (
    <>
      <section className="bg-black text-white py-10">
        <h1 className="text-center text-5xl">Hero Section</h1>
        <SearchForm query={query} />
      </section>
      <section>
        <h2>{query ? `Search Result for "${query}"` : "All Articles"}</h2>
        <ul className="grid grid-cols-3 gap-2">
          {demo?.map((article) => (
            <li key={article?._id}><ArticleCards article={article} /></li>
          ))}
        </ul>
      </section>
    </>
  );
}
