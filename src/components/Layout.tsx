import Head from 'next/head'
import { proxima } from '@/utils/fonts'
import { ReactNode, useEffect, useState } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const [opacity, setOpacity] = useState(100)

  useEffect(() => {
    setTimeout(() => setOpacity(100), 500)
  }, [])

  return (
    <>
      <Head>
        <title>Habitat Lab</title>
        <meta name="description" content="Habitat Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${proxima.className} w-full  py-0 text-[#414141]  opacity-0 duration-[1000ms] md:py-16 `} style={{ opacity: opacity }}>
        {children}
      </main>
    </>
  )
}