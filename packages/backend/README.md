# Backend

See the [Makefile](./Makefile) for the available command to build, check code standards, etc...

## Dependencies

These are needed at runtime (although Next will take care of bundling them for us):

- `viem` — for communicating with blockchains' JSON-RPC nodes, querying chain state.
- `tslib` — runtime library for typescript, to avoid duplicating helper functions in each file

## Dev Dependencies

- `typescript` — typescript compilation support
- `eslint` — javascript linting tool (use via `make lint` or `make check`, and `make lint-fix`)
    - `@eslint/js` — rules for javascript files
      - It is normally not necessary to install `eslint`, only this, however without it the `eslint`
        binary will link to an old version provided `eslint-plugin-simple-import-sort` (and without
        that maybe not be available?). This *might* be a pnpm issue.
    - `typescript-eslint` — Typescript support for eslint
    - `eslint-config-prettier` — disables eslint rules that conflict with prettier (see below)
    - `eslint-plugin-import` — rules for import statements
      - `@eslint/compat` and `@eslint/eslintrc` — enable support for this legacy plugin
    - `eslint-plugin-simple-import-sort` — rules for sorting import statements
    - `globals` — adds a list of global variable so that eslint doesn't error when using things
      like `console`
- Typescript type definitions, for their respective packages
    - `@types/eslint`
    - `@types/eslint__js`
    - `@types/node`
- `prettier` — code formatter (use via `make format` and `make check`)
    - Configured via `.prettierrc.json` and `.prettierignore`
- `nodemon` — to run a file every time its input change

## Configuration Files

### `tsconfig.json`

Only documenting differences from the frontend package ([see here][frontend-tsconfig]).
Also see there for the description of the options.

[frontend-tsconfig]: ../frontend/README.md#tsconfigjson

- `lib` — removed, we don't need the DOM libraries
- `skipLibCheck` — switch to `false` to check libraries, as long as we don't have incompatible libaries
- `noEmit` — remove, as there is no separate tool like Next to emit the JS files
- `module` — switch to `nodenext` as we're on node (backend) and not on the frontend
- `moduleResolution` — switch to `nodenext` as we're not limited by Next here
- `include` — add `src` prefix to avoid compiler the `eslint.config.js` file
