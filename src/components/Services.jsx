import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Services = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  
  const services = [
    { number: '01', title: 'Brand Identity', desc: 'Creating visual languages that speak volumes before a word is read.', color: '#c084fc' },
    { number: '02', title: 'UI/UX Engineering', desc: 'Building interfaces that feel like second nature to your users.', color: '#a855f7' },
    { number: '03', title: 'Web & 3D Experiences', desc: 'Pushing boundaries with immersive, interactive digital worlds.', color: '#7c3aed' },
    { number: '04', title: 'Product Strategy', desc: 'Mapping the journey from idea to market dominance.', color: '#6d28d9' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -50 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
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
  }, []);

  const addToRefs = (el, index) => {
    if (el) itemsRef.current[index] = el;
  };

  return (
    <section className="services-premium-section" id="services" style={{
      background: '#000000',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div className="services-bg-animation"></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(192, 132, 252, 0.1)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            padding: '6px 16px',
            borderRadius: '40px',
            fontSize: '0.75rem',
            color: '#c084fc',
            letterSpacing: '2px'
          }}>✦ HOW I CREATE</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginTop: '24px',
            lineHeight: '1.2',
            color: '#ffffff'
          }}>
            Every project begins<br />
            with a <span style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>spark of curiosity</span>
          </h2>
          <p style={{ color: '#666', marginTop: '16px' }}>Then I follow a process that turns ideas into impact</p>
        </div>

        {/* Service Items - No Cards, Just Elegant Lines */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => addToRefs(el, index)}
              style={{
                padding: '40px 0',
                borderBottom: index < services.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(20px)';
                const line = e.currentTarget.querySelector('.hover-line');
                if (line) line.style.width = '100%';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                const line = e.currentTarget.querySelector('.hover-line');
                if (line) line.style.width = '0%';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '30px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  minWidth: '80px'
                }}>{service.number}</span>
                
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '8px'
                  }}>{service.title}</h3>
                  <p style={{
                    color: '#888',
                    fontSize: '1rem',
                    maxWidth: '500px'
                  }}>{service.desc}</p>
                </div>
              </div>
              
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(192,132,252,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ color: '#c084fc', fontSize: '1.2rem' }}>→</span>
              </div>
              
              <div className="hover-line" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '2px',
                background: `linear-gradient(90deg, ${service.color}, transparent)`,
                transition: 'width 0.4s ease'
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-premium-section {
          background: #000000;
          position: relative;
        }
        
        .services-bg-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 50%, rgba(168,85,247,0.05), transparent);
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .services-premium-section {
            padding: 80px 0;
          }
          .services-premium-section > div {
            padding: 0 24px;
          }
          .services-premium-section > div > div:last-child > div {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .services-premium-section > div > div:last-child > div > div:first-child {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;