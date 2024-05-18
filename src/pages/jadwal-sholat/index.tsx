import CardJadwalSholat from '@/components/CardJadwalSholat';
import Countdown from '@/components/Countdown';
import ToggleMuteAdzan from '@/components/ToggleMuteAdzan';
import {
  findNextPrayerTime,
  findPrevPlayerTime,
} from '@/helpers/findPrayerTime';
import getImageTime from '@/helpers/getImageTime';
import { JadwalSholatModel, KotaModel } from '@/models/jadwalSholatModel';
import { StoreModel } from '@/models/stateModel';
import { setBookmarkAdzan } from '@/redux/slices/bookmarkSlice';
import {
  setStatusAdzan,
  setAdzan,
  setLocationAdzan,
} from '@/redux/slices/adzanSlice';
import {
  getAllKota,
  getJadwalOneDay,
  getJadwalOneMonth,
  getLocation,
  getSearchKota,
} from '@/services/jadwalSholatService';
import {
  Badge,
  Center,
  Loader,
  RingProgress,
  Select,
  SimpleGrid,
  Skeleton,
  Tabs,
  Text,
  rem,
} from '@mantine/core';
import {
  IconBell,
  IconCalendarStats,
  IconClock,
  IconMapPin,
} from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_NIGHT_KABAH } from '@/assets';
import TableJadwal from '@/components/TableJadwal';
import Metadata from '@/components/Metadata';
import { MetadataModel } from '@/models/metadataModel';

type Props = {
  kota: KotaModel[];
  metadata: MetadataModel;
};

