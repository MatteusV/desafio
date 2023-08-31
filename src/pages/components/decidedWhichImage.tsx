import Image from 'next/image'

import cloudSun from '@/assets/cloud-sun.png'
import sun from '@/assets/sun.png'
import cloudSunWithRain from '@/assets/cloud-sun-with-rain.png'
import cloudWithRain from '@/assets/cloud-with-rain.png'
import cloud from '@/assets/cloud.png'
import { CoordsProps } from '@/types/coordsProps'

export function DecidedWhichImage({ informations }: CoordsProps) {
  return (
    <div className="pt-5">
      {informations.temp < 25 && informations.rain > 2 && (
        <Image
          src={cloudSunWithRain}
          alt="uma foto com sol e uma nuvem carregada com chuva"
          width={100}
        />
      )}

      {informations.temp > 25 && informations.rain > 2 && (
        <Image
          src={cloudSun}
          alt="uma foto com sol e uma nuvem carregada com chuva"
          width={100}
        />
      )}

      {informations.temp < 25 && (
        <Image
          src={cloud}
          alt="uma foto com sol e uma nuvem tampando um pouco do sol"
          width={100}
        />
      )}

      {informations.temp > 25 && (
        <Image src={sun} alt="desenho de um sol" width={100} />
      )}

      {informations.temp <= 15 && informations.rain > 4 && (
        <Image
          src={cloudWithRain}
          alt="desenho de uma nuvem carregada de chuva"
          width={100}
        />
      )}
    </div>
  )
}
