const finderSteps = [
  {
    id: "topic",
    summaryLabel: "Thema",
    kicker: "Dein Thema",
    question: "Worum geht es?",
    hint: "Wähle bis zu drei Begriffe.",
    max: 3,
    options: [
      { id: "topic-software", label: "Individuelle Software", scores: { implementation: 3, concept: 1 } },
      { id: "topic-web", label: "Website oder Webanwendung", scores: { implementation: 2, prototype: 1 } },
      { id: "topic-app", label: "Mobile App", scores: { implementation: 3, prototype: 1 } },
      { id: "topic-telefonie", label: "Telefonie & VoIP", scores: { concept: 2, implementation: 1 } },
      { id: "topic-automation", label: "Automatisierung", scores: { implementation: 2, prototype: 1 } },
      { id: "topic-integration", label: "Schnittstellen", scores: { implementation: 3, concept: 1 } },
      { id: "topic-fehler", label: "Fehlerbehebung", scores: { quick: 4 } },
      { id: "topic-beratung", label: "Beratung", scores: { concept: 4 } },
    ],
  },
  {
    id: "goal",
    summaryLabel: "Ziel",
    kicker: "Der gewünschte Nutzen",
    question: "Was soll besser werden?",
    hint: "Wähle bis zu drei Ziele.",
    max: 3,
    options: [
      { id: "goal-time", label: "Zeit sparen", scores: { implementation: 2, prototype: 1 } },
      { id: "goal-errors", label: "Fehler reduzieren", scores: { implementation: 2, concept: 1 } },
      { id: "goal-reach", label: "Besser erreichbar sein", scores: { concept: 1, implementation: 2 } },
      { id: "goal-process", label: "Abläufe vereinfachen", scores: { concept: 2, implementation: 1 } },
      { id: "goal-data", label: "Daten verbinden", scores: { implementation: 3 } },
      { id: "goal-modern", label: "Technik modernisieren", scores: { concept: 1, implementation: 3 } },
      { id: "goal-test", label: "Eine Idee testen", scores: { prototype: 4 } },
      { id: "goal-scale", label: "Mit dem Betrieb wachsen", scores: { concept: 2, implementation: 2 } },
    ],
  },
  {
    id: "stage",
    summaryLabel: "Ausgangslage",
    kicker: "Der aktuelle Stand",
    question: "Wo steht das Projekt?",
    hint: "Wähle bis zu zwei passende Aussagen.",
    max: 2,
    options: [
      { id: "stage-idea", label: "Es ist eine erste Idee", scores: { concept: 2, prototype: 3 } },
      { id: "stage-manual", label: "Der Ablauf ist noch manuell", scores: { concept: 2, implementation: 1 } },
      { id: "stage-existing", label: "Es gibt bereits Software", scores: { quick: 1, implementation: 2 } },
      { id: "stage-prototype", label: "Ein Prototyp ist vorhanden", scores: { quick: 1, prototype: 2, implementation: 1 } },
      { id: "stage-urgent", label: "Es gibt ein akutes Problem", scores: { quick: 4 } },
      { id: "stage-clear", label: "Die Aufgabe ist klar beschrieben", scores: { implementation: 2 } },
    ],
  },
  {
    id: "scope",
    summaryLabel: "Rahmen",
    kicker: "Menschen und Reichweite",
    question: "Wen betrifft die Lösung?",
    hint: "Wähle den passendsten Rahmen.",
    max: 1,
    options: [
      { id: "scope-one", label: "Eine Person", scores: { quick: 2, prototype: 1 } },
      { id: "scope-team", label: "Ein kleines Team", scores: { prototype: 1, implementation: 1 } },
      { id: "scope-department", label: "Eine Abteilung", scores: { concept: 1, implementation: 2 } },
      { id: "scope-sites", label: "Mehrere Standorte", scores: { concept: 1, implementation: 4 } },
      { id: "scope-customers", label: "Kunden oder Partner", scores: { concept: 1, implementation: 5 } },
    ],
  },
  {
    id: "timing",
    summaryLabel: "Timing",
    kicker: "Der zeitliche Rahmen",
    question: "Wann soll es losgehen?",
    hint: "Wähle eine Aussage.",
    max: 1,
    options: [
      { id: "timing-orient", label: "Ich möchte mich erst orientieren", scores: { concept: 3 } },
      { id: "timing-months", label: "In den nächsten Monaten", scores: { concept: 1, prototype: 1, implementation: 1 } },
      { id: "timing-date", label: "Es gibt einen festen Termin", scores: { implementation: 2 } },
      { id: "timing-soon", label: "So bald wie möglich", scores: { quick: 2, implementation: 1 } },
      { id: "timing-urgent", label: "Das Problem ist akut", scores: { quick: 4 } },
    ],
  },
];

