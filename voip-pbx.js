const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const scenarioStates = new Map();
const phaseLabels = [
  "Bereit für den Anruf",
  "Der Anrufer hat ein Anliegen",
  "Anruf wird übermittelt …",
  "Die PBX prüft den passenden Weg",
  "Anruf wird verbunden …",
  "Anruf am Ziel angekommen",
];
const intents = {
  info: {
    name: "Info",
    request: "„Ich habe eine Frage.“",
    rule: "Taste 1 · Info",
    destination: "10 · Auskunft",
    description: "Ein Anrufer mit einer Frage wählt Info. Die PBX verbindet ihn mit der Nebenstelle 10 für Auskünfte.",
    steps: [
      "Der Anrufer möchte eine Auskunft.",
      "Die PBX folgt der Auswahl „Info“.",
      "Nebenstelle 10 · Info nimmt den Anruf an.",
    ],
  },
  support: {
    name: "Support",
    request: "„Mein PC streikt.“",
    rule: "Taste 2 · Support",
    destination: "20 · technische Hilfe",
    description: "Ein Anrufer mit einem PC-Problem wählt Support. Die PBX verbindet ihn mit der Nebenstelle 20 für technische Hilfe.",
    steps: [
      "Der Anrufer braucht Hilfe bei einem PC-Problem.",
      "Die PBX folgt der Auswahl „Support“.",
      "Nebenstelle 20 · Support nimmt den Anruf an.",
    ],
  },
};

document.querySelectorAll(".scenario-demo").forEach((demo) => {
  scenarioStates.set(demo, { timer: null, complete: false, playing: false });
  demo.classList.add("pbx-ready");

  const pivot = demo.querySelector(".scenario-pivot");
  pivot.hidden = false;
  pivot.addEventListener("click", () => {
    const vertical = demo.classList.toggle("is-vertical");
    pivot.setAttribute("aria-pressed", String(vertical));
    pivot.title = vertical ? "Zur waagerechten Ansicht wechseln" : "Zur senkrechten Ansicht wechseln";
    requestReplay(demo);
  });

  const replay = demo.querySelector(".scenario-replay");
  replay.addEventListener("click", () => requestReplay(demo));

  const choice = demo.querySelector(".scenario-choice");
  if (choice) {
    choice.hidden = false;
    choice.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.getAttribute("aria-pressed") === "true") return;
        const intent = intents[button.dataset.intent];
        choice.querySelectorAll("button").forEach((option) => {
          option.setAttribute("aria-pressed", String(option === button));
        });
        demo.querySelector("[data-caller-intent]").textContent = intent.name;
        demo.querySelector("[data-caller-request]").textContent = intent.request;
        demo.querySelector("[data-pbx-detail]").textContent = intent.rule;
        demo.querySelector("[data-destination-name]").textContent = intent.name;
        demo.querySelector("[data-destination-detail]").textContent = intent.destination;
        demo.querySelector(".scenario-flow").setAttribute("aria-label", intent.description);
        demo.querySelectorAll(".scenario-steps li").forEach((step, index) => {
          step.textContent = intent.steps[index];
        });
        requestReplay(demo);
      });
    });
  }
});

function isFullyVisible(demo) {
  if (document.hidden) return false;
  const bounds = demo.getBoundingClientRect();
  const viewport = window.visualViewport;
  const top = viewport?.offsetTop ?? 0;
  const left = viewport?.offsetLeft ?? 0;
  const width = viewport?.width ?? document.documentElement.clientWidth;
  const height = viewport?.height ?? document.documentElement.clientHeight;
  return bounds.width > 0 && bounds.height > 0
    && bounds.top >= top && bounds.left >= left
    && bounds.bottom <= top + height && bounds.right <= left + width;
}

function stopScenario(demo) {
  const state = scenarioStates.get(demo);
  window.clearTimeout(state.timer);
  state.timer = null;
  state.playing = false;
  demo.classList.remove("is-playing");
}

