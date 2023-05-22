import Image from 'next/image'

import nlwLogo from '../assets/nlw-logo.svg'

export function MainText() {
  return (
    <div className='space-y-5'>

      <Image src={nlwLogo} alt='NLW Logo' />

      <div className='max-w-[420px] space-y-1'>
        <h1 className='text-white text-5xl font-bold leading-tight'>
          Sua cápsula do tempo
        </h1>
        <p className='text-lg leading-relaxed'>
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
        </p>
      </div>

      <a href="" className='inline-block rounded-full bg-green-600 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-800 transition-colors'>
        CADASTRAR LEMBRANÇA
      </a>

    </div>
  )
}