import { useEffect, useState } from 'react'

export default function RenderCounter({ children }: { children: React.ReactNode }) {
  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    setRenderCount((count) => count + 1)
  }, [])

  return (
    <div>
      {children}
      <div>RENDER_COUNT_{renderCount}</div>
    </div>
  )
}
