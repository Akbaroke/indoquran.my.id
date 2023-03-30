import { IconArrowBigUpFilled } from "@tabler/icons-react";

export default function ScrollToTop() {
  return (
    <div className='w-12 h-12 rounded-full bg-white shadow-lg fixed bottom-0 right-4 text-[var(--primary)] flex justify-center items-center cursor-pointer' onClick={scrollToTop}>
      <IconArrowBigUpFilled />
    </div>
  )
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}