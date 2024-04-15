import Header from '@/components/Header'
import Layout from '@/components/Layout'
import React, { createRef, useRef } from 'react'
import ImageSlider from '@/components/ImageSlider'
import { scrollToCenter } from '@/utils/scrollUtils'
import ScrollButton from '@/components/ScrollButton'
import { getImagePaths } from '@/utils/getImagePaths'
import { useButtonVisibility, useIntersectionObserver } from '@/utils/hooks'

export async function getStaticProps() {
  const imgPaths = await getImagePaths('public/assets/gallery')
  return { props: { imgPaths } }
}

export default function Gallery({ imgPaths }: { imgPaths: string[] }) {
  const refs = useRef(
    imgPaths.reduce((acc: { [key: string]: React.RefObject<unknown> }, img) => {
      acc[img] = createRef()
      return acc
    }, {}),
  )

  const visibility = useIntersectionObserver(refs, imgPaths, { threshold: 0.5 })
  const showScroll = useButtonVisibility()

  const handleScrollToCenter = () => {
    if (imgPaths[0] && refs.current[imgPaths[0]]) {
      scrollToCenter(refs.current[imgPaths[0]]?.current as HTMLElement)
    }
  }

  return (
    <Layout title="Gallery" loading={false}>
      <Header title="Gallery" />
      <div className="pt-10 md:pt-0">
        <ScrollButton label="View Gallery" rotate={true} clickHandler={() => handleScrollToCenter()} style={`transition-500 hidden md:flex ${showScroll ? 'opacity-100' : 'opacity-0'}`} />
        <ImageSlider imgPaths={imgPaths} imgPathPrefix={`/assets/gallery`} refs={refs} visibility={visibility} />
        <ScrollButton label="Return to top" clickHandler={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style="flex" />
      </div>
    </Layout>
  )
}
