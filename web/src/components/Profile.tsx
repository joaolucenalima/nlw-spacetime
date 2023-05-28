import Image from 'next/image'

import { getUser } from '@/lib/auth'

export function Profile() {

  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">

      <div className="flex h-10 w-10 items-center justify-center rounded-full">
        <Image src={avatarUrl} width={40} height={40} alt='Perfil do usuário' className='w-10 h-10 rounded-full' />
      </div>

      <div className='text-sm leading-snug max-w-[140px]'>
        <p className='text-gray-100'>{name}</p>
        <a href="/api/auth/logout" className='text-red-500 hover:text-red-400'>Sair</a>
      </div>

    </div >
  )
}