import { Roboto_Flex as Roboto, Bai_Jamjuree } from 'next/font/google'
import { cookies } from 'next/headers'

import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'
import { MainText } from '@/components/MainText'
import { Footer } from '@/components/Footer'

import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: "--font-roboto" })
const baiJamjuree = Bai_Jamjuree({ subsets: ['latin'], weight: '700', variable: "--font-baiJamjuree" })

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Cápsula do tempo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isAuthenticated = cookies().has('token')

  return (

    < html lang="pt-br" >

      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-zinc-900 text-gray-400`}>

        <main className="grid grid-cols-2 min-h-screen">

          <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">

            {/*blur*/}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-900 opacity-50 blur-full" />

            {/*stripes*/}
            <div className="absolute right-1 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <MainText />
            <Footer />

          </div>

          <div className="flex flex-col max-h-screen overflow-y-auto bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>

        </main>

      </body>
    </html >
  )
}
