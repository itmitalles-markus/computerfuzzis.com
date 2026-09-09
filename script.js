const root = document.documentElement;
root.classList.add("js");

const themeToggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem("theme");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

menuToggle?.addEventListener("click", () => {
  const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!menuIsOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    menuToggle?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) {
    setMenuState(false);
  }
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear().toString();
});

fetch("VERSION")
  .then((response) => (response.ok ? response.text() : Promise.reject()))
  .then((version) => {
    document.querySelectorAll("[data-version]").forEach((element) => {
      element.textContent = version.trim();
    });
  })
  .catch(() => {
    // Die im HTML hinterlegte Version bleibt als robuste Rückfallebene sichtbar.
  });

function setTheme(theme) {
  root.dataset.theme = theme;
  themeMeta?.setAttribute("content", theme === "dark" ? "#181a17" : "#f4f1e8");
  themeToggle?.setAttribute(
    "aria-label",
    theme === "dark" ? "Helles Farbschema verwenden" : "Dunkles Farbschema verwenden",
  );
}

function setMenuState(isOpen) {
  navigation?.classList.toggle("is-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", isOpen.toString());
  menuToggle?.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
}
