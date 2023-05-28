'use client'

import { ArrowDown, ArrowUp } from "lucide-react"
import { useState } from "react"

interface ReadMoreProps {
  content: string,
}

export default function ReadMore({ content }: ReadMoreProps) {

  const [isOpen, setIsOpen] = useState<Boolean>(false)

  return (
    <>
      {isOpen ? (
        <div>
          <p className="text-lg leading-relaxed text-gray-300">
            {content}
          </p>

          <span
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-400 w-max cursor-pointer"
          >
            Ler menos
            <ArrowUp className="w-4 h-4" />
          </span>
        </div>
      ) : (
        <div>
          <p className="text-lg leading-relaxed text-gray-300">
            {content.substring(0, 140).concat('...')}
          </p>

          <span
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-400 w-max cursor-pointer"
          >
            Ler mais
            <ArrowDown className="w-4 h-4" />
          </span>
        </div>
      )}

    </>
  )
}