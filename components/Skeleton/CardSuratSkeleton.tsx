import ContentLoader from 'react-content-loader'

interface Props {
  cards: number
}

export default function CardSuratSkeleton({ cards }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-[8px] sm:gap-[15px] justify-center sm:mt-5 mt-3">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-[145px] h-[60px] sm:w-[250px] sm:h-[84px] border border-white rounded-lg bg-white transition-all px-[15px] sm:px-[27px] relative dark:bg-slate-700 dark:border-none">
            <ContentLoader
              speed={2}
              width={130}
              height={50}
              className="sm:hidden">
              <circle cx="12" cy="25" r="12" />
              <rect x="33" y="10" rx="3" ry="3" width="88" height="6" />
              <rect x="33" y="25" rx="3" ry="3" width="88" height="6" />
              <rect x="33" y="40" rx="3" ry="3" width="88" height="6" />
            </ContentLoader>
            <ContentLoader
              speed={2}
              width={200}
              height={80}
              className="hidden sm:block">
              <circle cx="15" cy="30" r="16" />
              <rect x="45" y="15" rx="3" ry="3" width="120" height="10" />
              <rect x="45" y="35" rx="3" ry="3" width="120" height="10" />
              <rect x="45" y="55" rx="3" ry="3" width="120" height="10" />
            </ContentLoader>
          </div>
        ))}
    </div>
  )
}
