export const songs = [
  {
    key: 1,
    fileName: "white-noise-30.mp3",
    name: "White Noise Baby Sleep",
    duration: 30.02
  },
  {
    key: 2,
    fileName: "spring-river-30.mp3",
    name: "Spring River Sound",
    duration: 30.04
  },
  {
    key: 3,
    fileName: "exhaust-hood-30.mp3",
    name: "The Kitchen Hood",
    duration: 30.43
  },
  {
    key: 4,
    fileName: "relaxing-shower-30.mp3",
    name: "Relaxing Shower Sound",
    duration: 31.86
  },
  {
    key: 5,
    fileName: "water-tap-running-30.mp3",
    name: "Running Water Noise",
    duration: 30.38
  },
  {
    key: 6,
    fileName: "water-tap-running-fake.mp3",
    name: "Thunderstorm Effects",
    duration: 30.38
  }
];

export const settings = [
  {
    key: 1,
    name: "Baby Cry Detection",
    setting: "smartFeature",
    value: false,
    icon: {
      name: "child-friendly",
      type: ""
    }
  },
  {
    key: 2,
    name: "Auto Stop Timer",
    setting: "autoStop",
    value: true,
    duration: 3, // equal with 3 minutes, maximum value 60
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
  fileName: "white-noise-30.mp3",
  name: "White Noise Baby Sleep",
  duration: 30.02
};

export const continuousPlay = {
  key: 2,
  name: "Continuous Play",
  setting: "continuousPlay",
  value: false,
  duration: 0, //seconds
  icon: {
    name: "500px",
    type: "entypo"
  }
};
