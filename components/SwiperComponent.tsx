import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import CardJamSholat from './CardJamSholat'

interface SwiperComponentProps {
  datas: {
    nama: string
    jam?: string
  }[]
  active?: number
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ datas }) => {
  return (
    <div className="sm:hidden">
      <Swiper spaceBetween={20} initialSlide={1}>
        {datas.map((data, index) => (
          <SwiperSlide key={index}>
            <CardJamSholat nama={data.nama} jam={data.jam} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperComponent
