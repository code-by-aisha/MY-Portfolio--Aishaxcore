import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'SkillBoost',
      category: 'EDUCATION',
      tagline: 'A platform from where you can find the best IT courses free and paid to boost your skills',
      description: 'Comprehensive online learning platform offering free and paid IT courses with interactive content and personalized learning paths.',
      stats: '+50% Engagement',
      tech: ['JS', 'React', 'Node.js', 'Bootstrap', 'CSS'],
      link: 'https://skill-boost-y3a3.vercel.app/',
      image: './Images/image (1).png',
    },
    {
      id: 2,
      title: 'SneakerVerse',
      category: 'FASHION E-COMMERCE',
      tagline: 'Revolutionizing Sneaker Shopping best experience for sneakerheads',
      description: 'Premium digital platform for luxury sneaker brand, featuring immersive 3D configurators and virtual try-on.',
      stats: '+180% Traffic',
      tech: ['JavaScript', 'CSS', 'Bootstrap', 'React', 'Node.js'],
      link: 'https://sneak-verse-futuristic-sneaker-e-co-hazel.vercel.app/',
      image: './Images/image (2).png',
    },
    {
      id: 3,
      title: 'Lomina Gallery',
      category: 'Photo Gallery',
      tagline: 'Capturing moments, one pixel at a time',
      description: 'Modern photo gallery platform showcasing artisanal photography collections with virtual exhibition where you can discover and download your fav photo and add to fav list',
      stats: '+42% Engagement',
      tech: ['React', 'Stripe', 'Sanity', 'Tailwind', 'Redux'],
      link: 'https://code-alpha-lumina-gallery.vercel.app/#',
      image: './Images/image (4).png',
    },
    {
      id: 4,
      title: 'Flow Play',
      category: 'Music App',
      tagline: 'Transforming the way you discover and listen to music',
      description: 'Modern music streaming platform with personalized playlists and social features.',
      stats: '+167% Users',
      tech: ['HTML', 'CSS', 'Bootstrap', 'JS', 'Node.js'],
      link: 'https://code-alpha-flow-up.vercel.app/',
      image: './Images/image (3).png',
    }
  ];

  useEffect(() => {
    gsap.fromTo('.project-card-item', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  return (
    <section id="projects" style={{
      background: '#000000',
      padding: '100px 0',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      position: 'relative',
      zIndex: 1
    }}>
      {/* HEADER */}
      <div style={{
        textAlign: 'center',
        marginBottom: '80px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(192, 132, 252, 0.15)',
          border: '1px solid rgba(192, 132, 252, 0.4)',
          padding: '8px 24px',
          borderRadius: '50px',
          marginBottom: '24px'
        }}>
          <span style={{
            fontSize: '0.8rem',
            color: '#c084fc',
            fontWeight: 600,
            letterSpacing: '3px'
          }}>
            ✦ FEATURED WORK ✦
          </span>
        </div>
        
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 800,
          marginBottom: '16px',
          color: '#ffffff',
          letterSpacing: '-0.02em'
        }}>
          Selected <span style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #c084fc 80%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Projects</span>
        </h2>
        
        <div style={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, #c084fc, transparent)',
          margin: '20px auto 0 auto'
        }} />
      </div>

      {/* Projects List */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card-item"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            style={{
              background: '#0a0a0a',
              borderRadius: '20px',
              marginBottom: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: activeIndex === index ? '1px solid rgba(192, 132, 252, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Preview */}
            <div style={{
              padding: isMobile ? '20px 20px' : '24px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#c084fc',
                  letterSpacing: '2px',
                  background: 'rgba(192,132,252,0.1)',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>{project.category}</span>
              </div>
              <h3 style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                fontWeight: 700,
                color: '#ffffff',
                flex: 1,
                margin: isMobile ? '0' : '0 16px'
              }}>{project.title}</h3>
              <div style={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: 600,
                color: '#c084fc',
                background: 'rgba(192,132,252,0.1)',
                padding: isMobile ? '6px 14px' : '6px 18px',
                borderRadius: '30px'
              }}>{project.stats}</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: activeIndex === index ? '#c084fc' : '#555',
                fontSize: '0.7rem'
              }}>
                <span>{activeIndex === index ? 'Click to collapse ↑' : 'Click to expand ↓'}</span>
              </div>
            </div>

            {/* Expanded Content */}
            <div style={{
              maxHeight: activeIndex === index ? (isMobile ? '800px' : '650px') : '0',
              opacity: activeIndex === index ? 1 : 0,
              overflow: 'hidden',
              transition: 'all 0.5s ease',
              padding: activeIndex === index ? (isMobile ? '0 20px 24px 20px' : '0 32px 32px 32px') : '0 32px'
            }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '24px' : '40px',
                flexWrap: 'wrap',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center'
              }}>
                {/* Image Section */}
                <div style={{ 
                  flex: '1.5',
                  minWidth: isMobile ? 'auto' : '350px',
                  maxWidth: isMobile ? '100%' : '50%'
                }}>
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#000',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                  }}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        display: 'block',
                        minHeight: isMobile ? '220px' : '320px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div style={{ 
                  flex: '1',
                  minWidth: isMobile ? 'auto' : '250px'
                }}>
                  <p style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    color: '#c084fc', 
                    marginBottom: '14px', 
                    fontWeight: 500 
                  }}>{project.tagline}</p>
                  <p style={{ 
                    color: '#aaa', 
                    lineHeight: 1.7, 
                    marginBottom: '20px', 
                    fontSize: isMobile ? '0.9rem' : '0.95rem' 
                  }}>{project.description}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={`${project.id}-tech-${idx}`} 
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          color: '#ccc'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#c084fc',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    padding: isMobile ? '10px 24px' : '12px 28px',
                    background: 'rgba(192,132,252,0.1)',
                    borderRadius: '40px',
                    border: '1px solid rgba(192,132,252,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(192,132,252,0.2)';
                    e.currentTarget.style.gap = '14px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(192,132,252,0.1)';
                    e.currentTarget.style.gap = '10px';
                  }}>
                    View Live Project →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-card-item > div:first-child {
            flex-direction: column !important;
            text-align: center !important;
          }
          .project-card-item h3 {
            margin: 0 !important;
          }
          .project-card-item > div:first-child > div:last-child {
            margin-top: 8px;
          }
          #projects > div:first-child h2 {
            font-size: 2rem !important;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c084fc;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};

export default Projects;