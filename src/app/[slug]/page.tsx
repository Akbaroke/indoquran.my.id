import getData from "./getData";

interface dataSurat {
  nama: string,
  namaLatin: string,
  jumlahAyat: number,
  tempatTurun: string,
  arti: string,
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data: dataSurat = await getData(params.slug)

  return (
    <div>
      <div>
        <div>
          <p>{data.nama}</p>
          <p>{data.namaLatin}</p>
          <p>{data.tempatTurun} • {data.arti} • {data.jumlahAyat} Ayat</p>
        </div>
        <select name="" id="">
          <option value="">Buka Ayat</option>
        </select>
      </div>
      <p>surat id : {params.slug}</p>
    </div>
  )
}


