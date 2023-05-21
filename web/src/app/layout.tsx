import { Roboto_Flex as Roboto, Bai_Jamjuree } from 'next/font/google'
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
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-zinc-900 text-gray-400`}>
        {children}
      </body>
    </html >
  )
}
