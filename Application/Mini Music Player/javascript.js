const songList = [
	{
		name: "Jazz In  Paris",
		artist: "Media Right Productions",
		scr: "assets/1.mp3",
		cover: "assets/1.png",
	},
	{
		name: "Blue Skies",
		artist: "Silent Partner",
		scr: "assets/2.mp3",
		cover: "assets/2.png",
	},
	{
		name: "Crimson Fly",
		artist: "Huma-Huma",
		scr: "assets/3.mp3",
		cover: "assets/3.png",
	},
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const prog = document.querySelector(".progress-bar");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.getElementById("cover");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
	loadSong(currentSong);
	song.addEventListener("timeupdate", updateProgress);
	song.addEventListener("ended", nextSong);
	prevBtn.addEventListener("click", prevSong);
	playBtn.addEventListener("click", togglePlayPause);
	nextBtn.addEventListener("click", nextSong);
	prog.addEventListener("click", seek);
});

function loadSong(index) {
	const { name, artist, scr, cover: thumb } = songList[index];
	artistName.innerText = artist;
	musicNameName.innerText = name;
	song.scr = scr;
	cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
	if (song.duration) {
		const pos = (song.currentTime / song.duration) * 100;
		fillBar.style.width = `${pos}%`;

		const duration = formatTime(song.duration);
		const currentTime = formatTime(song.currentTime);
		time.innerText = `${currentTime} - ${duration}`;
	}
}

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
