import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import NewMemoryForm from "@/components/NewMemoryForm";

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">

      <Link href='/' className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300">
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />

    </div>
  )
}