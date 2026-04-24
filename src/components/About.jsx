import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered', icon: '🏆' },
    { value: 3, suffix: '+', label: 'Years Experience', icon: '⚡' },
    { value: 100, suffix: '%', label: 'Client Love', icon: '💜' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate main heading with split text
    const heading = document.querySelector('.about-name');
    if (heading) {
      const letters = heading.querySelectorAll('.letter');
      letters.forEach((letter, i) => {
        gsap.fromTo(letter,
          { opacity: 0, y: 100, rotationX: -90 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.5,
            delay: i * 0.03,
            ease: 'back.out(0.6)'
          }
        );
      });
    }
    
    // Animate paragraphs with fade-up
    const paragraphs = document.querySelectorAll('.about-text-reveal');
    paragraphs.forEach((p, i) => {
      gsap.fromTo(p,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3 + (i * 0.15),
          ease: 'power2.out'
        }
      );
    });
    
    // Animate role tags with stagger
    const tags = document.querySelectorAll('.role-tag-premium');
    tags.forEach((tag, i) => {
      gsap.fromTo(tag,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          delay: 0.6 + (i * 0.08),
          ease: 'back.out(0.5)'
        }
      );
    });
    
    // Animate stats
    statsRef.current.forEach((stat, i) => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
          const interval = setInterval(() => {
            if (current < target) {
              current++;
              stat.textContent = current + (stat.getAttribute('data-suffix') || '');
            } else {
              clearInterval(interval);
            }
          }, 20);
        },
        once: true
      });
    });
    
    // Animate decorative line
    gsap.fromTo('.about-premium-line',
      { width: '0%' },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        },
        width: '100%',
        duration: 1.2,
        ease: 'power2.out'
      }
    );
    
    // Floating background animation
    gsap.to('.premium-float-1', {
      y: 30,
      x: 20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to('.premium-float-2', {
      y: -25,
      x: -15,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  const addToStatsRef = (el, index) => {
    if (el) statsRef.current[index] = el;
  };

  // Split name into letters for animation
  const name = "Aisha Fayaz";
  const nameLetters = name.split('');

  return (
    <section ref={sectionRef} className="about-ultra-premium" id="about" style={{
      background: '#000000',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 0'
    }}>
      
      {/* Ultra Premium Background */}
      <div className="premium-bg">
        <div className="premium-float-1 premium-glow-1"></div>
        <div className="premium-float-2 premium-glow-2"></div>
        <div className="premium-glow-3"></div>
        <div className="premium-glow-4"></div>
        
        {/* Animated Grid */}
        <div className="premium-grid"></div>
        
        {/* Floating Stars */}
        <div className="premium-stars">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}>✦</div>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 32px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Elegant Badge */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-block',
            position: 'relative'
          }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(192, 132, 252, 0.08)',
              border: '1px solid rgba(192, 132, 252, 0.2)',
              padding: '6px 20px',
              borderRadius: '50px',
              fontSize: '0.7rem',
              color: '#c084fc',
              letterSpacing: '3px'
            }}>✦ GET TO KNOW ME ✦</span>
          </div>
        </div>

        {/* Main Heading - I'M with Animated Name */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 500,
            color: '#888',
            letterSpacing: '2px',
            marginBottom: '20px'
          }}>
            I'M
          </h2>
          <div className="about-name" style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: '1.2',
            perspective: '500px'
          }}>
            {nameLetters.map((letter, i) => (
              <span key={i} className="letter" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                opacity: 0
              }}>
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <div className="about-premium-line" style={{
            width: '0%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #c084fc, #a855f7, transparent)',
            margin: '30px auto 0 auto'
          }} />
        </div>

        {/* Text Content - Centered with elegance */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <p className="about-text-reveal" style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#b0b0b0',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            I don't just build websites — I focus on how they <span style={{ color: '#c084fc' }}>feel</span>. 
            My journey started with content creation, where I learned how to communicate ideas clearly.
          </p>
          
          <p className="about-text-reveal" style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#b0b0b0',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            That curiosity led me into Code, and eventually into designing—where I first created 
            an idea, an image then bring it to life through Code. This combination allows me to 
            approach projects <span style={{ color: '#c084fc' }}>differently</span>, balancing design, logic, and user experience.
          </p>
          
          <p className="about-text-reveal" style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#b0b0b0',
            marginBottom: '50px',
            textAlign: 'center'
          }}>
            I enjoy building clean, responsive interfaces with smooth interactions. Currently, 
            I'm expanding my skills into backend development, working toward becoming a 
            <span style={{ color: '#c084fc' }}> full-stack developer</span>.
          </p>
        </div>

        {/* Role Tags - Interactive */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          {['✨ Frontend Developer', '🎨 UI/UX Designer', '✍️ Content Writer', '🚀 Full Stack (soon)'].map((role, i) => (
            <span key={i} className="role-tag-premium" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(192,132,252,0.15)',
              padding: '10px 28px',
              borderRadius: '50px',
              fontSize: '0.9rem',
              color: '#ccc',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(192,132,252,0.15)';
              e.target.style.borderColor = '#c084fc';
              e.target.style.color = '#c084fc';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.03)';
              e.target.style.borderColor = 'rgba(192,132,252,0.15)';
              e.target.style.color = '#ccc';
              e.target.style.transform = 'translateY(0)';
            }}>
              {role}
            </span>
          ))}
        </div>

        {/* Stats Section with Icons */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <div style={{
            display: 'flex',
            gap: '60px',
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                textAlign: 'left',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#c084fc',
                  marginBottom: '5px',
                  letterSpacing: '2px'
                }}>{stat.icon}</div>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '2px'
                }}>
                  <span 
                    ref={(el) => addToStatsRef(el, index)}
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#c084fc',
                      minWidth: '80px'
                    }}
                  >0{stat.suffix}</span>
                </div>
                <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '5px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          
          <a href="#contact" style={{
            background: 'linear-gradient(135deg, rgba(192,132,252,0.1), rgba(168,85,247,0.05))',
            border: '1px solid rgba(192,132,252,0.3)',
            padding: '12px 32px',
            borderRadius: '50px',
            textDecoration: 'none',
            color: '#c084fc',
            fontWeight: 500,
            fontSize: '0.9rem',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(192,132,252,0.2)';
            e.target.style.gap = '15px';
            e.target.style.borderColor = '#c084fc';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, rgba(192,132,252,0.1), rgba(168,85,247,0.05))';
            e.target.style.gap = '10px';
            e.target.style.borderColor = 'rgba(192,132,252,0.3)';
          }}>
            WORK WITH ME <span>→</span>
          </a>
        </div>
      </div>

      <style>{`
        .about-ultra-premium {
          background: #000000;
          position: relative;
        }

        /* Premium Background */
        .premium-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .premium-glow-1, .premium-glow-2, .premium-glow-3, .premium-glow-4 {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .premium-glow-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(192,132,252,0.08), transparent);
          top: -150px;
          left: -150px;
        }

        .premium-glow-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(168,85,247,0.06), transparent);
          bottom: -100px;
          right: -100px;
        }

        .premium-glow-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124,58,237,0.05), transparent);
          top: 50%;
          left: 20%;
        }

        .premium-glow-4 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(192,132,252,0.04), transparent);
          bottom: 20%;
          right: 15%;
        }

        /* Animated Grid */
        .premium-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Floating Stars */
        .premium-stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          color: #c084fc;
          font-size: 0.6rem;
          opacity: 0.15;
          animation: twinkle ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.05; transform: scale(0.8); }
          50% { opacity: 0.2; transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .about-ultra-premium {
            padding: 80px 0;
          }
          .about-ultra-premium > div {
            padding: 0 24px;
          }
          .about-ultra-premium > div > div:last-child {
            flex-direction: column;
            text-align: center;
          }
          .about-ultra-premium > div > div:last-child > div:first-child {
            justify-content: center;
          }
          .premium-grid {
            background-size: 30px 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;