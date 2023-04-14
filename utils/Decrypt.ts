import { StateStore } from '@/interfaces'
import crypto from 'crypto-js'

const Decrypt = (data: string): StateStore => {
  return JSON.parse(
    crypto.AES.decrypt(data, process.env.SALT as string).toString(
      crypto.enc.Utf8
    )
  )
}

export default Decrypt
