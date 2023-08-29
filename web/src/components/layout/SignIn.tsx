import { User } from 'lucide-react'

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=e5a6fedc94b25362cfbf`}
      className="flex items-center gap-3 text-left hover:text-gray-100 transition-colors"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
        <User className='h-5 w-5 text-gray-500' />
      </div>

      <p className='text-sm leading-snug max-w-[140px] hover:underline'>
        Crie sua conta e salve suas memórias!
      </p>

    </a>
  )
}