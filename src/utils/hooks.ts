import { Project } from './types'
import { useEffect, useState } from 'react'

export function useIntersectionObserver(refs: React.MutableRefObject<{ [key: string]: React.RefObject<unknown> }>, elements: string[], options: { threshold: number }) {
  const [visibility, setVisibility] = useState(elements.reduce((acc, project) => ({ ...acc, [project]: false }), {}))

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisibility((prevVisibility) => ({ ...prevVisibility, [entry.target.id]: entry.isIntersecting }))
      })
    }, options)
    elements.forEach((item) => {
      if (refs.current?.[item]?.current && refs.current[item]?.current instanceof Element) {
        observer.observe(refs.current[item]?.current as Element)
      }
    })
    return () => observer.disconnect()
  }, [elements])

  return visibility
}

export function useGalleryIntersectionObserver(refs: React.MutableRefObject<{ [key: string]: React.RefObject<unknown> }>, elements: string[]) {
  const [visibility, setVisibility] = useState(elements.reduce((acc, img) => ({ ...acc, [img]: false }), {}))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibility((prevVisibility) => ({ ...prevVisibility, [entry.target.id]: entry.isIntersecting }))
        })
      },
      { threshold: 0.5 },
    )
    elements.forEach((item) => {
      if (refs.current?.[item]?.current && refs.current[item]?.current instanceof Element) {
        observer.observe(refs.current[item]?.current as Element)
      }
    })
    return () => observer.disconnect()
  }, [elements])

  return visibility
}

export function useButtonVisibility() {
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return showButton
}
