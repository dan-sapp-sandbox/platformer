import * as ex from "excalibur";

export const Resources = {
  // Images
  Vampire: new ex.ImageSource("/assets/images/vampire.png"),
  Slime1: new ex.ImageSource("/assets/images/slime1.png"),
  Slime2: new ex.ImageSource("/assets/images/slime2.png"),
  Slime3: new ex.ImageSource("/assets/images/slime3.png"),
  Trees: new ex.ImageSource("/assets/images/trees.png"),
  Floor1: new ex.ImageSource("/assets/images/floor1.png"),
  FieldsTileset: new ex.ImageSource("/assets/images/FieldsTileset.png"),
  BlueCrystal: new ex.ImageSource("/assets/images/blueCrystal.png"),

  // Sounds
  FlapSound: new ex.Sound("/assets/sounds/zoom.mp3"),
  FailSound: new ex.Sound("/assets/sounds/snake.mp3"),

  // Music
  BackgroundMusic: new ex.Sound("/assets/sounds/song.mp3"),
} as const;
