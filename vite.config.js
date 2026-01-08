import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  css: {
    postcss: false
  },
  // Ignore Spring Boot template files in dependency optimization
  optimizeDeps: {
    exclude: ["src/main/resources/templates"]
  }
})
