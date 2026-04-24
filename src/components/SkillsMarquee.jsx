import React from 'react'

const SkillsMarquee = () => {
  const skills = [
    'HTML5', 'CSS3', 'Bootstrap','Tailwind CSS','JavaScript', 'React', 
     'Vite', 'Node.js', 'Express.js', 'ChatGPT', 'Gemini', 
    'Figma', 'Canva', 'Spline', 'VS Code', 'GSAP', 'Three.js','git', 'GitHub', 'Netlify', 'Vercel'
    
  ]

  return (
    <div className="skills-marquee">
      <div className="marquee-content">
        {skills.map((skill, index) => (
          <React.Fragment key={index}>
            <span className="skill-item">{skill}</span>
            <span className="skill-dot">✦</span>
          </React.Fragment>
        ))}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {skills.map((skill, index) => (
          <React.Fragment key={`clone-${index}`}>
            <span className="skill-item">{skill}</span>
            <span className="skill-dot">✦</span>
          </React.Fragment>
        ))}
      </div>

      <style jsx>{`
        .skills-marquee {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          padding: 20px 0;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 2;
        }
        
        .marquee-content {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        
        .skill-item {
          display: inline-block;
          margin: 0 20px;
          font-size: 1.25rem;
          font-weight: 500;
          color: #e0e0e0;
          letter-spacing: 0.5px;
        }
        
        .skill-dot {
          display: inline-block;
          color: #c084fc;
          font-size: 0.8rem;
          margin: 0 5px;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @media (max-width: 768px) {
          .skill-item {
            font-size: 0.85rem;
            margin: 0 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default SkillsMarquee