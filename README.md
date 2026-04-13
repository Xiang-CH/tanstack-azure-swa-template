# TanStack Start Azure Static Web Apps Template

This repository is a template for building and deploying a TanStack Start app to Azure Static Web Apps.

It includes:

- TanStack Start + TanStack Router
- Nitro runtime output configured for Azure SWA
- Azure SWA routing config for server functions
- Tailwind CSS setup

This template extends the nitro `azure-swa` preset since it is outdated and fails to deploy correctly to Azure SWA. The custom preset and runtime code under `/nitro` in this template are based on the original `azure-swa` preset but have been updated to work with the latest Nitro and Azure SWA requirements.

## Quick Start

### Install dependencies

```bash
# pnpm
pnpm install

# npm
npm install
```

### Run locally (dev)

```bash
# pnpm
pnpm dev

# npm
npm run dev
```

## Build Commands

### Standard production build

```bash
# pnpm
pnpm build

# npm
npm run build
```

### Azure Static Web Apps build

Use this build for Azure SWA-targeted output.

```bash
# pnpm
pnpm build:azure

# npm
npm run build:azure
```

## Preview Commands

### Standard preview

```bash
# pnpm
pnpm preview

# npm
npm run preview
```

### Azure SWA local preview

This uses the Static Web Apps CLI with the generated server output.

```bash
# pnpm
pnpm preview:azure

# npm
npm run preview:azure
```

## Testing

```bash
# pnpm
pnpm test

# npm
npm run test
```

## Deploying To Azure Static Web Apps

1. Run the Azure-targeted build command.
2. Ensure the output folders are available:
   - static files: `.output/public`
   - server/API: `.output/server`
3. Use your Azure Static Web Apps deployment flow (GitHub Actions or Azure CLI/portal) and point it at this repository.

## Useful Files

- `vite.config.ts`: Azure build preset integration
- `nitro/presets/azure-swa-custom.mjs`: custom Azure SWA Nitro preset
- `nitro/runtime/azure-swa.mjs`: Azure runtime handler

## Learn More

- TanStack Start docs: https://tanstack.com/start
- TanStack Router docs: https://tanstack.com/router
- Azure Static Web Apps docs: https://learn.microsoft.com/azure/static-web-apps/
