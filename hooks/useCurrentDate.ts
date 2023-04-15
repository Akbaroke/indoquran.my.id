import * as React from 'react'

const useCurrentDate = () => {
  const [dateNow, setDateNow] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(new Date())
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return dateNow
}

export default useCurrentDate
