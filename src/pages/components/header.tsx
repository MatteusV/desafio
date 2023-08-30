import { CoordsProps } from '../currentCity/[...coords]'
import { DecidedWhichImage } from './decidedWhichImage'

export function Header({ informations }: CoordsProps) {
  return (
    <header className="flex gap-16 w-3/6 bg-slate-600 p-5 rounded-3xl">
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
