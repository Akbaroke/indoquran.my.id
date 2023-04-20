'use client'
const GetPathLocation = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.split('/')[1]
  } else {
    return ''
  }
}

export default GetPathLocation
