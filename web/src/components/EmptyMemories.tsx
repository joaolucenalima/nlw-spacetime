export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="text-center leading-relaxed w-{360px}">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a
          target='_blank'
          rel="noreferrer"
          href=""
          className="underline hover:text-gray-100"
        >
          criar agora!
        </a>
      </p>
    </div>
  )
}