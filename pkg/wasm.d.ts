/* tslint:disable */
/* eslint-disable */

export class HydraClient {
  free(): void;
  [Symbol.dispose](): void;
  fetch_bonus(room_hash: string): Promise<any>;
  fetch_legal(room_hash: string): Promise<any>;
  fetch_rooms(): Promise<any>;
  fetch_rules(room_hash: string): Promise<any>;
  get_base_url(): string;
  fetch_servers(room_hash: string): Promise<any>;
  fetch_products(room_hash: string): Promise<any>;
  constructor(encoded_name: string);
}

export function main(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_hydraclient_free: (a: number, b: number) => void;
  readonly hydraclient_fetch_bonus: (a: number, b: number, c: number) => any;
  readonly hydraclient_fetch_legal: (a: number, b: number, c: number) => any;
  readonly hydraclient_fetch_products: (a: number, b: number, c: number) => any;
  readonly hydraclient_fetch_rooms: (a: number) => any;
  readonly hydraclient_fetch_rules: (a: number, b: number, c: number) => any;
  readonly hydraclient_fetch_servers: (a: number, b: number, c: number) => any;
  readonly hydraclient_get_base_url: (a: number) => [number, number];
  readonly hydraclient_new: (a: number, b: number) => [number, number, number];
  readonly main: () => void;
  readonly wasm_bindgen__convert__closures_____invoke__ha354d6b4b46633c5: (a: number, b: number) => void;
  readonly wasm_bindgen__closure__destroy__h67417f8e1b4fcfc4: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures_____invoke__hc4ef4e548e4285dd: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h1bf4805d441a1166: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
