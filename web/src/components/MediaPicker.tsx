'use client'

import { FileWarning } from "lucide-react"
import { ChangeEvent, useState } from "react"

export default function MediaPicker({ coverUrl }: { coverUrl: string | null }) {

  const [preview, setPreview] = useState<string | null>(coverUrl)
  const [uploadError, setUploadError] = useState<string | null>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {

    const { files } = event.target

    if (!files) {
      return
    }

    if (files[0].size > 5 * 1024 * 1024) {
      setUploadError("O arquivo selecionado excede o tamanho máximo permitido de 5MB.")
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setUploadError(null)
    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onMediaSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {uploadError &&
        <span className="flex items-center gap-2 text-red-400 text-sm mb-2">
          <FileWarning className="h-4 w-4" />{uploadError}
        </span>
      }
      {preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover" />}
    </>
  )
}