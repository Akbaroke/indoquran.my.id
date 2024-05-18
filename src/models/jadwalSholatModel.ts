export interface ResJadwalSholatModel {
  id: number;
  lokasi: string;
  daerah: string;
  jadwal: JadwalSholatModel | JadwalSholatModel[];
}

export interface JadwalSholatModel {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
}

export interface KotaModel {
  id: string;
  lokasi: string;
}