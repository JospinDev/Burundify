document.addEventListener('DOMContentLoaded', function() {
    // Add play icons to song rows on hover
    const songRows = document.querySelectorAll('.song-row');
    
    songRows.forEach(row => {
        const hashCell = row.querySelector('.hash');
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        
        hashCell.parentNode.insertBefore(playIcon, hashCell);
        
        // Add click event to play the song
        row.addEventListener('click', function() {
            const songTitle = this.querySelector('.song-title').textContent;
            const songArtist = this.querySelector('.song-artist').textContent;
            const songImage = this.querySelector('.song-info img').src;
            
            // Update now playing bar
            document.querySelector('.now-playing-info h4').textContent = songTitle;
            document.querySelector('.now-playing-info p').textContent = songArtist;
            document.querySelector('.now-playing-cover').src = songImage;
            
            // Change play button to pause
            const playPauseBtn = document.querySelector('.play-pause-btn');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            
            // Add active class to the clicked row
            songRows.forEach(r => r.classList.remove('active-song'));
            this.classList.add('active-song');
        });
    });
    
    // Play All button functionality
    const playAllBtn = document.querySelector('.play-all-btn');
    
    playAllBtn.addEventListener('click', function() {
        // Change play button to pause
        this.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Update now playing with first song
        const firstSong = document.querySelector('.song-row');
        const songTitle = firstSong.querySelector('.song-title').textContent;
        const songArtist = firstSong.querySelector('.song-artist').textContent;
        const songImage = firstSong.querySelector('.song-info img').src;
        
        document.querySelector('.now-playing-info h4').textContent = songTitle;
        document.querySelector('.now-playing-info p').textContent = songArtist;
        document.querySelector('.now-playing-cover').src = songImage;
        
        // Change play button to pause in now playing bar
        document.querySelector('.play-pause-btn').innerHTML = '<i class="fas fa-pause"></i>';
        
        // Add active class to first song
        songRows.forEach(r => r.classList.remove('active-song'));
        firstSong.classList.add('active-song');
        
        // After 2 seconds, change back to play icon for demo purposes
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-play"></i>';
        }, 2000);
    });
    
    // Shuffle button functionality
    const shuffleBtn = document.querySelector('.shuffle-btn');
    
    shuffleBtn.addEventListener('click', function() {
        // Visual feedback for click
        this.classList.add('active-shuffle');
        
        // Shuffle animation
        const tableBody = document.querySelector('.table-body');
        const songRowsArray = Array.from(songRows);
        
        // Add transition to all rows
        songRowsArray.forEach(row => {
            row.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            row.style.opacity = '0.5';
            row.style.transform = 'translateX(20px)';
        });
        
        // After animation, shuffle the rows
        setTimeout(() => {
            // Shuffle array
            for (let i = songRowsArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [songRowsArray[i], songRowsArray[j]] = [songRowsArray[j], songRowsArray[i]];
            }
            
            // Remove all rows
            songRowsArray.forEach(row => row.remove());
            
            // Add back in shuffled order
            songRowsArray.forEach(row => {
                tableBody.appendChild(row);
                
                // Update the numbers
                songRowsArray.forEach((row, index) => {
                    row.querySelector('.hash').textContent = index + 1;
                });
            });
            
            // Reset styles
            songRowsArray.forEach(row => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            });
            
            // Reset shuffle button
            this.classList.remove('active-shuffle');
        }, 500);
    });
    
    // Recommendation card hover effects
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    
    recommendationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add CSS for active states and animations
    const style = document.createElement('style');
    style.textContent = `
        .active-song {
            background-color: var(--hover-bg);
        }
        
        .active-shuffle {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            transform: scale(1.1);
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .play-all-btn:active {
            animation: pulse 0.3s linear;
        }
    `;
    document.head.appendChild(style);
});
