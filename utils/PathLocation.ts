'use client'
const PathLocation = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.split('/')[1]
  } else {
    return ''
  }
}

export default PathLocation
