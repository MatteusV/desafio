import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ContainerBanner from '../components/containerWithBanner'
import Image from 'next/image'

import umbrela from '@/assets/umbrela.png'

export default function Home() {
  const router = useRouter()
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition, showErrors)
  }, [])

  function showPosition(position: {
    coords: { longitude: number; latitude: number }
  }) {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  function showErrors(error: { message: string }) {
    alert(error.message)
  }

  function handleClickButton() {
    router.push(`/currentCity/${latitude}/${longitude}`)
  }

  return (
    <div className="w-screen bg-slate-950 h-screen p-8 flex text-white">
      <ContainerBanner />
      <div className="flex-1 w-1/2 h-full flex flex-col justify-center items-center gap-8">
        <Image
          className="rotate-45 w-16"
          src={umbrela}
          alt="Foto de um guarda chuva"
        />
        <div className="text-center">
          <h1 className="font-bold text-5xl">Plin</h1>
          <h2 className="text-lg text-slate-500">Weather App</h2>
        </div>

        <button
          onClick={handleClickButton}
          className="bg-sky-700 py-2 px-6 rounded-xl font-semibold hover:bg-sky-800"
        >
          Iniciar
        </button>
      </div>
    </div>
  )
}
