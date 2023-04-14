'use client'
import { StateStore } from '@/interfaces'
import Decrypt from '@/utils/Decrypt'

export default function Restore(): StateStore | null {
  const getData = localStorage.getItem('store')
  if (getData) {
    const result = Decrypt(getData)
    return result
  }
  return {
    like: [],
    bookmark: null,
  }
}