export default function JadwalSholat({ kota, metadata }: Props) {
  const dispatch = useDispatch();
  const [locationId, setLocationId] = useState('auto');
  const { currentTime, nextAdzan, percentage, status } = useSelector(
    (state: StoreModel) => state.adzan
  );
  const { adzan } = useSelector((state: StoreModel) => state.bookmark);
  const [jadwal, setJadwal] = useState<JadwalSholatModel | null>(null);
  const [jadwalBulan, setJadwalBulan] = useState<JadwalSholatModel[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJadwalBulan, setisLoadingJadwalBulan] = useState(false);

  // GET JADWAL SHOLAT
  useEffect(() => {
    const getDataJadwal = async (locationId: string) => {
      const res = await getJadwalOneDay(
        locationId,
        moment().format('YYYY/MM/DD')
      );
      setJadwal(res?.jadwal as JadwalSholatModel);
      setIsLoading(false);
    };

    if (locationId !== 'auto') {
      getDataJadwal(locationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId]);

  // GET AUTO LOCATION
  useEffect(() => {
    if (locationId !== 'auto') return;
    getLocation().then((response) => {
      getSearchKota(response).then((value) => {
        if (!value) return setLocationId('1301'); // default jakarta
        setLocationId(value?.id);
        dispatch(
          setLocationAdzan({
            location: value.lokasi.toLowerCase(),
          })
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId]);

  // Find Next Jadwal
  useEffect(() => {
    if (!jadwal) return;
    const findNextTime = findNextPrayerTime(
      {
        imsak: jadwal.imsak,
        subuh: jadwal.subuh,
        dhuha: jadwal.dhuha,
        dzuhur: jadwal.dzuhur,
        ashar: jadwal.ashar,
        maghrib: jadwal.maghrib,
        isya: jadwal.isya,
      },
      currentTime
    );
    const findPrevTime = findPrevPlayerTime(
      {
        imsak: jadwal.imsak,
        subuh: jadwal.subuh,
        dhuha: jadwal.dhuha,
        dzuhur: jadwal.dzuhur,
        ashar: jadwal.ashar,
        maghrib: jadwal.maghrib,
        isya: jadwal.isya,
      },
      currentTime
    );
    if (findNextTime === null) {
      dispatch(
        setStatusAdzan({
          status: 'already',
        })
      );
    }
    if (!findNextTime?.prayerName && !findNextTime?.time) return;
    if (currentTime !== nextAdzan.time) {
      dispatch(
        setAdzan({
          prevAdzan: {
            name: findPrevTime ? findPrevTime.prayerName : 'isya',
            time: findPrevTime ? findPrevTime.time : jadwal.isya,
          },
          nextAdzan: {
            name: findNextTime.prayerName,
            time: findNextTime.time,
          },
        })
      );
    }
  }, [currentTime, dispatch, jadwal, nextAdzan.time]);

  const getDataJadwalBulan = async (locationId: string) => {
    setisLoadingJadwalBulan(true);
    const res = await getJadwalOneMonth(locationId, moment().format('YYYY/MM'));
    setJadwalBulan(res?.jadwal as JadwalSholatModel[]);
    setisLoadingJadwalBulan(false);
  };

  return (
    <>
      <Metadata {...metadata} />
      <div className="flex justify-between items-center">
        <Text fw={700} fs="italic" size="xl">
          Jadwal Sholat
        </Text>
      </div>
      <Skeleton visible={isLoading} radius="lg">
        <div className="rounded-xl overflow-hidden shadow-md border w-full lg:max-w-[900px] m-auto mt-5">
          <div className="w-full relative bg-cWhite">
            <Image
              src={
                status === 'already'
                  ? IMAGE_NIGHT_KABAH
                  : getImageTime(nextAdzan.name)
              }
              alt="IndoQuran"
              className="object-fill object-center w-full sm:h-[300px] h-[250px]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {status === 'already' ? (
                <div className="bg-black/10 backdrop-blur-sm p-5 rounded-md shadow-md border border-cPrimary">
                  <p className="italic font-semibold text-white text-center">
                    Jadwal Sholat Hari ini Sudah Selesai
                  </p>
                </div>
              ) : (
                <RingProgress
                  size={180}
                  thickness={5}
                  sections={[
                    {
                      value: percentage,
                      color: 'teal',
                      width: 150,
                      height: 150,
                    },
                  ]}
                  label={
                    <Center>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full w-[150px] h-[150px] flex flex-col gap-2 items-center justify-center">
                        {status === 'adzan' ? (
                          <Badge
                            variant="filled"
                            color="teal"
                            size="md"
                            radius="lg"
                            styles={{
                              label: {
                                textTransform: 'capitalize',
                              },
                            }}>
                            Waktu {nextAdzan.name}
                          </Badge>
                        ) : (
                          <Badge
                            variant="light"
                            color="teal"
                            styles={{
                              label: {
                                textTransform: 'capitalize',
                              },
                            }}>
                            Waktu {nextAdzan.name}
                          </Badge>
                        )}
                        <h1 className="text-[40px] font-bold leading-8 text-cPrimary">
                          {nextAdzan.time}
                        </h1>
                        {status === 'waiting' && (
                          <div className="text-center font-medium text-white leading-6">
                            <p className="text-[12px]">menunggu</p>
                            <Countdown targetTime={nextAdzan.time} />
                          </div>
                        )}
                      </div>
                    </Center>
                  }
                />
              )}
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center flex-wrap gap-2 w-full">
              <Select
                placeholder="Pilih Lokasi Kota"
                onChange={(e) => setLocationId(e as string)}
                value={locationId}
                data={[
                  {
                    value: 'auto',
                    label: 'Auto',
                  },
                  ...kota?.map((item) => ({
                    value: item.id,
                    label: item.lokasi.toLowerCase(),
                  })),
                ]}
                allowDeselect={false}
                className="font-semibold w-full sm:w-max"
                leftSection={
                  <IconMapPin style={{ width: rem(16), height: rem(16) }} />
                }
                size="xs"
                styles={{
                  dropdown: {
                    textTransform: 'capitalize',
                  },
                  input: {
                    textTransform: 'capitalize',
                  },
                }}
                comboboxProps={{
                  transitionProps: { transition: 'pop', duration: 200 },
                  shadow: 'md',
                }}
              />
              <div className="flex items-center gap-3 flex-row-reverse sm:flex-row w-full sm:w-max">
                <ToggleMuteAdzan />
                <Select
                  placeholder="Pilih Suara Azan"
                  onChange={(e) => {
                    dispatch(
                      setBookmarkAdzan({
                        isPlaying: false,
                        irama: e as string,
                      })
                    );
                  }}
                  value={adzan?.irama ?? ''}
                  data={[
                    {
                      value: 'jiharkah',
                      label: 'Adzan Jiharkah',
                    },
                    {
                      value: 'kurdi',
                      label: 'Adzan Kurdi',
                    },
                    {
                      value: 'mekkah',
                      label: 'Adzan Mekkah',
                    },
                  ]}
                  allowDeselect={false}
                  className="font-semibold w-full sm:w-max flex-1 sm:flex-none"
                  leftSection={
                    <IconBell style={{ width: rem(16), height: rem(16) }} />
                  }
                  size="xs"
                  comboboxProps={{
                    transitionProps: { transition: 'pop', duration: 200 },
                    shadow: 'md',
                  }}
                />
              </div>
            </div>
            <Tabs
              color="teal"
              variant="outline"
              radius="md"
              defaultValue="hari"
              onChange={(e) => {
                if (e === 'bulan' && !jadwalBulan) {
                  getDataJadwalBulan(locationId);
                }
              }}
              className="mt-8 pb-5">
              <Tabs.List grow>
                <Tabs.Tab
                  value="hari"
                  leftSection={<IconClock style={iconStyle} />}>
                  Hari ini
                </Tabs.Tab>
                <Tabs.Tab
                  value="bulan"
                  leftSection={<IconCalendarStats style={iconStyle} />}>
                  Bulan ini
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="hari">
                <Badge
                  styles={{
                    label: {
                      textTransform: 'capitalize',
                    },
                  }}
                  variant="light"
                  color="rgba(0, 0, 0, 1)"
                  className="mb-3 mt-5 w-max">
                  {jadwal?.tanggal} - {currentTime}
                </Badge>
                <div className="flex flex-wrap gap-3 justify-center">
                  <CardJadwalSholat
                    label="imsak"
                    time={jadwal?.imsak}
                    isActive={nextAdzan.name === 'imsak'}
                  />
                  <CardJadwalSholat
                    label="subuh"
                    time={jadwal?.subuh}
                    isActive={nextAdzan.name === 'subuh'}
                  />
                  <CardJadwalSholat
                    label="dhuha"
                    time={jadwal?.dhuha}
                    isActive={nextAdzan.name === 'dhuha'}
                  />
                  <CardJadwalSholat
                    label="dzuhur"
                    time={jadwal?.dzuhur}
                    isActive={nextAdzan.name === 'dzuhur'}
                  />
                  <CardJadwalSholat
                    label="ashar"
                    time={jadwal?.ashar}
                    isActive={nextAdzan.name === 'ashar'}
                  />
                  <CardJadwalSholat
                    label="maghrib"
                    time={jadwal?.maghrib}
                    isActive={nextAdzan.name === 'maghrib'}
                  />
                  <CardJadwalSholat
                    label="isya"
                    time={jadwal?.isya}
                    isActive={nextAdzan.name === 'isya'}
                  />
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="bulan">
                {isLoadingJadwalBulan ? (
                  <div className="grid place-items-center mt-10">
                    <Loader color="teal" size="sm" />
                  </div>
                ) : (
                  <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing={{ base: 10 }}>
                    {jadwalBulan?.map((item, index) => (
                      <div key={index}>
                        <Badge
                          styles={{
                            label: {
                              textTransform: 'capitalize',
                            },
                          }}
                          variant="light"
                          color="rgba(0, 0, 0, 1)"
                          className="mb-3 mt-5 w-max">
                          {item.tanggal}
                        </Badge>
                        <TableJadwal data={item} />
                      </div>
                    ))}
                  </SimpleGrid>
                )}
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </Skeleton>
    </>
  );
}

const iconStyle = { width: rem(12), height: rem(12) };

export async function getServerSideProps() {
  const kota = await getAllKota();
  let metadata: MetadataModel = {};
  metadata.title = 'Jadwal Sholat';
  metadata.metaDescription = 'Website ini menampilkan Jadwal Sholat Dhuha, Subuh, Dzuhur, Ashar, Maghrib, Isya dan Jam Imsak';

  return {
    props: {
      kota,
      metadata,
    },
  };
}
