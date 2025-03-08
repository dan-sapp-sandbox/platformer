import * as ex from 'excalibur'

export const generatePauseScreen = (engine: ex.Engine) => {

  let isPaused = false;

  const togglePause = (isPaused: boolean) => {
    if (isPaused) {
      engine.clock.stop();
      const pauseMenuElement = document.getElementById('pause-menu')
      if (pauseMenuElement) {
        pauseMenuElement.style.visibility = 'visible';
      }
    } else {
      engine.clock.start();
      const pauseMenuElement = document.getElementById('pause-menu')
      if (pauseMenuElement) {
        pauseMenuElement.style.visibility = 'hidden';
      }
    }
  }

  engine.input.keyboard.on('press', (evt) => {
    if (evt.key === ex.Keys.Escape) {
      isPaused = !isPaused;
      togglePause(isPaused);
    }
  });

}
