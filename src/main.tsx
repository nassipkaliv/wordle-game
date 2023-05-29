import { attachKeyboardProcessor } from "./keyboardProcessor";
import { Game } from "./game";
import { attachVirtualKeyboardListeners } from "./virtualKeyboard";
import { attachPhysicalKeyboardListeners } from "./physicalKeyboard";
import { setAttempt, setAttemptResult, setKeyboardState } from "./ui";

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
  console.log("STOP FUCKING TYPING U FKING ASSHOLE");
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

game.on("notindictionary", () => console.log("DUMB! NO WORD IN DICTIONARY"));

game.on("gamefail", () => {
  console.log("DUMBASSS!");
  deattachKeyboardProcessor();
});

game.on("gamewin", () => {
  console.log("UR LUCKY, ASSHOLE");
  deattachKeyboardProcessor();
});