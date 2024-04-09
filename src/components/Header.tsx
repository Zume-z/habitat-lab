export default function Header({ title, top, textCol }: { title: string; top?: boolean; textCol?: string }) {
  return (
    <div className={`hidden justify-end p-4 pr-8 md:flex ${top ? '' : 'py-52'}`}>
      <h1 className={`w-min cursor-default text-right font-semibold leading-tight  md:text-[160px] lg:text-[180px] ${textCol ? textCol : 'text-black'}`}>{title}</h1>
    </div>
  )
}
