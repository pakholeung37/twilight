import React, { useRef, useEffect } from "react";
import { SvelteComponent } from "svelte";

/**
 * svelteComponent to react.Component adapter.
 * inspired by:
 * https://github.com/pngwn/svelte-adapter
 *
 * @param {SvelteComponent} MySvelteComponent SvelteComponent import from .svelte
 * @param {string} displayName DisplayName for this HOC Component in react devTool
 * (technically is not a HOC because it's input is a SvelteCompoent).
 * Default `SvelteAdapter/${SvelteComponent.name}`
 */
export default function svelteAdapter(
  MySvelteComponent: typeof SvelteComponent,
  displayName?: string
) {
  let instance: SvelteComponent;

  const wrapper: React.FC<any> = ({ children, ...props }) => {
    const container: React.RefObject<HTMLDivElement> = useRef(null);

    const eventRe = /on([A-Z]{1,}[a-zA-Z]*)/;
    const watchRe = /watch([A-Z]{1,}[a-zA-Z]*)/;

    useEffect(() => {
      if (!container.current) return;
      if (!instance) {
        instance = new MySvelteComponent({
          target: container.current,
          props: {
            ...props,
            $$slots: { default: [createDefaultSlot] },
            $$scope: {},
          },
        });
        const watchers: [string, Function][] = [];
        for (const key in props) {
          const eventMatch = key.match(eventRe);
          const watchMatch = key.match(watchRe);

          if (eventMatch && typeof props[key] === "function") {
            instance.$on(
              `${eventMatch[1][0].toLowerCase()}${eventMatch[1].slice(1)}`,
              props[key]
            );
          }
          if (watchMatch && typeof props[key] === "function") {
            watchers.push([
              `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
              props[key],
            ]);
          }
        }

        if (watchers.length) {
          const update = instance.$$.update;
          instance.$$.update = function(...args) {
            watchers.forEach(([name, callback]) => {
              const index = instance.$$.props[name];
              callback(instance.$$.ctx[index]);
            });
            update.apply(null, ...args);
          };
        }
      } else instance.set(props);
      //! debug
      (window as any).ArticleList = instance;
      return () => instance && instance.destroy();
    });
    return <div ref={container}>{children}</div>;
  };
  wrapper.displayName = displayName
    ? displayName
    : `SvelteAdapter/${MySvelteComponent.name}`;

  return wrapper;
}

function createDefaultSlot(ctx: any) {
  let t: any;

  return {
    c() {
      t = document.createTextNode("helloworld");
    },
    m(target: any, anchor: any) {
      target.insertBefore(t, anchor || null);
    },
    d(detaching: any) {
      if (detaching) t.parentNode.removeChild(t);
    },
  };
}
