import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LoadingAnimation = ({ onComplete }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }
    })

    tl.fromTo('.loading-letter',
      { opacity: 0, y: 50, rotationX: -90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(0.7)' }
    )
    tl.to('.loading-logo-text', {
      duration: 0.1,
      textShadow: '2px 0 #c084fc, -2px 0 #a855f7',
      repeat: 3,
      yoyo: true,
      ease: 'none'
    }, '-=0.2')
    tl.fromTo('.loading-progress-fill',
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' },
      '-=0.3'
    )
    tl.fromTo('.loading-tagline',
      { opacity: 0, letterSpacing: '10px' },
      { opacity: 1, letterSpacing: '2px', duration: 0.8, ease: 'power2.out' },
      '-=1'
    )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000000',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: '#c084fc',
            borderRadius: '50%',
            opacity: 0,
            left: `${Math.random() * 100}%`,
            animation: `floatParticle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`
          }} />
        ))}
      </div>

      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(192,132,252,0.15), transparent)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'glowPulse 2s ease-in-out infinite'
      }} />

      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <h1 className="loading-logo-text" style={{
          fontSize: '4rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '30px'
        }}>
          {'Aishaxcore'.split('').map((letter, i) => (
            <span key={i} className="loading-letter" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #c084fc 80%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>{letter}</span>
          ))}
        </h1>

        <div style={{
          width: '200px',
          height: '2px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          margin: '0 auto 20px',
          overflow: 'hidden'
        }}>
          <div className="loading-progress-fill" style={{
            width: '0%',
            height: '100%',
            background: 'linear-gradient(90deg, #c084fc, #a855f7)',
            borderRadius: '2px',
            boxShadow: '0 0 10px #c084fc'
          }} />
        </div>

        <p className="loading-tagline" style={{
          color: '#c084fc',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          opacity: 0
        }}>pixels to possibilities ✦</p>
      </div>

      <style>{`
        @keyframes floatParticle {
          0% { opacity: 0; transform: translateY(100vh) scale(0); }
          20% { opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-20vh) scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

export default LoadingAnimation