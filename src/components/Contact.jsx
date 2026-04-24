import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Contact = () => {
  useEffect(() => {
    gsap.fromTo('.contact-form',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }
    )
  }, [])

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <h2 className="section-title">
          Let's create <span className="gradient-text">together</span>
        </h2>
        <p className="contact-subtitle">Have a project in mind? Let's bring your vision to life.</p>
        
        <form className="contact-form" action="https://formspree.io/f/movdvqgl" method="POST">
          <div className="form-group">
            <input type="text" name="name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email address" required />
          </div>
          <div className="form-group">
            <input type="text" name="project" placeholder="Project type" />
          </div>
          <div className="form-group">
            <textarea name="message" rows="5" placeholder="Tell me about your vision..." required></textarea>
          </div>
          <button type="submit" className="btn-primary submit-btn">
            Send Message <i className="fas fa-paper-plane"></i>
          </button>
          <p className="form-note">Powered by Formspree — I'll get back within 48h</p>
        </form>
        
        <div className="contact-links">
          <a href="mailto:aishafayaz292@gmail.com" className="contact-link">
            <i className="fas fa-envelope"></i> aishafayaz292@gmail.com
          </a>
          <a href="https://github.com/code-by-aisha" className="contact-link">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://www.linkedin.com/in/aisha-fayaz-72a3b9385/" className="contact-link">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 120px 0;
          text-align: center;
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
        }
        
        .contact-subtitle {
          color: #aaa;
          margin-bottom: 50px;
          font-size: 1.1rem;
        }
        
        .contact-form {
          max-width: 600px;
          margin: 0 auto 60px;
          text-align: left;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: white;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #c084fc;
          background: rgba(192, 132, 252, 0.05);
        }
        
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #666;
        }
        
        .submit-btn {
          width: 100%;
          justify-content: center;
          background: linear-gradient(135deg, #c084fc, #a855f7);
          color: white;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
        }
        
        .form-note {
          text-align: center;
          font-size: 0.8rem;
          color: #666;
          margin-top: 16px;
        }
        
        .contact-links {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        
        .contact-link {
          font-size: 1.1rem;
          font-weight: 500;
          text-decoration: none;
          color: white;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        
        .contact-link i {
          color: #c084fc;
        }
        
        .contact-link:hover {
          color: #c084fc;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .contact-section {
            padding: 80px 0;
          }
          .contact-links {
            gap: 24px;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact