// import Head from 'next/head'
// import { proxima } from '@/utils/fonts'
// import { ReactNode, useEffect, useState } from 'react'

// interface LayoutProps {
//   children: ReactNode
//   title?: string
//   nav?: JSX.Element
// }

// export default function Layout({ children, title, nav }: LayoutProps) {
//   const [opacity, setOpacity] = useState(100)

//   useEffect(() => {
//     setTimeout(() => setOpacity(100), 500)
//   }, [])

//   return (
//     <>
//       <Head>
//         <title>{title ? `Habitat Lab | ${title}` : 'Habitat Lab'}</title>
//         <meta name="description" content="Habitat Lab" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={`${proxima.className} w-full py-0 text-[#414141] opacity-0 duration-[1000ms] md:py-16 `} style={{ opacity: opacity }}>
//         {nav}
//         {children}
//       </main>
//     </>
//   )
// }

import Head from 'next/head'
import { proxima } from '@/utils/fonts'
import { ReactNode, useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
  title: string
  nav?: JSX.Element
}

export default function Layout({ children, title, nav }: LayoutProps) {
  const router = useRouter()
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Function to handle the start of the transition
    const handleRouteChangeStart = () => {
      setTimeout(() => setOpacity(0), 1000)
    }

    // Function to handle the end of the transition
    const handleRouteChangeComplete = () => {
      setTimeout(() => setOpacity(1), 1000) // or however long the fade-out takes
    }

    // Add the event listeners when the component mounts
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)

    // Start the initial animation
    setOpacity(1)

    // Remove event listeners on cleanup
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeComplete)
    }
  }, [router])

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
