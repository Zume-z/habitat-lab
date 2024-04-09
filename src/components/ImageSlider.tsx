import { Label } from '@/utils/types'
import Image from 'next/image'
import { MutableRefObject, RefObject } from 'react'

interface ImageSliderProps {
  imgPaths: string[]
  imgPathPrefix: string
  refs: MutableRefObject<{ [key: string]: RefObject<unknown> }>
  visibility: { [key: string]: boolean }
}

export default function ImageSlider({ imgPaths, imgPathPrefix, refs, visibility }: ImageSliderProps) {
  return (
    <div className="flex w-full flex-wrap px-5 md:px-52 ">
      {imgPaths.map((path) => (
        <div id={path} key={path} ref={refs.current[path] as RefObject<HTMLDivElement>} className="transition-500 w-full py-0  md:py-16">
          <div className={`relative h-[600px] transition duration-700 ease-in-out ${visibility[path as keyof typeof visibility] ? 'opacity-100' : 'translate-y-20 opacity-0'}`}>
            <Image className="object-contain" src={`${imgPathPrefix}/${path}`} alt={path} fill />
          </div>
        </div>
      ))}
    </div>
  )
}
