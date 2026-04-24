import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const navLinks = ['Home', 'About', 'Work', 'Services', 'Experience', 'Contact']

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    padding: scrolled ? '16px 0' : '20px 0',
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  }

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #fff, #e9d5ff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    cursor: 'pointer',
    zIndex: 1001
  }

  const desktopNavStyle = {
    display: 'flex',
    gap: '40px',
    alignItems: 'center'
  }

  const mobileNavStyle = {
    position: 'fixed',
    top: 0,
    right: mobileMenuOpen ? '0' : '-100%',
    width: '70%',
    maxWidth: '300px',
    height: '100vh',
    background: 'rgba(0,0,0,0.95)',
    backdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    transition: 'right 0.3s ease',
    zIndex: 1000,
    borderLeft: '1px solid rgba(192,132,252,0.2)'
  }

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 500,
    fontSize: '1rem',
    transition: 'color 0.2s',
    padding: '8px 0'
  }

  const contactStyle = {
    background: 'linear-gradient(135deg, #c084fc, #a855f7)',
    padding: '8px 20px',
    borderRadius: '40px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500,
    transition: 'all 0.3s ease'
  }

  const menuBtnStyle = {
    display: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: 'white',
    background: 'none',
    border: 'none',
    zIndex: 1001,
    position: 'relative'
  }

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: 999,
    display: mobileMenuOpen ? 'block' : 'none',
    transition: 'all 0.3s ease'
  }

  return (
    <>
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          <div style={logoStyle}>
            Aishax<span style={{ background: 'linear-gradient(135deg,#c084fc,#a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>core</span>
          </div>
          
          {/* Desktop Navigation */}
          <div style={desktopNavStyle} className="desktop-nav">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase() === 'work' ? 'projects' : link.toLowerCase() === 'studio' ? 'about' : link.toLowerCase()}`} style={linkStyle}>
                {link}
              </a>
            ))}
            <a href="#contact" style={contactStyle}>Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button style={menuBtnStyle} className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div style={overlayStyle} onClick={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Navigation */}
      <div style={mobileNavStyle} className="mobile-nav">
        {navLinks.map(link => (
          <a key={link} href={`#${link.toLowerCase() === 'work' ? 'projects' : link.toLowerCase() === 'studio' ? 'about' : link.toLowerCase()}`} style={linkStyle} onClick={handleLinkClick}>
            {link}
          </a>
        ))}
        <a href="#contact" style={{...contactStyle, width: '80%', textAlign: 'center'}} onClick={handleLinkClick}>
          Contact
        </a>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar