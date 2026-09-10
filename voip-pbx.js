const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const scenarioTimers = new Map();

document.querySelectorAll("[data-pbx-scenario]").forEach((scenario) => {
  const replayButton = scenario.querySelector(".scenario-replay");

  replayButton?.addEventListener("click", () => playScenario(scenario));

  if (reducedMotion.matches) {
    showFinalStage(scenario);
    replayButton?.setAttribute("hidden", "");
  }
});

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.hasPlayed) {
          entry.target.dataset.hasPlayed = "true";
          playScenario(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );

  document.querySelectorAll("[data-pbx-scenario]").forEach((scenario) => observer.observe(scenario));
} else if (!reducedMotion.matches) {
  document.querySelectorAll("[data-pbx-scenario]").forEach(showFinalStage);
}

function playScenario(scenario) {
  clearScenarioTimers(scenario);

  const stages = getStages(scenario);
  const status = scenario.querySelector("[data-scenario-status]");

  setScenarioStage(scenario, 0);
  status.textContent = "";

  stages.forEach((stage, index) => {
    const timer = window.setTimeout(() => {
      setScenarioStage(scenario, stage);

      if (index === stages.length - 1) {
        const finalStep = scenario.querySelector(`.scenario-steps [data-stage="${stage}"]`);
        status.textContent = `Animation abgeschlossen. ${finalStep?.textContent.trim() ?? ""}`;
      }
    }, 350 + index * 850);

    scenarioTimers.get(scenario).push(timer);
  });
}

function showFinalStage(scenario) {
  const stages = getStages(scenario);
  setScenarioStage(scenario, stages[stages.length - 1]);
}

function setScenarioStage(scenario, currentStage) {
  scenario.querySelectorAll("[data-stage]").forEach((element) => {
    const elementStage = Number(element.dataset.stage);
    element.classList.toggle("is-current", elementStage === currentStage);
    element.classList.toggle("is-complete", elementStage < currentStage);
  });
}

function getStages(scenario) {
  return [...new Set(
    [...scenario.querySelectorAll("[data-stage]")].map((element) => Number(element.dataset.stage)),
  )].sort((first, second) => first - second);
}

function clearScenarioTimers(scenario) {
  scenarioTimers.get(scenario)?.forEach((timer) => window.clearTimeout(timer));
  scenarioTimers.set(scenario, []);
}
