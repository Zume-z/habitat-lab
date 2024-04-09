interface ScrollButtonProps {
  label: string
  clickHandler: () => void
  rotate?: boolean
  style?: string
}

export default function ButtonScroll({ label, rotate = false, clickHandler, style }: ScrollButtonProps) {
  return (
    <div className={'w-full justify-center pb-10 ' + style}>
      <button className="transition-200 text-gray-400 hover:text-gray-700 " onClick={clickHandler}>
        <svg className={`h-20 w-full ${rotate && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth={1} d="M5 15l7-7 7 7" />
        </svg>
        <div className=" font-mono">{label}</div>
      </button>
    </div>
  )
}
