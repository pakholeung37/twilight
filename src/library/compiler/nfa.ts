import { Expression } from "./types";

export type Term = any;

export interface State {
  term: Term;
  to?: number | null;
}

export type NFA = Array<Array<State>>;

export default function nfa(expr: Expression): NFA {
  const nfa: NFA = [[]];

  /**
   * add a new empty state in nfa;
   *
   * @returns {number} nfa.length
   */
  function node() {
    return nfa.push([]) - 1;
  }
  /**
   * create an edge
   * @param from from which state sequence
   * @param to to which state sequence
   * @param term extra payload
   */
  function edge(from: number, to?: State["to"], term?: State["term"]): State {
    const edge: State = { term, to };
    nfa[from].push(edge);
    return edge;
  }
  function connect(edges: Term[], to: number) {
    edges.forEach(edge => (edge.to = to));
  }

  function compile(expr: Expression, from: number): Array<State> {
    if (expr.type == "choice") {
      return expr.exprs.reduce(
        (out: Array<State>, expr) => out.concat(compile(expr, from)),
        []
      );
    } else if (expr.type == "seq") {
      for (let i = 0; ; i++) {
        const next = compile(expr.exprs[i], from);
        if (i == expr.exprs.length - 1) return next;
        connect(next, (from = node()));
      }
    } else if (expr.type == "star") {
      const loop = node();
      edge(from, loop);
      connect(compile(expr.expr, loop), loop);
      return [edge(loop)];
    } else if (expr.type == "plus") {
      const loop = node();
      connect(compile(expr.expr, from), loop);
      connect(compile(expr.expr, loop), loop);
      return [edge(loop)];
    } else if (expr.type == "opt") {
      return [edge(from)].concat(compile(expr.expr, from));
    } else if (expr.type == "range") {
      let cur = from;
      for (let i = 0; i < expr.min; i++) {
        const next = node();
        connect(compile(expr.expr, cur), next);
        cur = next;
      }
      if (expr.max == -1) {
        connect(compile(expr.expr, cur), cur);
      } else {
        for (let i = expr.min; i < expr.max; i++) {
          const next = node();
          edge(cur, next);
          connect(compile(expr.expr, cur), next);
          cur = next;
        }
      }
      return [edge(cur)];
    } else if (expr.type == "name") {
      return [edge(from, null, expr.value)];
    } else
      throw SyntaxError(
        "[compiler] children pattern compile failed. check if pattern vaild"
      );
  }

  connect(compile(expr, 0), node());

  return nfa;
}
