'use client'
import * as React from 'react'

interface Location {
  city: string
  province: string
}

export default function Page() {
  const [location, setLocation] = React.useState<Location | null>(null)

  React.useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          if (response.ok) {
            const data = await response.json()
            const { state, city } = data.address
            setLocation({
              province: state,
              city: city.replace('Kabupaten', 'Kab. '),
            })
          } else {
            console.error(
              `Gagal mendapatkan informasi lokasi: ${response.status}`
            )
          }
        },
        error => {
          console.error(
            `Gagal mendapatkan koordinat geografis pengguna: ${error.message}`
          )
        }
      )
    }

    getLocation()
  }, [])

  return (
    <div>
      {location ? (
        <p>
          Anda berada di {location.city}, {location.province}
        </p>
      ) : (
        <p>Sedang mencari lokasi...</p>
      )}
    </div>
  )
}
