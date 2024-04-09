import { Label } from '@/utils/types'

export default function ProjectLabel({ labelItems, style }: { labelItems: Label[]; style: string }) {
  return (
    <div className={`absolute bottom-0  w-full justify-end ${style} `}>
      <div className="flex space-x-10 bg-black px-5 py-4 font-mono text-white  md:space-x-20 md:px-20">
        {labelItems.map((item) => (
          <div key={item.title}>
            <div className="pt-1 text-xs text-gray-400">{item.title}</div>
            <div className="pt-1 text-sm">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
