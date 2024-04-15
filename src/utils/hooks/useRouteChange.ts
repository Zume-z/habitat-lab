import { SetStateAction, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'

const useRouteChange = (opacitySetter: (value: SetStateAction<number>) => void, loading: boolean) => {
  const router: NextRouter = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setTimeout(() => opacitySetter(0), 1000)
    }

    const handleRouteChangeComplete = () => {
      if (!loading) {
        setTimeout(() => opacitySetter(1), 1000)
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)

    if (!loading) {
      setTimeout(() => opacitySetter(1), 1000)
    }

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeComplete)
    }
  }, [router])
}

export default useRouteChange
