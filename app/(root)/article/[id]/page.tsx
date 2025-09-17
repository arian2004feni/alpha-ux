
export const experimental_ppr = true
const page = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  return (
    <div>
      page {id}
    </div>
  );
};

export default page;