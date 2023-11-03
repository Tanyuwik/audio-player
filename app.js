let currentAudio = 0;

const audio = document.querySelector("#audio");
const typeAudio = document.querySelector(".type_audio");
const musicName = document.querySelector(".song_name");
const artist = document.querySelector(".artist");
const audioImage = document.querySelector(".audio_image");
const currentTime = document.querySelector(".current_time");
const audioDuration = document.querySelector(".audio_duration");
const btnPlay = document.querySelector(".btn_play");
const btnForward = document.querySelector(".fa-forward");
const btnBackward = document.querySelector(".fa-backward");

btnPlay.addEventListener("click", () => {
  if (btnPlay.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  btnPlay.classList.toggle("pause");
});

let musics = [
  {
    name: "In the end",
    path: "audio/linkin_park_-_in_the_end.mp3",
    artist: "linkin park",
    cover: "images/linkin_park.png",
  },
  {
    name: "beautiful",
    path: "audio/eminem_–_beautiful.mp3",
    artist: "eminem",
    cover: "images/eminem_-_beautiful.jpg",
  },
  {
    name: "stay",
    path: "audio/hurts_stay.mp3",
    artist: "hurts",
    cover: "images/hurts.jpg",
  },
];

const setAudio = (i) => {
  typeAudio.value = 0;
  let music = musics[i];
  currentAudio = i;
  audio.src = music.path;

  musicName.innerHTML = music.name;
  artist.innerHTML = music.artist;
  audioImage.style.backgroundImage = `url('${music.cover}')`;

  currentTime.innerHTML = "00:00";
  audio.addEventListener(
    "loadedmetadata",
    () => {
      typeAudio.max = audio.duration;
      audioDuration.innerHTML = formatTime(audio.duration);
    },
    300
  );
};

setAudio(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min} : ${sec}`;
};

setInterval(() => {
  typeAudio.value = audio.currentTime;
  currentTime.innerHTML = formatTime(audio.currentTime);
  if (Math.floor(audio.currentTime) == Math.floor(typeAudio.max)) {
    btnForward.click();
  }
}, 500);

typeAudio.addEventListener("change", () => {
  audio.currentTime = typeAudio.value;
});

const playAudio = () => {
  audio.play();
  btnPlay.classList.remove("pause");
  audioImage.classList.add("play");
};

btnForward.addEventListener("click", () => {
  if (currentAudio >= musics.length - 1) {
    currentAudio = 0;
  } else {
    currentAudio++;
  }
  setAudio(currentAudio);
  playAudio();
});

btnBackward.addEventListener("click", () => {
  if (currentAudio <= 0) {
    currentAudio = musics.length - 1;
  } else {
    currentAudio--;
  }
  setAudio(currentAudio);
  playAudio();
});
