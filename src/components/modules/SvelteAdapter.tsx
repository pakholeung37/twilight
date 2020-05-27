import React, { useRef, useEffect, ReactPortal } from "react";
import ReactDOM from "react-dom";
import { SvelteComponent } from "svelte";

/**
 * svelteComponent to react.Component adapter.
 * inspired by:
 * https://github.com/pngwn/svelte-adapter
 *
 * agreement:
 * 1. Any events emitted by the svelte component can be passed callbacks
 * via an {on*} prop containing a function, this function will fire when
 * the event is emitted.
 *
 * 2. Some Svelte component's allow you to bind to internal data
 * which doesn't make too much sense outside of Svelte yet
 * they often form an important part of the API.
 * Instead I have added the option to use a {watch*} prop
 *
 * 3. Svelte Components allow you to add slot which doesn't suit
 * react. anything pass as children will be the svelte default slot;
 * any react component pass as {slot_*} props will be the svelte {*} slot;
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
    const portal: { [key: string]: ReactPortal | undefined } = {};

    const eventRe = /on([A-Z]{1,}[a-zA-Z]*)/;
    const watchRe = /watch([A-Z]{1,}[a-zA-Z]*)/;
    const slotRe = /slot_([a-zA-Z]*)/;

    useEffect(() => {
      if (!container.current) return;
      if (!instance) {
        // construct props
        const svelteProps: any = {
          ...props,
        };

        if (children) {
          const [node, createDefaultSlot] = createSlot("default");
          props.$$slots = { default: [createDefaultSlot] };
          props.$$scope = {};
          portal["default"] = ReactDOM.createPortal(children, node);
        }
        instance = new MySvelteComponent({
          target: container.current,
          props: svelteProps,
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

interface Emitter {
  (type: string): void;
}
/**
 * create a slot and return [<the slot Node>, <the svelte slot function>]
 * @param {string} slotName slot Name
 * @param {Function} emitter sbscrible to the svelte compoonent emit when slot create, mount and detach
 */
function createSlot(
  slotName: string,
  emitter?: Emitter
): [HTMLDivElement, Function] {
  const tuple: [any, any] = [null, null];

  tuple[1] = function() {
    return {
      // create
      c() {
        tuple[0] = document.createElement("div");
        emitter && emitter("update");
      },
      // mount
      m(target: Node, anchor: Node) {
        target.insertBefore(tuple[0] as Node, anchor || null);
        emitter && emitter("mount");
      },
      // detach
      d(detaching: boolean) {
        if (detaching) {
          tuple[0].parentNode && tuple[0].parentNode.removeChild(tuple[0]);
          emitter && emitter("detach");
        }
      },
    };
  };
  return tuple;
}
