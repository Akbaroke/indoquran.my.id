export default function CardJamSholat(props: { nama: string; jam?: string }) {
  return (
    <div
      className="w-full h-[100px] sm:w-[145px] sm:h-[100px] rounded-[10px] bg-[#00957B] bg-opacity-50 flex flex-col justify-center items-center"
      style={{ boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
      <h1 className="font-semibold text-[20px] capitalize">{props.nama}</h1>
      <h1 className="font-semibold text-[15px] text-[#f3f3f3]">{props.jam}</h1>
    </div>
  )
}
