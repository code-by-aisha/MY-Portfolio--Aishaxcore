import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Experience = () => {
  const sectionRef = useRef(null)
  
  const experiences = [
    {
      id: 1,
      title: 'Frontend Developer & UI/UX Designer',
      organization: 'ORIC, Mehran University',
      duration: 'Aug 2024 – Feb 2025',
      description: 'Worked on real-world web projects at ORIC, focusing on building responsive interfaces and improving user experience. Collaborated with senior developers and gained practical exposure to modern frontend development and UI/UX workflows.',
      tags: ['Built real-world interfaces', 'Worked with senior developers', 'Improved UI/UX skills'],
      icon: '💻',
      linkedinUrl: 'https://www.linkedin.com/posts/aisha-fayaz-72a3b9385_oric-certificate-ugcPost-7453443712212414464-62J7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF7r79IB8_sXhY9_xEO7mCVwETz7NYAJRhY'
    },
    {
      id: 2,
      title: 'UI/UX Designer Intern',
      organization: 'Smart Trainers',
      duration: 'Remote',
      description: 'Designed user-centered interfaces and worked on UI/UX case studies, creating wireframes and high-fidelity designs. Contributed to building complete web layouts with a focus on usability and visual clarity.',
      tags: ['Created UI/UX case studies', 'Designed full web layouts', 'Focused on usability'],
      icon: '🎨',
      linkedinUrl: 'https://www.linkedin.com/posts/aisha-fayaz-72a3b9385_my-case-study-activity-7416015880771432448-3s06?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF7r79IB8_sXhY9_xEO7mCVwETz7NYAJRhY'
    },
    {
      id: 3,
      title: 'Content Writer Intern',
      organization: 'Smart Trainers',
      duration: 'Aug 2024 – Feb 2025',
      description: 'Created engaging content for LinkedIn and other platforms, focusing on tech and design topics. Learned how to communicate ideas effectively and build audience engagement through structured content.',
      tags: ['Wrote LinkedIn posts', 'Improved engagement skills', 'Learned content strategy'],
      icon: '✍️',
      linkedinUrl: 'https://www.linkedin.com/posts/smarttrainers_smarttrainers-teamwork-meettheteam-ugcPost-7385259768166105089-O5wi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF7r79IB8_sXhY9_xEO7mCVwETz7NYAJRhY'
    },
    {
      id: 4,
      title: 'Frontend Developer Intern ',
      organization: 'Code Alpha',
      duration: '2025 _ 2 months',
      description: ' worked on frontend development projects. Gained experience in building responsive web applications and collaborating with a team of developers. Focused on improving coding skills and understanding of frontend technologies.',
      tags: ['Built responsive web apps', 'posted on linkdin ', 'Learned frontend technologies'],
      icon: '👩🏻‍💻',
      linkedinUrl: 'https://www.linkedin.com/posts/aisha-fayaz-72a3b9385_internship-frontenddeveloper-experience-activity-7399477141060415488-k57K?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF7r79IB8_sXhY9_xEO7mCVwETz7NYAJRhY'
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const cards = document.querySelectorAll('.exp-card-fixed')
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
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
          delay: index * 0.15,
          ease: 'back.out(0.4)'
        }
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleLinkedInClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="experience-section-fixed" id="experience" ref={sectionRef} style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 32px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(192, 132, 252, 0.1)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            padding: '4px 12px',
            borderRadius: '40px',
            fontSize: '0.75rem',
            marginBottom: '16px'
          }}>✦ My Journey</span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            Experience & <span style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #c084fc 80%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Growth</span>
          </h2>
          <p style={{
            color: '#888',
            fontSize: '0.9rem'
          }}>Building skills, creating impact, and growing every day</p>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {experiences.map((exp) => (
            <div key={exp.id} className="exp-card-fixed" style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '28px',
              transition: 'all 0.3s ease',
              overflow: 'visible'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(8px)'
              e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.3)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
            }}>
              <button 
                onClick={() => handleLinkedInClick(exp.linkedinUrl)}
                aria-label="View on LinkedIn"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  background: 'rgba(10, 102, 194, 0.15)',
                  border: '1px solid rgba(10, 102, 194, 0.3)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.background = 'rgba(10, 102, 194, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(10, 102, 194, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(10, 102, 194, 0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#0a66c2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="#0a66c2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#0a66c2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(192, 132, 252, 0.1)',
                  border: '1px solid rgba(192, 132, 252, 0.2)',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0
                }}>{exp.icon}</div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    paddingRight: '40px'
                  }}>{exp.title}</h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#c084fc',
                      fontWeight: 500
                    }}>{exp.organization}</span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>{exp.duration}</span>
                  </div>
                  <p style={{
                    color: '#b0b0b0',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                  }}>{exp.description}</p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    {exp.tags.map((tag, i) => (
                      <span key={i} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        color: '#ccc',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#c084fc'
                        e.target.style.color = '#c084fc'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.color = '#ccc'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-section-fixed {
            padding: 60px 0 !important;
          }
          .experience-section-fixed > div {
            padding: 0 24px !important;
          }
          .exp-card-fixed > div {
            flex-direction: column !important;
          }
          .exp-card-fixed h3 {
            font-size: 1.1rem !important;
            padding-right: 0 !important;
          }
          .experience-section-fixed h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Experience