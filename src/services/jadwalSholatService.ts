import {
  KotaModel,
  JadwalSholatModel,
  ResJadwalSholatModel,
} from '@/models/jadwalSholatModel';
import axios from 'axios';

export async function getAllKota(): Promise<KotaModel[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_2}/sholat/kota/semua`
    );
    return data.data;
  } catch (error) {
    return [];
  }
}

export async function getSearchKota(
  keyword: string
): Promise<KotaModel | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_2}/sholat/kota/cari/${keyword}`
    );
    return data.data[0];
  } catch (error) {
    return null;
  }
}

export async function getJadwalOneDay(
  kota_id: string,
  dateOfDay: string
): Promise<ResJadwalSholatModel | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_2}/sholat/jadwal/${kota_id}/${dateOfDay}`
    );
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function getJadwalOneMonth(
  kota_id: string,
  dateOfMonth: string
): Promise<ResJadwalSholatModel | null> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_2}/sholat/jadwal/${kota_id}/${dateOfMonth}`
    );
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function getLocationFronGeolocation(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_GETLOCATION}?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
    );
    return data.city;
  } catch (error) {
    return 'error';
  }
}

export async function getLocation(): Promise<string> {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_GETLOCATION as string
    );
    return data.city;
  } catch (error) {
    return 'error';
  }
}
