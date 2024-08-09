import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    "process.env.HUGGINGFACE_API_KEY": JSON.stringify(
      process.env.HUGGINGFACE_API_KEY
    ),
  },
});
