// Sample playlist data
const playlist = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Echo",
        duration: "3:45",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://picsum.photos/seed/music1/400/400.jpg"
    },
    {
        id: 2,
        title: "Electric Pulse",
        artist: "Neon Waves",
        duration: "4:12",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://picsum.photos/seed/music2/400/400.jpg"
    },
    {
        id: 3,
        title: "Summer Breeze",
        artist: "Coastal Vibes",
        duration: "3:28",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://picsum.photos/seed/music3/400/400.jpg"
    },
    {
        id: 4,
        title: "Urban Lights",
        artist: "City Sounds",
        duration: "3:56",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://picsum.photos/seed/music4/400/400.jpg"
    },
    {
        id: 5,
        title: "Crystal Clear",
        artist: "Aurora",
        duration: "4:03",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "https://picsum.photos/seed/music5/400/400.jpg"
    },
    {
        id: 6,
        title: "Deep Ocean",
        artist: "Aqua Marine",
        duration: "3:37",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        cover: "https://picsum.photos/seed/music6/400/400.jpg"
    },
    {
        id: 7,
        title: "Mountain High",
        artist: "Alpine Echo",
        duration: "4:21",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        cover: "https://picsum.photos/seed/music7/400/400.jpg"
    },
    {
        id: 8,
        title: "Starlight",
        artist: "Cosmic Dreams",
        duration: "3:52",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        cover: "https://picsum.photos/seed/music8/400/400.jpg"
    },
    {
        id: 9,
        title: "Tere Bina",
        artist: "A.R. Rahman",
        duration: "5:23",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        cover: "https://picsum.photos/seed/terebina/400/400.jpg"
    },
    {
        id: 10,
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        duration: "4:23",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        cover: "https://picsum.photos/seed/tumhiho/400/400.jpg"
    },
    {
        id: 11,
        title: "Chaiyya Chaiyya",
        artist: "Sukhwinder Singh, Sapna Awasthi",
        duration: "6:58",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        cover: "https://picsum.photos/seed/chaiyya/400/400.jpg"
    }
];

// Audio Controller Class
class AudioController {
    constructor() {
        this.audioPlayer = document.getElementById('audioPlayer');
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffleOn = false;
        this.repeatMode = 'off'; // 'off', 'one', 'all'
        this.volume = 0.7;
        this.playedTracks = [];
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadTrack(0);
        this.loadPlaylist();
        this.loadSettings();
    }

    initializeElements() {
        // Player elements
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.playPauseIcon = document.getElementById('playPauseIcon');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        
        // Track info
        this.trackTitle = document.getElementById('trackTitle');
        this.trackArtist = document.getElementById('trackArtist');
        this.albumImage = document.getElementById('albumImage');
        this.albumArt = document.getElementById('albumArt');
        
        // Progress
        this.progressBar = document.getElementById('progress');
        this.progressHandle = document.getElementById('progressHandle');
        this.progressContainer = document.querySelector('.progress-bar');
        this.currentTimeEl = document.getElementById('currentTime');
        this.totalTimeEl = document.getElementById('totalTime');
        
        // Volume
        this.volumeBtn = document.getElementById('volumeBtn');
        this.volumeIcon = document.getElementById('volumeIcon');
        this.volumeInput = document.getElementById('volumeInput');
        this.volumeProgress = document.getElementById('volumeProgress');
        
        // Playlist
        this.playlistEl = document.getElementById('playlist');
        this.trackCountEl = document.getElementById('trackCount');
        
        // Theme
        this.themeToggle = document.getElementById('themeToggle');
        
        // Loading
        this.loadingSpinner = document.getElementById('loadingSpinner');
        
        // Shortcuts
        this.shortcutsToggle = document.getElementById('shortcutsToggle');
        this.shortcutsPanel = document.getElementById('shortcutsPanel');
    }

    initializeEventListeners() {
        // Play/Pause
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        
        // Navigation
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());
        
