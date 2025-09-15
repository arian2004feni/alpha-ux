import SearchForm from "@/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="bg-black text-white py-10">
        <h1 className="text-center text-5xl">Hero Section</h1>
        <SearchForm query={query}/>
      </section>
    </>
  );
}
