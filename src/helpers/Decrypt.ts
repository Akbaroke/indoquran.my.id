import { BookmarkSliceState } from '@/models/stateModel';
import crypto from 'crypto-js';

const Decrypt = (data: any): BookmarkSliceState => {
  return JSON.parse(
    crypto.AES.decrypt(data, process.env.NEXT_PUBLIC_SALT as string).toString(
      crypto.enc.Utf8
    )
  );
};

export default Decrypt;
