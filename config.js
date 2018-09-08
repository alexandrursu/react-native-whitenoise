export const songs = [
  {
    key: 1,
    fileName: "white-noise.mp3",
    name: "White Noise Baby Sleep",
    duration: 601
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
    duration: 239.65
  },
  {
    key: 4,
    fileName: "relaxing-shower.mp3",
    name: "Relaxing Shower Sound",
    duration: 601
  },
  {
    key: 5,
    fileName: "water-tap-running.mp3",
    name: "Running Water White Noise",
    duration: 239.65
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
    key: 4,
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
    key: 2,
    name: "Auto Play on Start",
    setting: "autoPLay",
    value: false,
    icon: {
      name: "playlist-play",
      type: "material"
    }
  },
  {
    key: 3,
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
