import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Philosophy = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);

  const differentiators = [
    { icon: '🎨', title: 'Creative Vision', desc: 'I see what others overlook', color: '#c084fc' },
    { icon: '⚡', title: 'Technical Excellence', desc: 'Clean code that performs', color: '#a855f7' },
    { icon: '💬', title: 'Collaborative Spirit', desc: 'Your vision, my expertise', color: '#7c3aed' },
    { icon: '🚀', title: 'Future-Ready', desc: 'Built to scale and evolve', color: '#6d28d9' }
  ];

  const philosophyLines = [
    "I believe design is a conversation, not a monologue.",
    "Every pixel, every interaction, every line of code tells a story.",
    "I don't just write code — I craft experiences that live in the intersection of art and logic.",
    "Where every pixel has purpose and every interaction inspires action."
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // 3D Text Animation for Heading
    gsap.fromTo('.philosophy-3d-heading',
      {
        opacity: 0,
        y: 100,
        rotationX: 45,
        scale: 0.8,
        filter: 'blur(15px)'
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'back.out(0.6)'
      }
    );
    
    // Animate each line of text
    const lines = document.querySelectorAll('.philosophy-line');
    lines.forEach((line, i) => {
      gsap.fromTo(line,
        { opacity: 0, x: -50 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out'
        }
      );
    });
    
    // Animate cards
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'back.out(0.5)'
        }
      );
    });
    
    // Floating background animation
    gsap.to('.philosophy-float-bg', {
      y: 30,
      x: 20,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  const addToCardsRef = (el, index) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="philosophy-premium-v2" id="philosophy" style={{
      background: '#000000',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 0'
    }}>
      
      {/* Animated Background */}
      <div className="philosophy-bg">
        <div className="philosophy-float-bg philosophy-glow-1"></div>
        <div className="philosophy-glow-2"></div>
        <div className="philosophy-glow-3"></div>
        <div className="philosophy-grid"></div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* 3D Animated Heading */}
        <div className="philosophy-3d-heading" style={{
          textAlign: 'center',
          marginBottom: '60px',
          perspective: '800px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            <span style={{ color: '#ffffff' }}>What Makes</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Me Different</span>
          </h2>
          <div style={{
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, #c084fc, #a855f7, transparent)',
            margin: '30px auto 0 auto',
            borderRadius: '2px'
          }} />
        </div>

        {/* Philosophy Text - Left Aligned, Elegant */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 80px auto'
        }}>
          {philosophyLines.map((line, index) => (
            <p key={index} className="philosophy-line" style={{
              fontSize: '1.3rem',
              lineHeight: '1.8',
              color: index === 2 ? '#c084fc' : '#b0b0b0',
              marginBottom: '20px',
              textAlign: 'left',
              fontWeight: index === 2 ? 500 : 400,
              borderLeft: index === 2 ? '3px solid #c084fc' : 'none',
              paddingLeft: index === 2 ? '20px' : '0'
            }}>
              {line}
            </p>
          ))}
        </div>

        {/* Differentiators Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '30px',
          marginTop: '40px'
        }}>
          {differentiators.map((item, index) => (
            <div
              key={index}
              ref={(el) => addToCardsRef(el, index)}
              style={{
                background: 'rgba(15, 15, 20, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(192, 132, 252, 0.15)',
                borderRadius: '20px',
                padding: '35px 25px',
                textAlign: 'center',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.background = 'rgba(20, 20, 30, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.15)';
                e.currentTarget.style.background = 'rgba(15, 15, 20, 0.6)';
              }}
            >
              <div style={{
                fontSize: '2.8rem',
                marginBottom: '20px',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '12px',
                background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.5' }}>{item.desc}</p>
              
              {/* Hover Line Effect */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '3px',
                background: `linear-gradient(90deg, ${item.color}, transparent)`,
                transition: 'width 0.4s ease'
              }}
              className="hover-line"
              onMouseEnter={(e) => {
                e.target.style.width = '100%';
              }}
              onMouseLeave={(e) => {
                e.target.style.width = '0%';
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .philosophy-premium-v2 {
          background: #000000;
          position: relative;
        }

        /* Animated Background */
        .philosophy-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .philosophy-glow-1, .philosophy-glow-2, .philosophy-glow-3 {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .philosophy-glow-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(192,132,252,0.08), transparent);
          top: -150px;
          left: -150px;
        }

        .philosophy-glow-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(168,85,247,0.06), transparent);
          bottom: -100px;
          right: -100px;
        }

        .philosophy-glow-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124,58,237,0.05), transparent);
          top: 50%;
          left: 30%;
        }

        .philosophy-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        @media (max-width: 1024px) {
          .philosophy-premium-v2 > div > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .philosophy-premium-v2 {
            padding: 80px 0;
          }
          .philosophy-premium-v2 > div {
            padding: 0 24px;
          }
          .philosophy-premium-v2 > div > div:nth-child(2) .philosophy-line {
            font-size: 1rem !important;
          }
          .philosophy-premium-v2 > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
          .philosophy-premium-v2 > div > div:first-child {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default Philosophy;