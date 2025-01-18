import { IMAGE_BG_ROADTORAMADHAN } from "@/assets";
import useCountdownTimeRamadhan from "@/hooks/useCountdownTimeRamadhan";
import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypingAnimation } from "./TypingAnimation";
import { toHijri } from "hijri-converter";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";

type Props = {
  ramadhanDate: string;
};

export default function RoadToRamadhan({ ramadhanDate }: Props) {
  const { days, hours, minutes, seconds } =
    useCountdownTimeRamadhan(ramadhanDate);

  const gregorianYear = new Date(ramadhanDate).getFullYear();
  const hijriYear = toHijri(gregorianYear, 3, 1).hy;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <BackgroundBeamsWithCollision className="w-full h-max">
        <Image
          src={IMAGE_BG_ROADTORAMADHAN}
          alt={`road to ramadhan ${gregorianYear}`}
          title={`road to ramadhan ${gregorianYear}`}
          width={1000}
          height={500}
          className="w-full sm:max-h-[350px] max-h-[200px] object-cover object-center"
        />
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center bg-black/30 gap-2 px-4">
          <h1 className="text-xs text-cWhite font-medium tracking-widest text-center">
            Menuju Ramadhan {hijriYear} Hijriah
          </h1>
          <div className="flex gap-4 sm:gap-8">
            <TextTime label="Hari" time={days} />
            <TextTime label="Jam" time={hours} />
            <TextTime label="Menit" time={minutes} />
            <TextTime label="Detik" time={seconds} />
          </div>
          <TypingAnimation
            as="p"
            className="text-center text-[11px] text-cWhite font-light italic leading-5 max-w-[400px] mt-3 hidden sm:block"
          >
            Bulan yang penuh berkah ini menjadi kesempatan bagi umat muslim
            untuk lebih mendekatkan diri kepada Allah dan memperbanyak amal
            shaleh. Persiapkan diri dengan membaca Al Quran dan berdoa, serta
            memperbanyak amal shaleh.
          </TypingAnimation>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

const TextTime = ({ time, label }: { time: number; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <AnimatePresence mode="popLayout">
      <motion.h1
        key={time}
        initial={{ y: 12, filter: "blur(12px)", opacity: 0 }}
        animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
        exit={{ y: -12, filter: "blur(12px)", opacity: 0 }}
        transition={{ type: "spring", bounce: 0.35, duration: 0.8 }}
        className="text-xl sm:text-3xl text-cWhite font-semibold tracking-widest [text-shadow:_0_3px_0_rgb(0_0_0_/_50%)]"
      >
        {time}
      </motion.h1>
    </AnimatePresence>
    <p className="text-sm text-gray-300 font-semibold">{label}</p>
  </div>
);
