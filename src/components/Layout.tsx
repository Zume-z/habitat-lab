import Head from 'next/head'
import { proxima } from '@/utils/fonts'
import { ReactNode, useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
  title: string
  loading: boolean
}

export default function Layout({ children, title, loading }: LayoutProps) {
  const router = useRouter()
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setTimeout(() => setOpacity(0), 1000)
    }

    const handleRouteChangeComplete = () => {
      if (!loading) {
        setTimeout(() => setOpacity(1), 1000)
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)

    if (!loading) {
      setTimeout(() => setOpacity(1), 1000)
    }

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeComplete)
    }
  }, [router])

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setOpacity(1), 500)
    }
  }, [loading])

  return (
    <div>
      <Head>
        <title>{title ? `${title} | Habitat Lab` : 'Habitat Lab'}</title>
        <meta name="description" content="Habitat Lab" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${proxima.className} py-0 md:py-16`}>
        <Nav title={title} />

        <div style={{ opacity, transition: 'opacity 1s ease-in-out' }}>{children}</div>
      </main>
    </div>
  )
}
