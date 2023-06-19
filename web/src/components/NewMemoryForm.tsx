'use client'

import Cookie from 'js-cookie';
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import MediaPicker from "@/components/MediaPicker";
import { api } from "@/lib/api";

export default function NewMemoryForm() {

  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const file = formData.get('coverUrl')

    let coverUrl = ''

    if (file) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', file)

      const uploadResponse = await api.post('/upload', uploadFormData)
      coverUrl = uploadResponse.data
    }

    const token = Cookie.get('token')

    await api.post('/memories', {
      coverUrl,
      content: formData.get('content'),
      isPublic: formData.get('isPublic')
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">

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
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-300"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-1 focus:ring-offset-zinc-900 focus:ring-purple-700"
          />
          Tornar memória pública
        </label>

      </div>

      <MediaPicker coverUrl={null} />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-300 placeholder:text-gray-500 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className='inline-block self-end rounded-full bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-800 transition-colors'
      >
        Salvar
      </button>

    </form>
  )
}