        // Shuffle and Repeat
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        
        // Progress bar
        this.progressContainer.addEventListener('click', (e) => this.seekTo(e));
        
        // Volume
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        this.volumeInput.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
        
        // Audio events
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.onTrackEnd());
        this.audioPlayer.addEventListener('loadstart', () => this.showLoading());
        this.audioPlayer.addEventListener('canplay', () => this.hideLoading());
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Shortcuts panel
        this.shortcutsToggle.addEventListener('click', () => this.toggleShortcutsPanel());
        
        // Close shortcuts panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.shortcutsToggle.contains(e.target) && !this.shortcutsPanel.contains(e.target)) {
                this.shortcutsPanel.classList.remove('active');
            }
        });
    }

    loadTrack(index) {
        if (index < 0 || index >= playlist.length) return;
        
        this.currentTrackIndex = index;
        const track = playlist[index];
        
        // Update audio source
        this.audioPlayer.src = track.url;
        
        // Update UI
        this.trackTitle.textContent = track.title;
        this.trackArtist.textContent = track.artist;
        this.albumImage.src = track.cover;
        
        // Update playlist highlight
        this.updatePlaylistHighlight();
        
        // Save to localStorage
        this.saveCurrentTrack();
        
        // Reset progress
        this.progressBar.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
    }

    loadPlaylist() {
        this.playlistEl.innerHTML = '';
        this.trackCountEl.textContent = `${playlist.length} tracks`;
        
        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.dataset.index = index;
            
            item.innerHTML = `
                <div class="playlist-item-number">${index + 1}</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${track.title}</div>
                    <div class="playlist-item-artist">${track.artist}</div>
                </div>
                <div class="playlist-item-duration">${track.duration}</div>
            `;
            
            item.addEventListener('click', () => {
                this.loadTrack(index);
                this.play();
            });
            
            this.playlistEl.appendChild(item);
        });
        
        this.updatePlaylistHighlight();
    }

    updatePlaylistHighlight() {
        const items = this.playlistEl.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === this.currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audioPlayer.play();
        this.isPlaying = true;
        this.playPauseIcon.className = 'fas fa-pause';
        this.albumArt.classList.add('playing');
    }

    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.playPauseIcon.className = 'fas fa-play';
        this.albumArt.classList.remove('playing');
    }

    playPrevious() {
        if (this.isShuffleOn) {
            this.playShuffledPrevious();
        } else {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + playlist.length) % playlist.length;
            this.loadTrack(this.currentTrackIndex);
            if (this.isPlaying) this.play();
        }
    }

    playNext() {
        if (this.isShuffleOn) {
            this.playShuffledNext();
        } else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % playlist.length;
            this.loadTrack(this.currentTrackIndex);
            if (this.isPlaying) this.play();
        }
    }

    playShuffledNext() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === this.currentTrackIndex && playlist.length > 1);
        
        this.playedTracks.push(this.currentTrackIndex);
        this.loadTrack(nextIndex);
        if (this.isPlaying) this.play();
    }

    playShuffledPrevious() {
        if (this.playedTracks.length > 0) {
            const prevIndex = this.playedTracks.pop();
            this.loadTrack(prevIndex);
            if (this.isPlaying) this.play();
        }
    }

    toggleShuffle() {
        this.isShuffleOn = !this.isShuffleOn;
        this.shuffleBtn.classList.toggle('active', this.isShuffleOn);
        if (!this.isShuffleOn) {
            this.playedTracks = [];
        }
    }

    toggleRepeat() {
        const modes = ['off', 'all', 'one'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];
        
        this.repeatBtn.classList.toggle('active', this.repeatMode !== 'off');
        
        // Update icon based on mode
        if (this.repeatMode === 'one') {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo">1</i>';
        } else {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        }
    }

    onTrackEnd() {
        if (this.repeatMode === 'one') {
            this.audioPlayer.currentTime = 0;
            this.play();
        } else if (this.repeatMode === 'all' || this.isShuffleOn) {
            this.playNext();
        } else if (this.currentTrackIndex < playlist.length - 1) {
            this.playNext();
        } else {
            this.pause();
        }
    }

    seekTo(event) {
        const rect = this.progressContainer.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        this.audioPlayer.currentTime = percent * this.audioPlayer.duration;
    }

    updateProgress() {
        if (this.audioPlayer.duration) {
            const percent = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
            this.progressBar.style.width = `${percent}%`;
            this.currentTimeEl.textContent = this.formatTime(this.audioPlayer.currentTime);
        }
    }

    updateDuration() {
        this.totalTimeEl.textContent = this.formatTime(this.audioPlayer.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    setVolume(value) {
        this.volume = value;
        this.audioPlayer.volume = value;
        this.volumeInput.value = value * 100;
        this.volumeProgress.style.width = `${value * 100}%`;
        this.updateVolumeIcon();
        this.saveSettings();
    }

    toggleMute() {
        if (this.audioPlayer.volume > 0) {
            this.previousVolume = this.audioPlayer.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume || 0.7);
        }
    }

    updateVolumeIcon() {
        const volume = this.audioPlayer.volume;
        let iconClass = 'fas fa-volume-up';
        
        if (volume === 0) {
            iconClass = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            iconClass = 'fas fa-volume-down';
        }
        
        this.volumeIcon.className = iconClass;
    }

    showLoading() {
        this.loadingSpinner.classList.add('active');
    }

    hideLoading() {
        this.loadingSpinner.classList.remove('active');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        localStorage.setItem('theme', newTheme);
    }

    handleKeyboard(event) {
        // Prevent default for audio controls
        if (event.code === 'Space' || event.code.startsWith('Arrow')) {
            event.preventDefault();
        }
        
        switch(event.code) {
            case 'Space':
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                this.playPrevious();
                break;
            case 'ArrowRight':
                this.playNext();
                break;
            case 'ArrowUp':
                this.setVolume(Math.min(1, this.volume + 0.1));
                break;
            case 'ArrowDown':
                this.setVolume(Math.max(0, this.volume - 0.1));
                break;
            case 'KeyM':
                this.toggleMute();
                break;
        }
    }

    toggleShortcutsPanel() {
        this.shortcutsPanel.classList.toggle('active');
    }

    saveCurrentTrack() {
        localStorage.setItem('currentTrack', this.currentTrackIndex.toString());
    }

    saveSettings() {
        localStorage.setItem('volume', this.volume.toString());
        localStorage.setItem('shuffle', this.isShuffleOn.toString());
        localStorage.setItem('repeatMode', this.repeatMode);
    }

    loadSettings() {
        // Load theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = this.themeToggle.querySelector('i');
        icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        // Load current track
        const savedTrack = localStorage.getItem('currentTrack');
        if (savedTrack) {
            const trackIndex = parseInt(savedTrack);
            if (trackIndex >= 0 && trackIndex < playlist.length) {
                this.loadTrack(trackIndex);
            }
        }
        
        // Load volume
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume) {
            this.setVolume(parseFloat(savedVolume));
        }
        
        // Load shuffle
        const savedShuffle = localStorage.getItem('shuffle');
        if (savedShuffle === 'true') {
            this.toggleShuffle();
        }
        
        // Load repeat mode
        const savedRepeat = localStorage.getItem('repeatMode');
        if (savedRepeat) {
            this.repeatMode = savedRepeat;
            this.toggleRepeat(); // This will cycle through modes, so we need to set it correctly
            // Set the correct mode
            const modes = ['off', 'all', 'one'];
            const targetIndex = modes.indexOf(savedRepeat);
            const currentIndex = modes.indexOf(this.repeatMode);
            const diff = (targetIndex - currentIndex + 3) % 3;
            for (let i = 0; i < diff; i++) {
                this.toggleRepeat();
            }
        }
    }
}

// Initialize the audio controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AudioController();
});
