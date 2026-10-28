// Synthesized UI "select" sound: a soft rising pop with a glassy overtone and
// a short echo, in the spirit of console menu sounds. Generated with Web Audio,
// so there is no audio file to load.

const storageKey = "sound";
const changeEvent = "sound-change";

let context: AudioContext | null = null;

function audio() {
  context ??= new AudioContext();
  // Browsers start the context suspended until a user gesture; clicks qualify.
  if (context.state === "suspended") void context.resume();
  return context;
}

export function isSoundOn() {
  try {
    return localStorage.getItem(storageKey) !== "off";
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(storageKey, on ? "on" : "off");
  } catch {
    // Storage blocked; the setting lasts for this page view only.
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function subscribeSound(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function tone(
  ac: AudioContext,
  destination: AudioNode,
  { type, from, to, start, glide, peak, decay }: {
    type: OscillatorType;
    from: number;
    to: number;
    start: number;
    glide: number;
    peak: number;
    decay: number;
  }
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + glide);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + decay);
  osc.connect(gain).connect(destination);
  osc.start(start);
  osc.stop(start + decay + 0.02);
}

export function playSelect() {
  const ac = audio();
  const now = ac.currentTime;

  const master = ac.createGain();
  master.gain.value = 0.5;
  const soften = ac.createBiquadFilter();
  soften.type = "lowpass";
  soften.frequency.value = 5000;
  master.connect(soften).connect(ac.destination);

  // Short feedback echo gives the airy, roomy tail.
  const echo = ac.createDelay();
  echo.delayTime.value = 0.085;
  const feedback = ac.createGain();
  feedback.gain.value = 0.22;
  const echoLevel = ac.createGain();
  echoLevel.gain.value = 0.35;
  master.connect(echo);
  echo.connect(feedback).connect(echo);
  echo.connect(echoLevel).connect(soften);

  // Body: a quick upward sweep reads as a soft "pop".
  tone(ac, master, { type: "sine", from: 520, to: 1040, start: now, glide: 0.035, peak: 0.32, decay: 0.16 });
  // Sparkle: a fainter fifth above, slightly late, for the glassy shimmer.
  tone(ac, master, { type: "triangle", from: 1560, to: 1568, start: now + 0.018, glide: 0.02, peak: 0.07, decay: 0.12 });

  // Break the echo loop once the tail has died out so the nodes can be freed.
  setTimeout(() => master.disconnect(), 1200);
}
