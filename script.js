const songs = [
  {
    title: "Novacane",
    artist: "Frank Ocean",
    src: "music/novacane.mp3",
    img: "asset/novacane.jpg",
  },
  {
    title: "She",
    artist: "Frank Ocean",
    src: "music/she.mp3",
    img: "asset/she.jpg",
  },
  {
    title: "American Wedding",
    artist: "Frank Ocean",
    src: "music/americanwedding.mp3",
    img: "asset/americanwedding.jpg",
  },
  {
    title: "Trouble",
    artist: "Frank Ocean",
    src: "music/trouble.mp3",
    img: "asset/trouble.jpg",
  },
  {
    title: "Ring Ring Ring",
    artist: "Tyler, The Creator",
    src: "music/ringringring.mp3",
    img: "asset/ringringring.jpg",
  }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const audioSource = document.getElementById("audioSource");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const progressBar = document.getElementById("progressBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");


function loadSong(index) {
  const song = songs[index];
  audioSource.src = song.src;
  audio.load();
  albumArt.src = song.img;
  songTitle.textContent = `Now Playing: ${song.title} - ${song.artist}`;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

function renderPlaylists() {
  const frankList = document.getElementById("frankList");
  const tylerList = document.getElementById("tylerList");
  songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}" />
      <p>${song.title}<br><span style="font-size: 11px; color: #aaa;">${song.artist}</span></p>
      <button onclick="likeSong(${index}); event.stopPropagation();">❤️</button>
    `;
    card.onclick = () => {
      currentSongIndex = index;
      loadSong(index);
      audio.play();
      playPauseBtn.textContent = "⏸️";
    };
    if (song.artist.includes("Frank")) frankList.appendChild(card);
    else tylerList.appendChild(card);
  });
}

const likedSongs = [];
function likeSong(index) {
  const song = songs[index];
  if (!likedSongs.includes(song)) {
    likedSongs.push(song);
    const likedContainer = document.getElementById("likedContainer");
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}" />
      <p>${song.title}<br><span style="font-size: 11px; color: #aaa;">${song.artist}</span></p>
    `;
    likedContainer.appendChild(card);
  }
}

function filterSongs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".song-card").forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? "flex" : "none";
  });
}
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Init
loadSong(currentSongIndex);
renderPlaylists();
