export function canSpeak() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function speakFrench(text) {
  if (!canSpeak()) return false;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const frenchVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("fr"));

  utterance.lang = "fr-FR";
  utterance.rate = 0.82;
  utterance.pitch = 1;
  if (frenchVoice) utterance.voice = frenchVoice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}
