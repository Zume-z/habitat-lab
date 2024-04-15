import Nav from './Nav'
import Head from 'next/head'
import { useEffect } from 'react'
import { proxima } from '@/utils/fonts'
import { ReactNode, useState } from 'react'
import useRouteChange from '@/utils/hooks/useRouteChange'

interface LayoutProps {
  children: ReactNode
  title: string
  loading: boolean
}

export default function Layout({ children, title, loading }: LayoutProps) {
  const [opacity, setOpacity] = useState(0)

  useRouteChange(setOpacity, loading)

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
