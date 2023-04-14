import { StateStore } from '@/interfaces'
import CryptoJS from 'crypto-js'

const Encrypt = (data: StateStore): string => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.SALT as string
  ).toString()
}

export default Encrypt
