.PHONY: help bootstrap dev build preview test typecheck lint format fmt ci pr clean

help:
	@echo "Targets:"
	@echo "  bootstrap     Install deps"
	@echo "  dev           Run Astro dev server"
	@echo "  build         Build production output to apps/site/dist"
	@echo "  preview       Preview the production build"
	@echo "  test          Run unit + e2e tests"
	@echo "  typecheck     Run astro check + tsc --noEmit"
	@echo "  lint          Run linters"
	@echo "  fmt           Format files with prettier"
	@echo "  ci            Full pre-merge pipeline"
	@echo "  pr            Push branch + open PR"

bootstrap:
	pnpm install --frozen-lockfile

dev:
	pnpm run dev

build:
	pnpm run build

preview:
	pnpm run preview

test:
	pnpm run test

typecheck:
	pnpm run typecheck

lint:
	pnpm run lint

format fmt:
	pnpm run format

ci:
	pnpm run ci

pr:
	@branch=$$(git rev-parse --abbrev-ref HEAD); \
	if [ "$$branch" = "main" ]; then echo "Refusing to PR from main"; exit 1; fi; \
	git push -u origin $$branch && \
	gh pr create --fill

clean:
	rm -rf apps/*/dist apps/*/.astro apps/*/node_modules node_modules
