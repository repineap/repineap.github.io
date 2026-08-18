.PHONY: dev build preview install

install:
	pnpm install

dev: install
	pnpm run dev

build: install
	pnpm run build

preview:
	pnpm run preview
