import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const themes = [
  { name: "Light", value: "light", icon: "☀️" },
  { name: "Dark", value: "dark", icon: "🌙" },
  { name: "Cupcake", value: "cupcake", icon: "🧁" },
  { name: "Cyberpunk", value: "cyberpunk", icon: "🤖" },
  { name: "Forest", value: "forest", icon: "🌳" },
  { name: "Aqua", value: "aqua", icon: "💧" },
];

const initialTheme = browser
  ? localStorage.getItem("theme") || "light"
  : "light";

export const theme = writable<string>(initialTheme);

export function setTheme(newTheme: string) {
  theme.set(newTheme);
  if (browser) {
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }
}
