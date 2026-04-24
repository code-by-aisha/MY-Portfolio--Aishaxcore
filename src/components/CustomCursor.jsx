import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const handleMove = (e) => {
      // support pointer events for better compatibility
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0]?.clientX)
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0]?.clientY)
      if (clientX == null || clientY == null) return
      target.current.x = clientX
      target.current.y = clientY
    }

    const lerp = (a, b, n) => (1 - n) * a + n * b

    const render = () => {
      // smaller lerp value = smoother / slower-following cursor
      current.current.x = lerp(current.current.x, target.current.x, 0.12)
      current.current.y = lerp(current.current.y, target.current.y, 0.12)
      dot.style.transform = `translate3d(${current.current.x - 8}px, ${current.current.y - 8}px, 0)`
      rafRef.current = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMove)
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'rgba(192,132,252,0.95)',
        pointerEvents: 'none',
        transform: 'translate3d(-100px,-100px,0)',
        zIndex: 9999,
        transition: 'width 0.12s ease, height 0.12s ease'
      }}
    />
  )
}
