import Image from "next/image";
import { cookies } from "next/headers";

import { EmptyMemories } from "@/components/EmptyMemories";
import ReadMore from "@/components/ReadMore";
import { api } from "@/lib/api";

import dayjs from "dayjs";
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

interface Memory {
  id: string,
  coverUrl: string,
  content: string,
  createdAt: string
}

export default async function Home() {

  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map(memory => {
        return (
          <div key={memory.id} className="space-y-4">

            <time
              className="flex items-center gap-2 text-sm text-gray-400 -ml-8 before:h-px before:w-5 before:bg-gray-400"
            >
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>

            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="w-full aspect-video object-cover rounded-lg"
            />

            {memory.content.length > 140 ? (
              <ReadMore content={memory.content} />
            ) : (
              <p className="text-lg leading-relaxed text-gray-300">
                {memory.content}
              </p>
            )}

          </div>
        )
      })}
    </div>
  )
}
