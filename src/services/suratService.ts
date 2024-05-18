import SuratModel, { TafsirModel } from '@/models/suratModel';
import axios from 'axios';

export async function getSurat(nomorSurat: number): Promise<SuratModel | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_1}/surat/${nomorSurat}`
    );
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function getTafsir(
  nomorSurat: number
): Promise<TafsirModel | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_1}/tafsir/${nomorSurat}`
    );
    return data.data;
  } catch (error) {
    return null;
  }
}
