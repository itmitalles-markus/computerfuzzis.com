const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem("theme");

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
