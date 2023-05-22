import { cookies } from 'next/headers'

import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'
import { MainText } from '@/components/MainText'
import { Footer } from '@/components/Footer'
import { EmptyMemories } from '@/components/EmptyMemories'

export default function Home() {

  const isAuthenticated = cookies().has('token')

  return (
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

      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>

    </main>
  )
}
