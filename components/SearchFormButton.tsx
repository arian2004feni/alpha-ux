"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

const SearchFormButton = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  }
  return (
    <Button className="rounded-full size-8" type="reset" onClick={reset}>
      <Link href="/" className=""><X className="size-4" /></Link>
    </Button>
  );
};

export default SearchFormButton;