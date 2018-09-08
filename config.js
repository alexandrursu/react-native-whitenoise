export const songs = [
  {
    key: 1,
    fileName: "white-noise.mp3",
    name: "White Noise Baby Sleep",
    duration: 600.99
  },
  {
    key: 2,
    fileName: "spring-river.mp3",
    name: "Spring River Sound",
    duration: 60.52
  },
  {
    key: 3,
    fileName: "exhaust-hood.mp3",
    name: "The Kitchen Hood",
    duration: 30.43
  },
  {
    key: 4,
    fileName: "relaxing-shower.mp3",
    name: "Relaxing Shower Sound",
    duration: 31.86
  },
  {
    key: 5,
    fileName: "water-tap-running.mp3",
    name: "Running Water White Noise",
    duration: 30.38
  }
];

export const settings = [
  {
    key: 1,
    name: "Baby Cry Detection",
    setting: "smartFeature",
    value: true,
    icon: {
      name: "child-friendly",
      type: ""
    }
  },
  {
    key: 2,
    name: "Stop Playing in 20 min",
    setting: "autoStop",
    value: false,
    duration: 20000, //seconds
    icon: {
      name: "stopwatch",
      type: "entypo"
    }
  },
  {
    key: 3,
    name: "Auto Play on Start",
    setting: "autoPLay",
    value: false,
    icon: {
      name: "playlist-play",
      type: "material"
    }
  },
  {
    key: 4,
    name: "Continuous Play",
    setting: "continuousPlay",
    value: true,
    icon: {
      name: "500px",
      type: "entypo"
    }
  }
];

export const defaultCurrent = {
  key: 1,
  fileName: "white-noise.mp3",
  name: "White Noise",
  duration: 601
};

export const defaultFavorite = {
  key: 1,
  fileName: "",
  name: "",
  duration: 0
};
