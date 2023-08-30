import Image from 'next/image'
import umbrela from '@/assets/umbrela.png'

export function ContainerBanner() {
  return (
    <div className="w-1/2 h-full bg-slate-700 flex items-center justify-center max-sm:hidden">
      <Image
        className="rotate-45 w-2/4"
        src={umbrela}
        alt="Foto de um guarda chuva"
      />
    </div>
  )
}
