import Image from 'next/image'

export default function ImageBg({ src, style }: { src: string; style?: string }) {
  return (
    <div className={`absolute top-0 -z-10 h-full w-full ${style} `}>
      <Image src={src} alt="background" fill={true} style={{ objectFit: 'cover' }} />
    </div>
  )
}
