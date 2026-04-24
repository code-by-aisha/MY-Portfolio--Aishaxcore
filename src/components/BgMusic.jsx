import React, { useEffect, useRef, useState } from 'react';

const ScrollSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lastPlayTime = useRef(0);
  const audioRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  // ========== ADJUST THESE VALUES ==========
  const PLAY_DURATION = 6000;      // How long sound plays (milliseconds) - 6000ms = 6 seconds
  const FADE_DURATION = 2000;      // How long fade out takes (milliseconds) - 2000ms = 2 seconds
  const COOLDOWN_TIME = 5000;       // Wait time between plays (milliseconds) - 5000ms = 5 seconds
  const VOLUME_LEVEL = 0.30;        // Sound volume (0 to 1) - 0.30 = 30% volume
  // ========================================

  // Function to enable sound
  const enableSound = () => {
    const testAudio = new Audio('/sounds/sound2.mp3');
    testAudio.volume = VOLUME_LEVEL;
    
    testAudio.play()
      .then(() => {
        console.log(`✅ Sound enabled! Volume: ${VOLUME_LEVEL * 100}%`);
        setSoundEnabled(true);
        testAudio.pause();
        testAudio.currentTime = 0;
        audioRef.current = testAudio;
      })
      .catch(err => {
        console.log('Sound file error:', err);
        alert('Sound file not found. Make sure sound2.mp3 is in public/sounds/ folder');
      });
  };

  // Smooth fade out function
  const smoothFadeOut = (audio, duration) => {
    const startVolume = audio.volume;
    const startTime = Date.now();
    
    const fadeOut = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const newVolume = startVolume * (1 - progress);
      audio.volume = Math.max(0, newVolume);
      
      if (progress < 1) {
        fadeTimeoutRef.current = setTimeout(fadeOut, 50);
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVolume;
        console.log(`🔇 Sound faded out after ${PLAY_DURATION}ms play + ${FADE_DURATION}ms fade`);
      }
    };
    
    fadeOut();
  };

  // Function to play scroll sound
  const playScrollSound = () => {
    if (!soundEnabled || !audioRef.current) return;
    
    const now = Date.now();
    if (now - lastPlayTime.current < COOLDOWN_TIME) {
      console.log(`⏳ Cooldown: Wait ${Math.round((COOLDOWN_TIME - (now - lastPlayTime.current)) / 1000)}s`);
      return;
    }
    lastPlayTime.current = now;
    
    // Clear any existing fade timeout
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    
    // Reset volume
    audioRef.current.volume = VOLUME_LEVEL;
    audioRef.current.currentTime = 0;
    
    audioRef.current.play()
      .then(() => {
        console.log(`🎵 Scroll sound playing for ${PLAY_DURATION / 1000} seconds, then fade out for ${FADE_DURATION / 1000} seconds`);
        
        // Play for set duration, then fade out
        setTimeout(() => {
          smoothFadeOut(audioRef.current, FADE_DURATION);
        }, PLAY_DURATION);
      })
      .catch(e => console.log('Play error:', e));
  };

  useEffect(() => {
    if (soundEnabled) {
      window.addEventListener('scroll', playScrollSound);
    }
    
    return () => {
      window.removeEventListener('scroll', playScrollSound);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [soundEnabled]);

  if (!soundEnabled) {
    return (
      <button
        onClick={enableSound}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #c084fc, #a855f7)',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 24px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          transition: 'transform 0.3s ease',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        🔊 Enable Scroll Sound
      </button>
    );
  }

  return null;
};

export default ScrollSound;