function setScenarioStage(demo, stage) {
  demo.dataset.currentStage = String(stage);
  demo.querySelectorAll(".scenario-flow [data-stage]").forEach((element) => {
    const elementStage = Number(element.dataset.stage);
    element.classList.toggle("is-current", elementStage === stage);
    element.classList.toggle("is-complete", elementStage < stage);
  });
  // The explanation stays on its step while the call travels to the next node.
  const currentStep = stage === 0 ? 0 : stage - (stage % 2 === 0 ? 1 : 0);
  demo.querySelectorAll(".scenario-steps [data-stage]").forEach((step) => {
    step.classList.toggle("is-current", Number(step.dataset.stage) === currentStep);
  });
  demo.querySelector("[data-playback-state]").textContent = phaseLabels[stage];
}

function finishScenario(demo, announce = true) {
  stopScenario(demo);
  scenarioStates.get(demo).complete = true;
  setScenarioStage(demo, 5);
  if (announce) {
    demo.querySelector("[data-scenario-status]").textContent = demo.querySelector(".scenario-steps li:last-child").textContent;
  }
}

function playScenario(demo) {
  const state = scenarioStates.get(demo);
  if (state.playing || state.complete || !isFullyVisible(demo)) return;
  state.playing = true;
  demo.classList.add("is-playing");
  let stage = 0;
  const advance = () => {
    // Recheck before every phase, including while scrolling or switching tabs.
    if (!isFullyVisible(demo)) {
      stopScenario(demo);
      setScenarioStage(demo, 0);
      return;
    }
    stage += 1;
    setScenarioStage(demo, stage);
    if (stage === 5) {
      finishScenario(demo);
    } else {
      state.timer = window.setTimeout(advance, 850);
    }
  };
  state.timer = window.setTimeout(advance, 250);
}

function refreshScenario(demo) {
  const state = scenarioStates.get(demo);
  if (reducedMotion.matches) {
    finishScenario(demo, false);
    demo.querySelector("[data-playback-state]").textContent = "Anrufweg auf einen Blick";
  } else if (!isFullyVisible(demo)) {
    if (state.playing) {
      stopScenario(demo);
      setScenarioStage(demo, 0);
    }
  } else {
    playScenario(demo);
  }
}

function requestReplay(demo) {
  stopScenario(demo);
  scenarioStates.get(demo).complete = false;
  demo.querySelector("[data-scenario-status]").textContent = "";
  setScenarioStage(demo, 0);
  // Layout must settle after pivoting before visibility is checked again.
  scheduleVisibilityCheck();
}

let visibilityFrame = null;
function scheduleVisibilityCheck() {
  if (visibilityFrame !== null) return;
  visibilityFrame = window.requestAnimationFrame(() => {
    visibilityFrame = null;
    scenarioStates.forEach((_state, demo) => refreshScenario(demo));
  });
}

function updateMotionPreference() {
  scenarioStates.forEach((_state, demo) => {
    demo.querySelector(".scenario-replay").hidden = reducedMotion.matches;
    requestReplay(demo);
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(scheduleVisibilityCheck, { threshold: [0, 1] });
  scenarioStates.forEach((_state, demo) => observer.observe(demo));
}
// Scroll and resize also cover browsers without IntersectionObserver and layout changes.
window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
window.addEventListener("resize", scheduleVisibilityCheck, { passive: true });
window.visualViewport?.addEventListener("resize", scheduleVisibilityCheck);
window.visualViewport?.addEventListener("scroll", scheduleVisibilityCheck);
document.addEventListener("visibilitychange", scheduleVisibilityCheck);
reducedMotion.addEventListener("change", updateMotionPreference);
if ("ResizeObserver" in window) {
  const resizeObserver = new ResizeObserver(scheduleVisibilityCheck);
  scenarioStates.forEach((_state, demo) => resizeObserver.observe(demo));
}
updateMotionPreference();
