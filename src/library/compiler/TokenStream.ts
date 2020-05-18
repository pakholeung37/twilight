import { Schema } from "./types";

/**
 * Tokenizer
 */
export default class TokenStream {
  private string: string;
  public schema: Schema;
  private tokens: string[];
  private pos: number;
  constructor(string: string, schema: Schema) {
    this.string = string;
    this.schema = schema;
    this.pos = 0;

    this.tokens = string.split(/\s*(?=\b|\W|$)/);
    if (this.tokens[this.tokens.length - 1] == "") this.tokens.pop();
    if (this.tokens[0] == "") this.tokens.unshift();
  }

  get next() {
    return this.tokens[this.pos];
  }

  getTokens() {
    return this.tokens;
  }

  eat(tok: string): boolean {
    return this.next == tok && (!!this.pos++ || true);
  }

  forward() {
    this.pos++;
  }

  err(str: string) {
    throw new SyntaxError(
      `[compiler] ${str} in content expression ${this.string}`
    );
  }
}
