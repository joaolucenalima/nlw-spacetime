'use client'

import { Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EditDeleteButtons(props: { id: string }) {

  const router = useRouter()

  function redirectEdit() {
    router.push(`/memories/${props.id}/edit`)
  }

  return (
    <span className="flex gap-2">
      <Edit
        className="mr-2 h-4 w-4 cursor-pointer hover:text-white"
        onClick={redirectEdit}
      />
      <Trash2 className="h-4 w-4 cursor-pointer hover:text-white" />
    </span>
  )
}