const finderResults = {
  quick: {
    title: "Schnelle technische Hilfe",
    description: "Deine Auswahl deutet auf eine klar begrenzte Aufgabe hin, bei der eine gezielte Analyse schnell für Richtung sorgen kann.",
    services: ["Technische Bestandsaufnahme", "Fehleranalyse und Reparatur", "Einrichtung oder gezielte Verbesserung"],
    nextStep: "Am besten starten wir mit einer kurzen Beschreibung des Problems und der betroffenen Technik.",
  },
  concept: {
    title: "Beratung & Konzeption",
    description: "Ziel und Richtung sind wichtiger als vorschnelle Technik. Eine strukturierte Klärung schafft hier die beste Grundlage.",
    services: ["Anforderungen und Ziele sortieren", "Möglichkeiten und Risiken bewerten", "Umsetzbaren Lösungsweg entwerfen"],
    nextStep: "Ein Orientierungsgespräch hilft, Ziel, Rahmen und sinnvolle erste Schritte festzulegen.",
  },
  prototype: {
    title: "Prototyp & Automatisierung",
    description: "Dein Vorhaben eignet sich dafür, eine Idee früh sichtbar zu machen oder einen Ablauf zunächst im Kleinen zu verbessern.",
    services: ["Kleinen funktionsfähigen Prototyp bauen", "Ablauf praktisch erproben", "Erkenntnisse für die weitere Umsetzung sammeln"],
    nextStep: "Wir wählen gemeinsam den kleinsten Baustein, an dem sich Nutzen und Machbarkeit sinnvoll testen lassen.",
  },
  implementation: {
    title: "Individuelle Umsetzung",
    description: "Mehrere Anforderungen greifen ineinander. Dafür braucht es eine passende technische Lösung und einen klar geplanten Weg.",
    services: ["Technisches Konzept und Architektur", "Individuelle Software oder Integration", "Bei Bedarf passende Experten einbinden"],
    nextStep: "Als Erstes grenzen wir den wichtigsten Nutzen und die beteiligten Systeme sauber voneinander ab.",
  },
};

const configurator = document.querySelector("[data-configurator]");

