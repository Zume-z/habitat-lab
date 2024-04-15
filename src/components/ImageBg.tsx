import Image from 'next/image'
import { Dispatch } from 'react'

interface ImageBgProps {
  src: string
  setLoading: Dispatch<React.SetStateAction<boolean>>
  style?: string
}

export default function ImageBg({ src, setLoading, style }: ImageBgProps) {
  return (
    <div className={`absolute top-0 -z-10 h-full w-full ${style} `}>
      <Image src={src} alt="background" fill={true} style={{ objectFit: 'cover' }} onLoad={() => setLoading(false)} />
    </div>
  )
}
