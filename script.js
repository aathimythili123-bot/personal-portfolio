/* ===== 1. MOBILE MENU ===== */
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
// Close the menu after tapping a link
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  }
});

/* ===== 2. LIGHT / DARK THEME ===== */
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
  try { localStorage.setItem("theme", theme); } catch (e) { /* storage may be blocked, ignore */ }
}

// Use the saved choice, otherwise follow the device setting
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

/* ===== 3. CONTACT FORM VALIDATION ===== */
const form = document.getElementById("form");
const statusEl = document.getElementById("formStatus");

// One rule per field: returns an error message, or "" if the value is fine
const rules = {
  name:  (v) => (v.trim().length >= 2 ? "" : "Enter your name (at least 2 characters)."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email, like name@example.com."),
  msg:   (v) => (v.trim().length >= 10 ? "" : "Write a message of at least 10 characters.")
};

function check(id) {
  const field = document.getElementById(id);
  const error = rules[id](field.value);
  document.getElementById("e-" + id).textContent = error;
  field.setAttribute("aria-invalid", error !== "");
  return error === "";
}

// Validate each field when the user leaves it
Object.keys(rules).forEach((id) => document.getElementById(id).addEventListener("blur", () => check(id)));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = Object.keys(rules).map(check).every(Boolean);

  if (!allValid) {
    statusEl.style.color = "var(--err)";
    statusEl.textContent = "Fix the highlighted fields and try again.";
    return;
  }
  // NOTE: this form does not send email yet. To receive messages,
  // connect it to a service such as Formspree or EmailJS.
  statusEl.style.color = "var(--ok)";
  statusEl.textContent = "Thanks, " + form.name.value.trim() + ". Your message is valid, but this form is not connected to an email service yet. Please email me directly at aathimythili123@gmail.com.";
  form.reset();
});

/* ===== 4. FOOTER YEAR ===== */
document.getElementById("yr").textContent = new Date().getFullYear();
