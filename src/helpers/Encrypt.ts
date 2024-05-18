import crypto from 'crypto-js';

const Encrypt = (data: any): string => {
  return crypto.AES.encrypt(
    JSON.stringify(data),
    process.env.NEXT_PUBLIC_SALT as string
  ).toString();
};

export default Encrypt;
