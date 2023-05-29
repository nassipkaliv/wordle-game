import { attachKeyboardProcessor } from "./keyboardProcessor";
import { setAttempt } from "./ui";
import { attachVirutalKeyboardListeners } from "./virtualKeyboard";
import { attachPhysicalKeyboardListeners } from "./physicalKeyboard";

console.log("init main.tsx");

function onType(attempt: string) {
  console.log("type", attempt);
  setAttempt(attempt, 0);
}

function onCommit(attempt: string) {
  console.log("commit", attempt);
}

function onLettersLimitCallback() {
  console.log("stop FUCKING WRITING U STUPID BITCH!");
}

attachKeyboardProcessor({
  typeCallback: onType,
  commitCallback: onCommit,
  lettersLimitCallback: onLettersLimitCallback,
});

attachPhysicalKeyboardListeners();
attachVirutalKeyboardListeners();