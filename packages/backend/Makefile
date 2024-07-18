# Builds the backend.
build:
	pnpm tsc --outDir dist
.PHONY: build

# Builds the backend every time input files changes.
build-watch:
	pnpm tsc --outDir dist --watch
.PHONY: build-watch

# Run the backend.
run:
	pnpm node dist/index.js
.PHONY: run

# Reruns the backend every time input files changes — this will not rebuild, use `build-watch` for
# that.
run-watch:
	pnpm nodemon dist/index.js
.PHONY: run

# Removes the built backend (dist directory).
clean:
	rm -rf dist
.PHONY: clean

# Runs linter (use make check instead which also checks typescript typing).
lint:
	pnpm eslint --max-warnings 0
.PHONY: lint

# Fixes those linting errors that can be fixed automatically.
lint-fix:
	pnpm eslint --fix
.PHONY: lint-fix

PRETTIER_PATHS="**/*.{js,cjs,mjs,jsx,ts,tsx,json,css}"
PRETTIER_IGNORE_PATHS=".next/*"

# Runs code quality checks.
check:
	make lint
	pnpm prettier --check $(PRETTIER_PATHS)
.PHONY: check

# Runs prettier formatting across webapp files with specified file extensions.
# Also runs make lint-fix.
format:
	make lint-fix
	pnpm prettier --write $(PRETTIER_PATHS)
.PHONY: format