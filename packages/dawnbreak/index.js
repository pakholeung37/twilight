import App from "./src/routes/index.svelte"

export default function mount(dom) {
  return new App({
    target: dom,
  })
}
