import { CoordsProps } from '@/types/coordsProps'
import { DecidedWhichImage } from './decidedWhichImage'

export function Header({ informations }: CoordsProps) {
  return (
    <header className="flex gap-16 w-3/6 2xl:w-[40rem] justify-between bg-slate-600 p-8 rounded-3xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold">{informations.city_name}</h1>
          <p className="text-slate-300">
            Volume da chuva:{' '}
            <span className="text-lg">
              {informations.rain}
              <span className="text-xs">mm</span>
            </span>
          </p>
          <p className="text-slate-300">
            Velocidade do vento:{' '}
            <span className="text-lg">{informations.wind_speedy}</span>
          </p>
          <p className="text-slate-300">
            Direção do vento:{' '}
            <span className="text-lg">{informations.wind_direction}°</span>
          </p>
        </div>
        <p className="text-4xl font-semibold">{informations.temp}°</p>
      </div>
      <DecidedWhichImage
        informations={informations}
        key={informations.city_name}
      />
    </header>
  )
}
