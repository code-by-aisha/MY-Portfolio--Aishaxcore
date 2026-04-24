import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Philosophy from './components/Philosophy';
import SkillsMarquee from './components/SkillsMarquee';
import Projects from './components/Projects';
import UIDesigns from './components/UIDesigns';
import CustomCursor from './components/CustomCursor';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';
import LoadingAnimation from './components/LoadingAnimation';
import ScrollSound from './components/BgMusic';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = 'auto';
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [loading]);

  const handleLoadingComplete = () => setLoading(false);
// Add this to your useEffect in App.jsx for smoother scroll
const anchorLinks = document.querySelectorAll('a[href^="#"]')
anchorLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault()
    const targetId = this.getAttribute('href')
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  })
})
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }));
    const updateProgress = () => {
      const ps = document.querySelector('#projects');
      const pf = document.querySelector('.progress-fill');
      if (ps && pf) {
        const rect = ps.getBoundingClientRect();
        const percent = (window.scrollY - rect.top) / (rect.height - window.innerHeight);
        pf.style.width = `${Math.min(Math.max(percent * 100, 0), 100)}%`;
      }
    };
    const refresh = () => setTimeout(() => ScrollTrigger.refresh(), 100);
    refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('scroll', updateProgress);
    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('scroll', updateProgress);
      ScrollTrigger.getAll().forEach(tr => tr.kill());
    };
  }, []);

  return (
    <>
      {loading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <div className="app" style={{ display: loading ? 'none' : 'block' }}>
        <ThreeBackground />
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Philosophy />
        <SkillsMarquee />
        <Projects />
        <UIDesigns />
        <Services />
        <Experience />
        <Contact />
        <ScrollSound />
        
        <footer className="footer">
          <div className="section-container">
            <div className="footer-content">
              <div className="footer-logo">Aishax<span>core</span></div>
              <p>© 2026 Aishaxcore — Building digital experiences that matter</p>
              <div className="footer-links">
                <a href="#hero">Home</a><a href="#about">About</a><a href="#projects">Work</a><a href="#services">Services</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
              </div>
            </div>
          </div>
        </footer>
        <div className="progress-bar"><div className="progress-fill"></div></div>
      </div>
    </>
  );
}

export default App;