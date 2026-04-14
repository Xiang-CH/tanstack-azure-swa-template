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

## Deploy from Azure Portal
1. Create a new [Static Web App](https://portal.azure.com/#create/Microsoft.StaticApp) in the Azure Portal.
2. Fill in the required details (subscription, resource group, name, region).
   - Connect to GitHub and select your repository and branch.
   - Set the build configuration:
     - `App location`: `/`
     - `API location`: `.output/server`
     - `Output location`: `.output/public`
     <img width="729" height="1110" alt="Screenshot 2026-04-14 at 7 28 46 PM" src="https://github.com/user-attachments/assets/e7741840-cda3-456f-b324-106eb1c0c28a" />
   * Note: If the `App location` is not `/`, ensure that `API location` is relative to the root and that the `Output location` is relative to the `App location`.
3. Click Create and a GitHub Actions workflow will be set up to build and deploy your app on push to the selected branch.
   - The workflow should look something like [this](.github/workflows/azure-static-web-apps-icy-sand-00c0a2c10.yml).
 

## Useful Files

- `vite.config.ts`: Azure build preset integration
- `nitro/presets/azure-swa-custom.mjs`: custom Azure SWA Nitro preset
- `nitro/runtime/azure-swa.mjs`: Azure runtime handler

## Learn More

- TanStack Start docs: https://tanstack.com/start
- TanStack Router docs: https://tanstack.com/router
- Azure Static Web Apps docs: https://learn.microsoft.com/azure/static-web-apps/
