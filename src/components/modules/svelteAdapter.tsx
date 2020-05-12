import React, { useRef, useEffect } from "react";
import { SvelteComponent } from "svelte";

export default function svelteAdapter(
  svelteComponent: typeof SvelteComponent,
  displayName?: string
) {
  let instance: SvelteComponent;

  const wrapper: React.FC<any> = props => {
    const container: React.RefObject<HTMLDivElement> = useRef(null);

    const eventRe = /on([A-Z]{1,}[a-zA-Z]*)/;
    const watchRe = /watch([A-Z]{1,}[a-zA-Z]*)/;

    useEffect(() => {
      if (!container.current) return;
      if (!instance) {
        instance = new svelteComponent({
          target: container.current,
          props,
        });
      } else instance.set(props);
      return () => instance && instance.destroy();
    });

    return <div ref={container}></div>;
  };
  wrapper.displayName = displayName
    ? displayName
    : `SvelteAdapter/${svelteComponent.name}`;
  return wrapper;
}
