import { auth } from "@/auth";
import ArticleForm from "@/components/ArticleForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="bg-black text-white text-center py-10 text-3xl font-bold">
        <h1>Create Your Article</h1>
      </section>
      <ArticleForm />
    </>
  );
};

export default page;
