import App from "./src/App.svelte";

export default function mount(dom: Element) {
  return new App({
    target: dom
  });
}
