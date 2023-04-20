/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import 'swiper/swiper-bundle.css'
import CardJamSholat from './CardJamSholat'

SwiperCore.use([Navigation])

interface SwiperComponentProps {
  datas: {
    nama: string
    jam?: string
    active?: boolean
  }[]
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ datas }) => {
  const [cardActive, setCardActive] = React.useState(0)
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null)
  const swiperRef = React.useRef<any>(null)

  React.useEffect(() => {
    datas.map((data, index) => {
      if (data.active) {
        setCardActive(index)
      }
    })
  }, [datas])

  React.useEffect(() => {
    if (swiperRef.current && !swiperInstance) {
      setSwiperInstance(swiperRef.current.swiper)
    }
  }, [swiperRef, swiperInstance])

  React.useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(cardActive)
    }
  }, [swiperInstance, cardActive])

  return (
    <div className="sm:hidden">
      <Swiper ref={swiperRef} spaceBetween={20} navigation={false}>
        {datas.map((data, index) => (
          <SwiperSlide key={index}>
            <CardJamSholat
              nama={data.nama}
              jam={data.jam}
              active={data.active}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperComponent
