import { createRoot } from "react-dom/client"

import { App } from "./app.tsx"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error()
} else {
  createRoot(rootElement).render(<App />)
}
