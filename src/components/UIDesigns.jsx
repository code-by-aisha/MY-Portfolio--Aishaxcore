import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const UIDesigns = () => {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  
  const designs = [
    {
      id: 1,
      title: 'UniTRack',
      subtitle: 'Student Task Manager',
      category: 'Internship Task',
      description: 'Comprehensive task management system for Universty students who face problems in University, to manage their assignments, deadlines, and academic progress in one place on time.',
      image: './Images/image 5.jpg',
      figmaLink: 'https://www.figma.com/proto/84Gos0A7EQPD4qQZWGHAfa/Student-managment-system--Copy-?node-id=2043-532&starting-point-node-id=2043%3A532&t=LPHDVFuRqWjesHcW-1',
      tags: ['Studnets Problem solved', 'Prototype', 'Academic Progress', 'Deadline Tracking', 'User-Centered Design']
    },
    {
      id: 2,
      title: 'LaraCode',
      subtitle: 'Online Code platform',
      category: 'EVIDENCE #06',
      description: 'Creative production and development studio',
      image: './Images/image 6 (1).jpg',
      figmaLink: 'https://www.figma.com/design/yj1xVCEIy5LsMxYqUNzIza/Untitled?node-id=29-378&t=9wV1X4LK4E1Cfpix-1',
      tags: ['Code Platform', 'Prototype', 'Creative Studio']
    },
    {
      id: 3,
      title: 'Mod.music',
      subtitle: 'Music Platform',
      category: 'EVIDENCE #07',
      description: 'Innovative music platform for artists and listeners',
      image: './Images/image 6 (2).jpg',
      figmaLink: 'https://www.figma.com/proto/yj1xVCEIy5LsMxYqUNzIza/Untitled?node-id=1-2024&t=BMcMZ6bm1Wqfzgq4-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=29%3A687',
      tags: ['Music Platform', 'Prototype', 'Interactive experience with animations']
    },
    {
      id: 4,
      title: 'Drumsynth',
      subtitle: 'online instrument store',
      category: 'EVIDENCE #08',
      description: 'Immersive 3D experience and virtual environment for music production enthusiasts',
      image: './Images/image 6 (3).jpg',
      figmaLink: 'https://www.figma.com/design/yj1xVCEIy5LsMxYqUNzIza/Untitled?node-id=1-1675&t=9wV1X4LK4E1Cfpix-1',
      tags: ['Instrument Store', 'UI design', 'Immersive Experience']
    },
    {
      id: 5,
      title: 'Dugocon Graphyics',
      subtitle: 'front-end design for a graphics company',
      category: 'EVIDENCE #09',
      description: 'Front-end design for a graphics company, showcasing their portfolio and services with a modern and visually appealing interface.',
      image: './Images/image 6 (4).jpg',
      figmaLink: 'https://www.figma.com/design/yj1xVCEIy5LsMxYqUNzIza/Untitled?node-id=29-48&t=9wV1X4LK4E1Cfpix-1',
      tags: ['ORGANIC', 'SYNTHETIC', 'Challenge', 'UI design', 'Graphics Company']
    },
    {
      id: 6,
      title: 'Frisker',
      subtitle: 'pet hair salon',
      category: 'EVIDENCE #10',
      description: 'Frisker is a pet hair salon that offers grooming services for pets, providing a comfortable and stylish experience for both pets and their owners.',
      image: './Images/image 6.jpg',
      figmaLink: 'https://www.figma.com/design/yj1xVCEIy5LsMxYqUNzIza/Untitled?node-id=1-2&t=9wV1X4LK4E1Cfpix-1',
      tags: ['Design System', ' design in desktop, tablet and phone screen', 'UI design','cartoon style', 'pet hair salon']
    }
  ]

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate cards per view based on screen size (1 card on mobile, 3 on desktop)
  const cardsPerView = isMobile ? 1 : 3
  const totalSlides = Math.ceil(designs.length / cardsPerView)
  const currentSlide = Math.floor(currentIndex / cardsPerView)

  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 880
      gainNode.gain.value = 0.15
      
      oscillator.start()
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.15)
      oscillator.stop(audioContext.currentTime + 0.15)
      
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    playClickSound()
    
    if (currentSlide < totalSlides - 1) {
      const newSlide = currentSlide + 1
      setCurrentIndex(newSlide * cardsPerView)
      
      gsap.to(sliderRef.current, {
        x: `-${newSlide * 100}%`,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => setIsAnimating(false)
      })
    } else {
      setIsAnimating(false)
    }
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    playClickSound()
    
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1
      setCurrentIndex(newSlide * cardsPerView)
      
      gsap.to(sliderRef.current, {
        x: `-${newSlide * 100}%`,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => setIsAnimating(false)
      })
    } else {
      setIsAnimating(false)
    }
  }

  const handleCardClick = (figmaLink) => {
    playClickSound()
    setTimeout(() => {
      window.open(figmaLink, '_blank', 'noopener,noreferrer')
    }, 100)
  }

  const handleMouseMove = (e, cardIndex) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  // Group cards into slides based on cardsPerView
  const groupedDesigns = []
  for (let i = 0; i < designs.length; i += cardsPerView) {
    groupedDesigns.push(designs.slice(i, i + cardsPerView))
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.fromTo('.gallery-header',
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }
    )
    
    gsap.set(sliderRef.current, { x: 0 })
    
    // Add touch-swipe support for mobile horizontal scrolling
    const slider = sliderRef.current
    let startX = 0
    let startY = 0
    let isTouching = false
    let moved = false

    const onTouchStart = (e) => {
      const t = e.touches ? e.touches[0] : e
      startX = t.clientX
      startY = t.clientY
      isTouching = true
      moved = false
    }

    const onTouchMove = (e) => {
      if (!isTouching) return
      const t = e.touches ? e.touches[0] : e
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      // detect horizontal swipe (threshold prevents accidental scroll)
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        moved = true
        e.preventDefault()
      }
    }

    const onTouchEnd = (e) => {
      if (!isTouching) return
      isTouching = false
      if (!moved) return
      const touch = (e.changedTouches && e.changedTouches[0])
      const endX = touch ? touch.clientX : 0
      const delta = endX - startX
      const swipeThreshold = 50
      if (delta < -swipeThreshold) {
        handleNext()
      } else if (delta > swipeThreshold) {
        handlePrev()
      }
    }

    if (slider) {
      slider.addEventListener('touchstart', onTouchStart, { passive: true })
      slider.addEventListener('touchmove', onTouchMove, { passive: false })
      slider.addEventListener('touchend', onTouchEnd)
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (slider) {
        slider.removeEventListener('touchstart', onTouchStart)
        slider.removeEventListener('touchmove', onTouchMove)
        slider.removeEventListener('touchend', onTouchEnd)
      }
    }
  }, [isMobile, cardsPerView, designs.length])

  return (
    <section className="ui-designs-section" id="ui-designs" ref={sectionRef}>
      <div className="bg-effects">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
        <div className="bg-grid"></div>
      </div>
      
      <div className="section-container">
        {/* Updated Header - UI/UX Projects with 2-line description */}
        <div className="gallery-header">
          <div className="header-left">
            <span className="section-badge">✦ UI/UX PORTFOLIO</span>
            <h2 className="section-title">
              UI/UX <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle-line1">Creating intuitive digital experiences</p>
            <p className="section-subtitle-line2">that blend aesthetics with functionality</p>
          </div>
          <div className="header-right">
            <div className="sys-status">
              <span className="status-label">SYS. DIAGNOSTIC</span>
              <span className="status-value">STABLE</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows - Hide on mobile */}
        {!isMobile && (
          <div className="nav-arrows">
            <button 
              className={`nav-arrow prev ${currentSlide === 0 ? 'disabled' : ''}`}
              onClick={handlePrev}
              disabled={currentSlide === 0}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button 
              className={`nav-arrow next ${currentSlide === totalSlides - 1 ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
        
        {/* Horizontal Slider - Responsive cards per view */}
        <div className="slider-container">
          <div className="slider-track" ref={sliderRef}>
            {groupedDesigns.map((group, slideIndex) => (
              <div key={slideIndex} className="slide-group">
                <div className={`cards-grid ${isMobile ? 'mobile-grid' : ''}`}>
                  {group.map((design, cardIndex) => (
                    <div 
                      key={design.id}
                      className="design-card"
                      onClick={() => handleCardClick(design.figmaLink)}
                      onMouseMove={(e) => handleMouseMove(e, cardIndex)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <div className="card-image-container">
                        <img 
                          src={design.image} 
                          alt={design.title}
                          className="card-image"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/600x800/2a1e3c/ffffff?text=Image+Not+Found'
                          }}
                        />
                        <div className="image-overlay"></div>
                        <div className="image-glow"></div>
                        
                        <div className="category-badge">
                          <span>{design.category}</span>
                        </div>
                      </div>
                      
                      <div className="card-content">
                        <h3 className="card-title">{design.title}</h3>
                        <p className="card-subtitle">{design.subtitle}</p>
                        <p className="card-description">{design.description}</p>
                        <div className="card-tags">
                          {design.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                        </div>
                        <div className="click-indicator">
                          <span>CLICK TO VIEW</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Swipe Hint */}
        {isMobile && (
          <div className="mobile-swipe-hint">
            <span>← Swipe to see more →</span>
          </div>
        )}
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-dots">
            {groupedDesigns.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => {
                  if (!isAnimating && index !== currentSlide) {
                    playClickSound()
                    setCurrentIndex(index * cardsPerView)
                    gsap.to(sliderRef.current, {
                      x: `-${index * 100}%`,
                      duration: 0.6,
                      ease: 'power2.inOut'
                    })
                  }
                }}
              />
            ))}
          </div>
          <div className="progress-text">
            <span>0{currentSlide + 1}</span>
            <span>/</span>
            <span>0{totalSlides}</span>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-left">
            <span className="status-dot"></span>
            <span>Aishaxcore Mode</span>
            <span className="status-badge">Best Figma Designs</span>
            <span className="status-available">AVAILABLE</span>
          </div>
          <div className="status-right">
            <span>seems interesting ??? so what are you waiting for?</span>
            <span className="status-stable">Lets make your portfolio stand out!</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ui-designs-section {
          padding: 80px 0;
          position: relative;
          background: #000000;
          overflow: hidden;
          min-height: 100vh;
        }
        
        .bg-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .bg-glow-1 {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%);
          filter: blur(80px);
          animation: floatGlow 12s ease-in-out infinite;
        }
        
        .bg-glow-2 {
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.08) 0%, transparent 70%);
          filter: blur(80px);
          animation: floatGlow 10s ease-in-out infinite reverse;
        }
        
        .bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes floatGlow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(3%, 3%) scale(1.1); opacity: 0.8; }
        }
        
        .section-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 2;
        }
        
        /* Updated Header */
        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
          flex-wrap: wrap;
          gap: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 30px;
        }
        
        .section-badge {
          display: inline-block;
          background: rgba(192, 132, 252, 0.1);
          border: 1px solid rgba(192, 132, 252, 0.2);
          padding: 4px 12px;
          border-radius: 40px;
          font-size: 0.7rem;
          margin-bottom: 16px;
          letter-spacing: 2px;
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #FFFFFF 0%, #c084fc 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .section-subtitle-line1 {
          color: #888;
          font-size: 0.95rem;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        
        .section-subtitle-line2 {
          color: #c084fc;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          opacity: 0.8;
        }
        
        .sys-status {
          text-align: right;
        }
        
        .status-label {
          display: block;
          font-size: 0.7rem;
          color: #888;
          letter-spacing: 2px;
          margin-bottom: 4px;
        }
        
        .status-value {
          font-size: 1rem;
          color: #c084fc;
          font-weight: 500;
        }
        
        /* Navigation Arrows */
        .nav-arrows {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 20;
          padding: 0 20px;
        }
        
        .nav-arrow {
          width: 48px;
          height: 48px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(192, 132, 252, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
        }
        
        .nav-arrow:hover:not(.disabled) {
          background: rgba(192, 132, 252, 0.2);
          border-color: #c084fc;
          transform: scale(1.1);
        }
        
        .nav-arrow.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .nav-arrow svg {
          color: #c084fc;
        }
        
        /* Slider - Responsive Cards */
        .slider-container {
          width: 100%;
          overflow: hidden;
          margin: 40px 0;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
        }
        
        .slider-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          will-change: transform;
        }
        
        .slide-group {
          flex: 0 0 100%;
          display: flex;
          justify-content: center;
        }
        
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          width: 100%;
          padding: 0 20px;
        }
        
        /* Mobile: 1 card per slide with horizontal scroll feel */
        .cards-grid.mobile-grid {
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 0 15px;
        }
        
        /* Design Card */
        .design-card {
          cursor: pointer;
          transition: all 0.4s ease;
          transform-style: preserve-3d;
        }
        
        .card-image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          transition: all 0.4s ease;
          width: 100%;
        }
        
        .design-card:hover .card-image-container {
          box-shadow: 0 25px 45px -12px rgba(168, 85, 247, 0.4);
          border: 1px solid rgba(192, 132, 252, 0.4);
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .design-card:hover .card-image {
          transform: scale(1.05);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%);
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        
        .design-card:hover .image-overlay {
          opacity: 0.7;
        }
        
        .image-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(192,132,252,0.2), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .design-card:hover .image-glow {
          opacity: 1;
        }
        
        .category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          padding: 4px 12px;
          border-radius: 20px;
          z-index: 3;
        }
        
        .category-badge span {
          font-size: 0.7rem;
          color: #c084fc;
          letter-spacing: 1px;
        }
        
        .card-content {
          padding: 20px 16px;
          text-align: center;
        }
        
        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 4px;
          letter-spacing: 2px;
          color: #fff;
        }
        
        .card-subtitle {
          font-size: 0.8rem;
          color: #c084fc;
          margin-bottom: 8px;
        }
        
        .card-description {
          font-size: 0.75rem;
          color: #888;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        
        .card-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          margin-bottom: 12px;
        }
        
        .tag {
          background: rgba(192, 132, 252, 0.1);
          border: 1px solid rgba(192, 132, 252, 0.2);
          padding: 2px 8px;
          border-radius: 16px;
          font-size: 0.6rem;
          color: #c084fc;
        }
        
        .click-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        
        .design-card:hover .click-indicator {
          opacity: 1;
          transform: translateY(0);
        }
        
        .click-indicator span {
          font-size: 0.65rem;
          color: #888;
          letter-spacing: 1px;
        }
        
        .click-indicator svg {
          color: #c084fc;
        }
        
        /* Mobile Swipe Hint */
        .mobile-swipe-hint {
          text-align: center;
          margin: 20px 0;
          color: #c084fc;
          font-size: 0.7rem;
          letter-spacing: 2px;
          animation: bounceX 1.5s ease-in-out infinite;
        }
        
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(8px); opacity: 1; }
        }
        
        /* Progress Indicator */
        .progress-indicator {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 30px 0;
          padding: 0 20px;
        }
        
        .progress-dots {
          display: flex;
          gap: 12px;
        }
        
        .progress-dot {
          width: 8px;
          height: 8px;
          background: #333;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .progress-dot.active {
          width: 24px;
          background: #c084fc;
          border-radius: 4px;
        }
        
        .progress-text {
          font-size: 0.8rem;
          color: #666;
          font-family: monospace;
        }
        
        .progress-text span:first-child {
          color: #c084fc;
        }
        
        /* Status Bar */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.7rem;
          color: #666;
        }
        
        .status-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .status-dot {
          width: 6px;
          height: 6px;
          background: #c084fc;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .status-badge {
          background: rgba(192, 132, 252, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
          color: #c084fc;
        }
        
        .status-available {
          color: #4ade80;
        }
        
        .status-stable {
          color: #4ade80;
          margin-left: 16px;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .ui-designs-section {
            padding: 60px 0;
          }
          
          .section-container {
            padding: 0 20px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .nav-arrows {
            display: none;
          }
          
          .card-title {
            font-size: 1rem;
          }
          
          .status-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .sys-status {
            text-align: left;
          }
        }
      `}</style>
    </section>
  )
}

export default UIDesigns