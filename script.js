document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Welcome Overlay & Audio Autoplay Fix
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const enterBtn = document.getElementById('enterBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicStatus = document.getElementById('musicStatus');
    const musicIcon = musicToggle ? musicToggle.querySelector('i') : null;
    let isPlaying = false;

    if (bgMusic) {
        bgMusic.volume = 0.4;
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Hide overlay
            welcomeOverlay.style.opacity = '0';
            setTimeout(() => {
                welcomeOverlay.style.visibility = 'hidden';
            }, 1000);

            // Play music on first interaction
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    if(musicToggle) musicToggle.classList.add('playing');
                }).catch(e => {
                    console.log("Audio play failed:", e);
                });
            }

            // Trigger hero animation immediately
            const hero = document.getElementById('hero');
            if(hero) hero.classList.add('show-element');
        });
    }

    // 1. Initialize Particles.js (subtle glowing particles)
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: '#e8a5a5' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 5, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
                line_linked: { enable: false },
                move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: false, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }


    // 2. Generate Floating Hearts
    const heartsContainer = document.getElementById('hearts-container');
    const hearts = ['❤️', '💖', '💕', '💗', '🤍', '✨'];
    
    function createHeart() {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's'; 
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 25000);
    }
    
    setInterval(createHeart, 600);
    for(let i=0; i<15; i++) {
        setTimeout(createHeart, i * 200);
    }


    // 3. Background Music Toggle logic
    if (bgMusic && musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicStatus.innerText = 'Music Off';
                musicIcon.classList.remove('fa-music');
                musicIcon.classList.add('fa-volume-mute');
                musicToggle.classList.remove('playing');
            } else {
                bgMusic.play().then(() => {
                    musicStatus.innerText = 'Music On';
                    musicIcon.classList.remove('fa-volume-mute');
                    musicIcon.classList.add('fa-music');
                    musicToggle.classList.add('playing');
                }).catch(e => {
                    console.log("Audio play failed:", e);
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. Scroll Animation (Intersection Observer)
    const sections = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 5. Button Interaction
    const forgiveBtn = document.getElementById('forgiveBtn');
    const successMessage = document.getElementById('successMessage');

    if (forgiveBtn) {
        forgiveBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) translateZ(30px)';
            setTimeout(() => {
                this.style.transform = 'scale(1) translateZ(30px)';
                this.style.display = 'none';
                if (successMessage) successMessage.classList.add('show');
            }, 150);
            
            for(let i=0; i<50; i++) {
                setTimeout(createHeart, i * 30);
            }
        });
    }
});
