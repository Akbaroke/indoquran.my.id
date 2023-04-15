import { StateStore } from '@/interfaces'
import crypto from 'crypto-js'

const Encrypt = (data: StateStore): string => {
  return crypto.AES.encrypt(
    JSON.stringify(data),
    process.env.SALT as string
  ).toString()
}

export default Encrypt
