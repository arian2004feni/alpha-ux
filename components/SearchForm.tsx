import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import SearchFormButton from "./SearchFormButton";
import { Search } from "lucide-react";

export default function SearchForm({query}: {query?: string}) {
  return (
    <Form action="/" scroll={false} className="search-form">
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <Input
        name="query"
        defaultValue={query}
        className="py-1 px-2 border-none focus-visible:ring-0"
      />
      <div className="flex gap-2 items-center">
        {query && <SearchFormButton />}
        <Button className="size-8 rounded-full" type="submit"><Search className="size-5" /></Button>
      </div>
    </Form>
  );
}
