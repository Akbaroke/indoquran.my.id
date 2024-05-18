import { DoadoaModel, DoaharianModel, DoatahlilModel } from '@/models/doaModel';
import axios from 'axios';

export async function getDoaHarian(): Promise<DoaharianModel[]> {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_DOA_HARIAN as string
    );
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function getDoaDoa(): Promise<DoadoaModel[]> {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_DOA_DOA as string
    );
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function getDoaTahlil(): Promise<DoatahlilModel[]> {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_DOA_TAHLIL as string
    );
    return data.data;
  } catch (error) {
    return [];
  }
}
