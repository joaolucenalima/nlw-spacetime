'use client'

import Cookie from 'js-cookie';
import { Camera, ChevronLeft } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import MediaPicker from "@/components/MediaPicker";
import { api } from "@/lib/api";

interface Memory {
  id: string,
  coverUrl: string,
  content: string,
  isPublic: boolean,
  createdAt: string
}

export default async function EditMemory({
  params
}: {
  params: { id: string }
}) {

  const { id } = params

  const token = Cookie.get('token')

  const router = useRouter()

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const memory: Memory = response.data

  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const file = formData.get('coverUrl')

    let coverUrl = memory.coverUrl

    if (file) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', file)

      const uploadResponse = await api.post('/upload', uploadFormData)
      coverUrl = uploadResponse.data
    }

    const date = new Date(String(formData.get('date')))

    await api.put(`/memories/${id}`, {
      coverUrl,
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
      date: date
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    router.push('/')
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">

      <Link href='/' className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300">
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <form onSubmit={handleEditMemory} className="flex flex-1 flex-col gap-2">

        <div className="flex items-center gap-4">

          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-400 hover:text-gray-300"
          >
            <Camera className="h-4 w-4" />
            Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-300 hover:cursor-pointer"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value="true"
              defaultChecked={memory.isPublic}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-500 hover:cursor-pointer focus:ring-1 focus:ring-offset-zinc-900 focus:ring-purple-700"
            />
            Tornar memória pública
          </label>

        </div>

        <MediaPicker coverUrl={memory.coverUrl} />

        <label htmlFor="date" className='text-sm text-gray-400'>
          Data da memória:
          <input
            type="date"
            name="date"
            className='cursor-text rounded ml-2 h-8 border-gray-700 bg-gray-800'
            defaultValue={memory.createdAt}
          />
        </label>

        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-300 placeholder:text-gray-500 focus:ring-0"
          defaultValue={memory.content}
        />

        <button
          type="submit"
          className='inline-block self-end rounded-full bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-800 transition-colors'
        >
          Salvar modificações
        </button>

      </form>
    </div>
  )
} 