import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Toaster position="top-center" richColors />
    </main>
  );
}
