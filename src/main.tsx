import { attachKeyboardProcessor } from "./keyboardProcessor";
import { Game } from "./game";
import { attachVirtualKeyboardListeners } from "./virtualKeyboard";
import { attachPhysicalKeyboardListeners } from "./physicalKeyboard";
import {
  setAttempt,
  setAttemptResult,
  setKeyboardState,
  rejectAttempt,
  notify,
} from "./ui";
import * as modal from "./modal";

console.log("init main.ts");

const game = new Game({ keyboardState: {}, currentAttemptIndex: 0 });

attachPhysicalKeyboardListeners();
attachVirtualKeyboardListeners();
const deattachKeyboardProcessor = attachKeyboardProcessor({
  typeCallback: onLetterType,
  commitCallback: onEnter,
  lettersLimitCallback: onLettersLimitCallback,
});

function onLettersLimitCallback() {
  console.log("STOP FUCKING TYPING");
}

function onLetterType(attempt: string) {
  setAttempt(attempt, game.currentAttemptIndex);
}

function onEnter(attempt: string) {
  const success = game.commitAttempt(attempt);
  return { success };
}

game.on("attemptcommit", (event) => {
  setAttemptResult(event.attemptIndex, event.attemptResult);
  setKeyboardState(event.keyboardState);
});

game.on("notindictionary", (event) => {
  notify("NO WORD");
  rejectAttempt(event.attemptIndex);
});

game.on("gamefail", (event) => {
  notify(event.solution);
  deattachKeyboardProcessor();
});

game.on("gamewin", (event) => {
  notify(
    ["Genius!", "Gorgeous", "Great!!", "Norm!", "Poidet!"][
      event.attemptIndex
    ]
  );
  modal.showModal();
  deattachKeyboardProcessor();
});