document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if(savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    // Toggle theme when checkbox changes
    darkModeToggle.addEventListener('change', function() {
        if(this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Sidebar Toggle
    const menuBtn = document.querySelector('.nav-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if(menuBtn) {
        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if(sidebar.classList.contains('active') && 
           !sidebar.contains(event.target) && 
           !menuBtn.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Play/Pause Toggle
    const playPauseBtn = document.querySelector('.play-pause-btn');
    let isPlaying = false;
    
    if(playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            isPlaying = !isPlaying;
            if(isPlaying) {
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    // Heart/Like Toggle
    const likeBtn = document.querySelector('.like-btn');
    let isLiked = false;
    
    if(likeBtn) {
        likeBtn.addEventListener('click', function() {
            isLiked = !isLiked;
            if(isLiked) {
                this.innerHTML = '<i class="fas fa-heart"></i>';
                this.style.color = 'var(--primary-color)';
            } else {
                this.innerHTML = '<i class="far fa-heart"></i>';
                this.style.color = 'var(--icon-color)';
            }
        });
    }
    
    // Progress Bar Functionality
    const progressContainer = document.querySelector('.progress-container');
    const progress = document.querySelector('.progress');
    const progressHandle = document.querySelector('.progress-handle');
    
    if(progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const width = this.clientWidth;
            const clickPosition = e.offsetX;
            const progressPercentage = (clickPosition / width) * 100;
            
            progress.style.width = `${progressPercentage}%`;
        });
    }
    
    // Volume Bar Functionality
    const volumeBar = document.querySelector('.volume-bar');
    const volumeLevel = document.querySelector('.volume-level');
    
    if(volumeBar) {
        volumeBar.addEventListener('click', function(e) {
            const width = this.clientWidth;
            const clickPosition = e.offsetX;
            const volumePercentage = (clickPosition / width) * 100;
            
            volumeLevel.style.width = `${volumePercentage}%`;
        });
    }
    
    // Card Hover Animation for Music Cards
    const musicCards = document.querySelectorAll('.music-card');
    
    musicCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Artist Card Hover Animation
    const artistCards = document.querySelectorAll('.artist-card');
    
    artistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Add active class to nav items on click
    const navItems = document.querySelectorAll('.nav-links li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search input animation
    const searchInput = document.querySelector('.search-container input');
    
    if(searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.03)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
    
    // Simulate loading new content when clicking "See All"
    const seeAllLinks = document.querySelectorAll('.see-all');
    
    seeAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('section');
            const sectionTitle = section.querySelector('h2').textContent;
            
            alert(`Loading more ${sectionTitle}...`);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add animation to the hero section
    const heroSection = document.querySelector('.hero-section');
    
    if(heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const opacity = 1 - (scrollPosition * 0.003);
            
            if(opacity > 0) {
                heroSection.style.opacity = opacity;
                heroSection.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
        });
    }
    
    // Create floating music notes in the background
    function createMusicNotes() {
        const notes = ['♪', '♫', '♬', '♩', '♭', '♮'];
        const colors = ['var(--primary-color)', 'var(--secondary-color)'];
        const container = document.querySelector('.background-animation');
        
        if(!container) return;
        
        setInterval(() => {
            const note = document.createElement('div');
            note.classList.add('floating-note');
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            note.style.color = colors[Math.floor(Math.random() * colors.length)];
            note.style.left = `${Math.random() * 100}%`;
            note.style.opacity = '0';
            note.style.fontSize = `${Math.random() * 20 + 10}px`;
            
            container.appendChild(note);
            
            setTimeout(() => {
                note.style.opacity = '0.2';
                note.style.transform = `translateY(-${Math.random() * 100 + 100}px) rotate(${Math.random() * 360}deg)`;
            }, 100);
            
            setTimeout(() => {
                note.remove();
            }, 10000);
        }, 3000);
    }
    
    createMusicNotes();
    
    // Add CSS for the new animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            pointer-events: none;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        
        .floating-note {
            position: absolute;
            bottom: -20px;
            pointer-events: none;
            transition: all 10s ease-out;
        }
    `;
    document.head.appendChild(style);
});
