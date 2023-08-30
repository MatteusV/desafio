import { env } from '@/env'
import { weather } from '@/lib/weather-api'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import umbrela from '@/assets/umbrela.png'
import { Header } from '../components/header'
import { ZipCode } from '../components/zipCode'

export interface CoordsProps {
  informations: {
    temp: number
    date: Date
    humidity: number
    rain: number
    wind_speedy: number
    wind_direction: number
    city_name: string
  }
}

export default function CurrentCity({ informations }: CoordsProps) {
  const router = useRouter()
  return (
    <div className="w-screen h-auto flex bg-slate-900 px-4 py-2 text-white">
      <aside className="flex flex-col items-center gap-16 px-4 py-4 w-fit h-[calc(100vh-0.5rem)] bg-slate-600 rounded-xl">
        <button
          onClick={async () => {
            await router.push('/')
          }}
        >
          <Image
            className="rotate-[60deg] w-12 hover:cursor-pointer"
            src={umbrela}
            alt="Foto de um guarda chuva"
          />
        </button>

        <nav className="space-y-4">
          <a
            href="/"
            className="flex flex-col text-lg text-slate-200 font-semibold hover:text-white hover:cursor-pointer hover:underline"
          >
            Home
          </a>
          <a className="flex flex-col text-lg text-slate-200 font-semibold hover:text-white hover:cursor-pointer hover:underline">
            Weather
          </a>
          <a
            href="/contact"
            className="flex flex-col text-lg text-slate-200 font-semibold hover:text-white hover:cursor-pointer hover:underline"
          >
            Contato
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-2 pl-8 space-y-16">
        <Header informations={informations} />
        <ZipCode />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coords = params!.coords
  const response = await weather(
    `?key=${env.API_KEY_HG}&lat=${coords![0]}&lon=${
      coords![1]
    }&user_ip=remote&fields=only_results,temp,city_name,date,rain,humidity,wind_speedy,wind_direction`,
  )
  const informations = response.data

  return {
    props: {
      informations: {
        temp: informations.temp,
        date: informations.date,
        humidity: informations.humidity,
        rain: informations.rain,
        wind_speedy: informations.wind_speedy,
        wind_direction: informations.wind_direction,
        city_name: informations.city_name,
      },
    },
    revalidate: 10,
  }
}
