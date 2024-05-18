import {
  HaditsDetailModel,
  ItemsHaditsType,
  OptionHaditsModel,
} from '@/models/haditsModel';
import axios from 'axios';

export async function getAllHadits(): Promise<OptionHaditsModel[]> {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_HADITS as string
    );
    return data;
  } catch (error) {
    return [];
  }
}

export async function getHadits(
  slug: string,
  page?: number
): Promise<HaditsDetailModel | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HADITS}/${slug}?page=${page ?? 1}&limit=10`
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getNomorHadits(
  slug: string,
  nomor: number
): Promise<ItemsHaditsType | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HADITS}/${slug}/${nomor}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
