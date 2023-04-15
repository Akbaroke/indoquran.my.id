'use client'
import { StateStore } from '@/interfaces'
import Encrypt from '@/utils/Encrypt'

export default function SaveStore(data: StateStore): void {
  const result = Encrypt(data)
  localStorage.setItem('store', result)
}
