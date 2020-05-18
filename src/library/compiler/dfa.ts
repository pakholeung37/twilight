/**
 * Compiles an NFA as produced by `nfa` into a DFA, modeled as a set
 * of state objects (`ContentMatch` instances) with transitions
 * between them.
 */
import nfa, { NFA, State as NFAState } from "./nfa";
import { Node } from "./types";

export default function dfa(nfa: NFA) {
  const labeled = Object.create(null);
  return explore(nullFrom(nfa, 0));

  function explore(states: NFAState[]) {
    const out = [];
    states.forEach(node => {
      nfa[node].forEach(({ term, to }) => {
        if (!term) return;
        let known = out.indexOf(term),
          set = known > -1 && out[known + 1];
        nullFrom(nfa, to).forEach(node => {
          if (!set) out.push(term, (set = []));
          if (set.indexOf(node) == -1) set.push(node);
        });
      });
    });
    const state = (labeled[states.join(",")] = new ContentMatch(
      states.indexOf(nfa.length - 1) > -1
    ));
    for (let i = 0; i < out.length; i += 2) {
      const states = out[i + 1].sort(cmp);
      state.next.push(out[i], labeled[states.join(",")] || explore(states));
    }
    return state;
  }
}

/**
 * Get the set of nodes reachable by null edges from `node`. Omit
 * nodes with only a single null-out-edge, since they may lead to
 * needless duplicated nodes.
 *
 * @param nfa
 * @param node
 */

function nullFrom(nfa, node: number) {
  const result = [];
  scan(node);
  return result.sort(cmp);

  function scan(node) {
    const edges = nfa[node];
    if (edges.length == 1 && !edges[0].term) return scan(edges[0].to);
    result.push(node);
    for (let i = 0; i < edges.length; i++) {
      const { term, to } = edges[i];
      if (!term && result.indexOf(to) == -1) scan(to);
    }
  }
}