if (configurator) {
  const stepPanel = configurator.querySelector("[data-step-panel]");
  const projectCore = configurator.querySelector(".project-core");
  const resultPanel = configurator.querySelector("[data-result]");
  const wordCloud = configurator.querySelector("[data-word-cloud]");
  const questionKicker = configurator.querySelector("[data-question-kicker]");
  const question = configurator.querySelector("[data-question]");
  const questionHint = configurator.querySelector("[data-question-hint]");
  const progressText = configurator.querySelector("[data-progress-text]");
  const progress = configurator.querySelector(".finder-progress");
  const progressBar = configurator.querySelector("[data-progress-bar]");
  const selectionCount = configurator.querySelector("[data-selection-count]");
  const selectionMessage = configurator.querySelector("[data-selection-message]");
  const projectTokens = configurator.querySelector("[data-project-tokens]");
  const backButton = configurator.querySelector("[data-back]");
  const nextButton = configurator.querySelector("[data-next]");
  const nextLabel = configurator.querySelector("[data-next-label]");
  const restartButton = configurator.querySelector("[data-restart]");
  const copyButton = configurator.querySelector("[data-copy-result]");
  const emailResult = configurator.querySelector("[data-email-result]");
  const resultMessage = configurator.querySelector("[data-result-message]");
  const state = {
    stepIndex: 0,
    selections: Object.fromEntries(finderSteps.map((step) => [step.id, []])),
  };

  backButton.addEventListener("click", () => {
    if (state.stepIndex > 0) {
      state.stepIndex -= 1;
      renderStep(true);
    }
  });

  nextButton.addEventListener("click", () => {
    const step = finderSteps[state.stepIndex];

    if (state.selections[step.id].length === 0) {
      showSelectionMessage("Bitte wähle mindestens einen Begriff aus.", true);
      return;
    }

    if (state.stepIndex === finderSteps.length - 1) {
      renderResult();
      return;
    }

    state.stepIndex += 1;
    renderStep(true);
  });

  restartButton.addEventListener("click", () => {
    finderSteps.forEach((step) => {
      state.selections[step.id] = [];
    });
    state.stepIndex = 0;
    resultPanel.hidden = true;
    stepPanel.hidden = false;
    projectCore.hidden = false;
    renderStep(true);
    document.querySelector("#projektfinder")?.scrollIntoView({ behavior: getScrollBehavior() });
  });

  if (navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      const resultText = configurator.querySelector("[data-result-text]").value;

      try {
        await navigator.clipboard.writeText(resultText);
        resultMessage.textContent = "Die Zusammenfassung wurde kopiert.";
      } catch {
        resultMessage.textContent = "Der Text konnte nicht automatisch kopiert werden. Du kannst ihn oben markieren und kopieren.";
      }
    });
  }

  renderStep(false);

  function renderStep(announce) {
    const step = finderSteps[state.stepIndex];
    const selected = state.selections[step.id];

    questionKicker.textContent = step.kicker;
    question.textContent = step.question;
    questionHint.textContent = step.hint;
    progressText.textContent = `Schritt ${state.stepIndex + 1} von ${finderSteps.length}`;
    progress.setAttribute("aria-valuenow", String(state.stepIndex + 1));
    progressBar.style.width = `${((state.stepIndex + 1) / finderSteps.length) * 100}%`;
    backButton.disabled = state.stepIndex === 0;
    nextLabel.textContent = state.stepIndex === finderSteps.length - 1 ? "Ergebnis anzeigen" : "Weiter";

    wordCloud.replaceChildren();
    step.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "word-option";
      button.dataset.size = getWordSize(option.label);
      button.textContent = option.label;
      button.setAttribute("aria-pressed", String(selected.includes(option.id)));
      button.addEventListener("click", () => toggleOption(step, option, button));
      wordCloud.append(button);
    });

    updateSelectionCount();
    renderProjectTokens();
    showSelectionMessage(announce ? `${step.question} ${step.hint}` : "", false);
  }

  function toggleOption(step, option, button) {
    const selected = state.selections[step.id];
    const optionIndex = selected.indexOf(option.id);

    if (optionIndex >= 0) {
      selected.splice(optionIndex, 1);
      button.setAttribute("aria-pressed", "false");
      showSelectionMessage(`${option.label} entfernt.`, false);
    } else if (selected.length >= step.max) {
      showSelectionMessage(`Für diesen Schritt kannst du höchstens ${step.max} Begriffe auswählen.`, true);
      return;
    } else {
      selected.push(option.id);
      button.setAttribute("aria-pressed", "true");
      showSelectionMessage(`${option.label} ausgewählt.`, false);
    }

    updateSelectionCount();
    renderProjectTokens();
  }

  function updateSelectionCount() {
    const currentCount = state.selections[finderSteps[state.stepIndex].id].length;
    selectionCount.textContent = currentCount === 1 ? "1 ausgewählt" : `${currentCount} ausgewählt`;
  }

  function renderProjectTokens() {
    const options = getSelectedOptions();
    projectTokens.replaceChildren();

    if (options.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Noch nichts ausgewählt.";
      projectTokens.append(empty);
      return;
    }

    options.forEach((option) => {
      const token = document.createElement("span");
      token.className = "project-token";
      token.textContent = option.label;
      projectTokens.append(token);
    });
  }

  function renderResult() {
    const resultKey = determineResult();
    const result = finderResults[resultKey];
    const complexity = determineComplexity();
    const summary = getSummary();
    const resultText = buildResultText(result, complexity, summary);

    configurator.querySelector("[data-result-complexity]").textContent = `Umfang: ${complexity}`;
    configurator.querySelector("[data-result-title]").textContent = result.title;
    configurator.querySelector("[data-result-description]").textContent = result.description;
    configurator.querySelector("[data-result-next-step]").textContent = result.nextStep;
    configurator.querySelector("[data-result-text]").value = resultText;
    resultMessage.textContent = `Deine Einordnung ist fertig: ${result.title}.`;

    const summaryList = configurator.querySelector("[data-result-summary]");
    summaryList.replaceChildren();
    summary.forEach((item) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = item.label;
      description.textContent = item.values.join(", ");
      row.append(term, description);
      summaryList.append(row);
    });

    const serviceList = configurator.querySelector("[data-result-services]");
    serviceList.replaceChildren();
    result.services.forEach((service) => {
      const item = document.createElement("li");
      item.textContent = service;
      serviceList.append(item);
    });

    const subject = `Projektanfrage: ${result.title}`;
    emailResult.href = `mailto:markus.sukhaboon@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(resultText)}`;
    stepPanel.hidden = true;
    projectCore.hidden = true;
    resultPanel.hidden = false;
    resultPanel.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  }

  function determineResult() {
    const scores = { quick: 0, concept: 0, prototype: 0, implementation: 0 };
    const selectedIds = new Set(Object.values(state.selections).flat());
    const complexity = determineComplexity();

    getSelectedOptions().forEach((option) => {
      Object.entries(option.scores).forEach(([key, value]) => {
        scores[key] += value;
      });
    });

    if (complexity === "komplex") {
      return "implementation";
    }

    if (selectedIds.has("goal-test") && (selectedIds.has("stage-idea") || selectedIds.has("stage-prototype"))) {
      return "prototype";
    }

    const priority = ["implementation", "prototype", "concept", "quick"];
    return priority.reduce((best, key) => (scores[key] > scores[best] ? key : best), priority[0]);
  }

  function determineComplexity() {
    const selectedIds = new Set(Object.values(state.selections).flat());
    const topicCount = state.selections.topic.length;
    const complexScope = selectedIds.has("scope-sites") || selectedIds.has("scope-customers");
    const connectedBuild = selectedIds.has("topic-integration") && topicCount > 1;

    if (complexScope || connectedBuild || topicCount === 3) {
      return "komplex";
    }

    const compactScope = selectedIds.has("scope-one") || selectedIds.has("scope-team");
    const focusedTask = topicCount === 1 && (
      selectedIds.has("topic-fehler") ||
      selectedIds.has("topic-beratung") ||
      selectedIds.has("timing-urgent")
    );

    return compactScope && focusedTask ? "kompakt" : "individuell";
  }

  function getSummary() {
    return finderSteps.map((step) => ({
      label: step.summaryLabel,
      values: state.selections[step.id].map((optionId) => step.options.find((option) => option.id === optionId).label),
    }));
  }

  function getSelectedOptions() {
    return finderSteps.flatMap((step) => (
      state.selections[step.id].map((optionId) => step.options.find((option) => option.id === optionId))
    ));
  }

  function buildResultText(result, complexity, summary) {
    const lines = [
      "Hallo Markus,",
      "",
      "ich habe mein Vorhaben mit dem Projektfinder vorsortiert:",
      "",
      `Erste Einordnung: ${result.title}`,
      `Umfang: ${complexity}`,
      ...summary.map((item) => `${item.label}: ${item.values.join(", ")}`),
      "",
      "Darüber würde ich gerne unverbindlich sprechen.",
      "",
      "Viele Grüße",
    ];

    return lines.join("\n");
  }

  function showSelectionMessage(message, isWarning) {
    selectionMessage.textContent = message;
    selectionMessage.classList.toggle("is-warning", isWarning);
  }

  function getWordSize(label) {
    if (label.length <= 13) return "wide";
    if (label.length >= 26) return "compact";
    return "normal";
  }

  function getScrollBehavior() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }
}
