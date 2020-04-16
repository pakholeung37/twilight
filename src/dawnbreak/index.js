import App from "./src/App.svelte";

export default function mount(dom) {
  return new App({
    target: dom
  });
}
