import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = 
    "results",
    "success",
    "solutions",
    "experiences",
    "possibilities",
  ];
  const [currentWord, setCurrentWord] = useState(0);
  const [displayWord, setDisplayWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentFullWord = words[currentWord];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayWord.length < currentFullWord.length) {
          setDisplayWord(currentFullWord.slice(0, displayWord.length + 1));
          setTypingSpeed(120);
        } else {
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        if (displayWord.length > 0) {
          setDisplayWord(displayWord.slice(0, -1));
          setTypingSpeed(60);
        } else {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
          setTypingSpeed(150);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayWord, isDeleting, currentWord, typingSpeed, words]);

  // Particle Network Background Effect - HIGHER OPACITY
  // Particle Network Background Effect - Responsive
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;
  
  // Responsive particle settings based on screen size
  const isMobile = width < 768;
  const particleCount = isMobile ? 40 : 120; // Fewer particles on mobile
  const connectionDistance = isMobile ? 150 : 220; // Shorter connections on mobile
  const particleRadius = isMobile ? 1.5 : 3; // Smaller particles on mobile
  const lineWidth = isMobile ? 0.8 : 1.2; // Thinner lines on mobile
  const opacityMultiplier = isMobile ? 0.6 : 0.9; // Slightly lower opacity on mobile for performance
  
  // Create particles
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: particleRadius + Math.random() * 1.5,
      alpha: Math.random() * 0.7 + 0.3
    });
  }
  
  // Animation loop
  let animationId;
  let lastTimestamp = 0;
  const frameInterval = isMobile ? 2 : 1; // Lower frame rate on mobile for performance
  
  const animate = (timestamp) => {
    // Throttle animation on mobile for better performance
    if (isMobile && timestamp - lastTimestamp < 33) { // ~30fps on mobile
      animationId = requestAnimationFrame(animate);
      return;
    }
    lastTimestamp = timestamp;
    
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Move particles
      p.x += p.vx;
      p.y += p.vy;
      
      // Boundary check - wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha * opacityMultiplier})`;
      ctx.fill();
      
      // Add glow effect (only on desktop for performance)
      if (!isMobile) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha * 0.3})`;
        ctx.fill();
      }
      
      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * (isMobile ? 0.2 : 0.3);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  // Handle resize - update dimensions and reset particles
  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Regenerate particles for new screen size
    const newIsMobile = width < 768;
    const newParticleCount = newIsMobile ? 40 : 120;
    const newParticleRadius = newIsMobile ? 1.5 : 3;
    
    // Clear and regenerate particles
    particles.length = 0;
    for (let i = 0; i < newParticleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: newParticleRadius + Math.random() * 1.5,
        alpha: Math.random() * 0.7 + 0.3
      });
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
  };
}, []);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content-left",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
      );
      gsap.fromTo(
        ".code-block",
        { opacity: 0, scale: 0.9, x: 50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        },
      );
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".btn-group",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(0.3)", delay: 0.5 },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const codeLines = [
    "const developer = {",
    '  name: "Aisha Fayaz",',
    '  role: "Frontend Developer", "UI/UX Designer", "Full Stack (soon)",',
    '  skills: ["Html", "Css", "JavaScript", "Tailwind", "Vite", "React", "Node.js", "Express"],',
    '  uiux: ["GSAP", "Three.js", "ChatGPT", "Gemini", "Figma"],',
    '  passion: "Creating amazing and stunning experiences"',
    "};",
    "",
    "developer.build();",
  ];

  return (
    <section
      ref={heroRef}
      className="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Particle Network Canvas - Higher Opacity */}
      {/* Particle Network Canvas - Responsive */}
<canvas 
  ref={canvasRef} 
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
    opacity: window.innerWidth < 768 ? 0.7 : 0.9  // Slightly lower opacity on mobile
  }}
/>

      {/* Clean Background Glow */}
      <div className="hero-bg-glow" style={{ zIndex: 0 }}></div>
      <div className="hero-bg-glow-2" style={{ zIndex: 0 }}></div>

      {/* Subtle Grid Overlay */}
      <div className="hero-grid-light" style={{ zIndex: 0 }}></div>

      <div
        className="hero-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="hero-wrapper">
          <div className="hero-content-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>✦ Frontend Developer & UI/UX Designer ✦</span>
            </div>

          <h1 className="hero-title">
  Turning pixels into
  <br />
  <span className="dynamic-word">
    {displayWord || words[0]}
    <span className="typing-cursor"></span>
  </span>
</h1>

            <p className="hero-description">
              Just building cool, clean websites that people enjoy using.
            </p>
            <p className="hero-subdescription">
              Creating digital experiences that blend aesthetics with
              functionality.
            </p>

            <div className="btn-group">
              <a href="#projects" className="btn-primary">
                View Work →
              </a>
              <a href="#contact" className="btn-outline">
                Get in touch
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/aisha-fayaz-72a3b9385/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    stroke="currentColor"
                  />
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    stroke="currentColor"
                  />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/code-by-aisha"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 0.999999C19.91 0.999999 18.73 0.649999 16.91 1.98C15.2635 1.585 13.5475 1.585 11.9 1.98C10.09 0.649999 8.9 0.999999 8.9 0.999999C8.38642 2.19835 8.35414 3.54851 8.81 4.77C7.8473 5.7812 7.31026 7.12383 7.31 8.52C7.31 13.97 10.6 15.16 13.74 15.52C13.407 15.8634 13.151 16.2738 12.9889 16.7238C12.8268 17.1738 12.7625 17.6532 12.8 18.13V22"
                    stroke="currentColor"
                  />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-title">developer.js</span>
              </div>
              <div className="code-content">
                {codeLines.map((line, idx) => (
                  <div key={idx} className="code-line">
                    <span className="line-number">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="line-code">{line}</span>
                  </div>
                ))}
                <span className="code-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background: #000;
          overflow: hidden;
        }
        
        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        
        .dynamic-word {
          display: inline-block;
          background: linear-gradient(135deg, #c084fc, #a855f7, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          min-width: 140px;
          font-weight: 800;
        }
        
        .typing-cursor {
          display: inline-block;
          width: 3px;
          height: 1.1em;
          background: linear-gradient(180deg, #c084fc, #a855f7);
          margin-left: 4px;
          animation: blink 0.8s infinite;
          vertical-align: middle;
          border-radius: 2px;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* Background Glows */
        .hero-bg-glow {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 70%;
          height: 100%;
          background: radial-gradient(ellipse at 30% 30%, rgba(168,85,247,0.08), rgba(168,85,247,0.03) 40%, transparent 80%);
          filter: blur(100px);
          pointer-events: none;
        }
        
        .hero-bg-glow-2 {
          position: absolute;
          bottom: -15%;
          right: -10%;
          width: 60%;
          height: 80%;
          background: radial-gradient(ellipse, rgba(139,92,246,0.06), rgba(168,85,247,0.02) 50%, transparent 80%);
          filter: blur(120px);
          pointer-events: none;
        }
        
        .hero-grid-light {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(255,255,255,0.003) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.003) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        
        .hero-container { max-width:1400px; margin:0 auto; padding:0 60px; position:relative; z-index:2; width:100%; }
        .hero-wrapper { display:flex; justify-content:space-between; align-items:center; gap:60px; min-height:100vh; }
        .hero-content-left { flex:1; max-width:550px; }
        .hero-badge { display:inline-flex; align-items:center; gap:10px; background:rgba(192,132,252,0.05); border:1px solid rgba(192,132,252,0.1); padding:8px 20px; border-radius:50px; font-size:0.8rem; margin-bottom:30px; backdrop-filter:blur(10px); }
        .badge-dot { width:6px; height:6px; background:#c084fc; border-radius:50%; animation:pulse 2s infinite; }
        @keyframes pulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:0.5; transform:scale(1.2); } }
        
        .hero-description { font-size:1.1rem; color:#d0d0d0; margin-bottom:12px; }
        .hero-subdescription { font-size:0.9rem; color:#666; margin-bottom:40px; }
        .btn-group { display:flex; gap:20px; margin-bottom:50px; flex-wrap:wrap; }
        .btn-primary, .btn-outline { padding:14px 32px; border-radius:50px; font-weight:600; font-size:0.95rem; text-decoration:none; display:inline-flex; align-items:center; gap:10px; transition:all 0.3s ease; }
        .btn-primary { background:white; color:black; }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 15px 35px rgba(255,255,255,0.15); }
        .btn-outline { background:transparent; border:1px solid rgba(255,255,255,0.2); color:white; }
        .btn-outline:hover { background:rgba(255,255,255,0.05); border-color:white; transform:translateY(-3px); }
        .social-links { display:flex; gap:24px; }
        .social-link { display:flex; align-items:center; gap:8px; color:#888; text-decoration:none; font-size:0.85rem; transition:color 0.3s; }
        .social-link:hover { color:#c084fc; }
        .hero-right { flex:1; display:flex; justify-content:center; }
        .code-block { background:rgba(10,10,15,0.5); backdrop-filter:blur(10px); border-radius:16px; border:1px solid rgba(192,132,252,0.15); overflow:hidden; max-width:560px; width:100%; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); transition:all 0.3s ease; }
        .code-block:hover { box-shadow:0 0 30px rgba(192,132,252,0.2); border-color:rgba(192,132,252,0.4); transform:translateY(-5px); }
        .code-header { background:rgba(0,0,0,0.4); padding:12px 16px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.05); }
        .code-dots { display:flex; gap:8px; }
        .code-dots .dot { width:12px; height:12px; border-radius:50%; }
        .dot.red { background:#ff5f56; }
        .dot.yellow { background:#ffbd2e; }
        .dot.green { background:#27c93f; }
        .code-title { font-size:0.75rem; color:#888; font-family:monospace; }
        .code-content { padding:20px; font-family:monospace; font-size:0.85rem; line-height:1.8; background:rgba(0,0,0,0.2); }
        .code-line { display:flex; gap:16px; }
        .line-number { color:#555; min-width:28px; }
        .line-code { color:#c084fc; }
        .code-line:nth-child(odd) .line-code { color:#7c3aed; }
        .code-line:nth-child(4) .line-code { color:#60a5fa; }
        .code-cursor { width:8px; height:16px; background:#c084fc; display:inline-block; margin-left:44px; animation:blink 1s infinite; }
        
        @media (max-width:1024px) {
          .hero-container { padding:0 40px; }
          .hero-wrapper { flex-direction:column; text-align:center; padding:80px 0; }
          .hero-content-left { text-align:center; }
          .btn-group, .social-links { justify-content:center; }
          .hero-right { width:100%; }
        }
        @media (max-width:768px) {
          .hero-container { padding:0 24px; }
          .hero-title { font-size:1.8rem; }
          .hero-description { font-size:1rem; }
          .btn-group { flex-direction:column; align-items:center; }
          .btn-primary, .btn-outline { width:100%; justify-content:center; }
          .code-block { max-width:100%; }
          .dynamic-word { min-width: 110px; }
        }

/* Add at the end of the style tag, inside @media (max-width:768px) */

@media (max-width: 768px) {
  .hero-container { padding:0 24px; }
  .hero-title { font-size:1.8rem; }
  .hero-description { font-size:1rem; }
  
  /* FIX: Make buttons shorter on mobile - not full width */
  .btn-group { 
    flex-direction: row !important;  /* Keep buttons side by side */
    align-items: center; 
    justify-content: center;
    gap: 12px;
  }
  
  .btn-primary, .btn-outline { 
    width: auto !important;  /* Remove full width */
    min-width: 120px;
    padding: 10px 20px !important;
    font-size: 0.85rem !important;
    justify-content: center; 
  }
  
  .code-block { max-width:100%; }
  .dynamic-word { min-width: 110px; }
}

/* For very small phones (below 480px) */
@media (max-width: 480px) {
  .btn-primary, .btn-outline {
    min-width: 100px;
    padding: 8px 16px !important;
    font-size: 0.75rem !important;
  }
  
  .btn-group {
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem !important;
    line-height: 1.3;
    text-align: center;
  }
  
  .dynamic-word {
    display: inline-block;
    font-size: 1.6rem;
    margin-top: 5px;
  }
}

      `}</style>
    </section>
  );
};

export default Hero;
