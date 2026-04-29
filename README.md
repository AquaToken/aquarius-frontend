<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/AquaToken/dao-aquarius">
    <img src="https://aqua.network/assets/img/header-logo.svg" alt="Aquarius logo" width="250" height="80">
  </a>

<h3 align="center">Aquarius Frontend</h3>

  <p align="center">
    The main web application for Aquarius: AQUA token utilities, governance, voting, rewards, bribes, AMM pools, swaps, delegation, dashboards, and related Stellar/Soroban flows.
    <br />
    <br />
    <a href="https://aqua.network/">Website</a>
    ·
    <a href="https://docs.aqua.network/developers/integrating-with-aquarius">Docs</a>
    ·
    <a href="https://github.com/AquaToken/dao-aquarius/issues">Issues</a>
  </p>
</div>

## About

Aquarius is a liquidity management protocol for Stellar. It helps route incentives to the
markets where the AQUA community believes liquidity is needed most, and it gives users
interfaces for voting, governance, rewards, bribes, AMM liquidity, swaps, and AQUA/ICE
token flows.

Aquarius Frontend contains the main Aquarius web application served at `aqua.network`,
including:

- Landing, token, terms, privacy, airdrop, and onboarding pages
- AQUA voting and market reward allocation flows
- Governance proposals, proposal creation, and proposal voting
- Bribes, incentives, rewards, and delegation pages
- User dashboard with balances, activity, votes, locks, and liquidity positions
- Aquarius AMM pools, pool analytics, pool creation, liquidity management, and swaps
- Asset registry voting and creation flows
- Wallet connection flows for Stellar wallets, WalletConnect, Ledger, and related auth

[![Aquarius screenshot][product-screenshot]](https://aqua.network/)

## Tech Stack

- [React](https://react.dev/) `19.2.1`
- [React Router](https://reactrouter.com/) `7.9.6`
- [TypeScript](https://www.typescriptlang.org/) `5.9.3`
- [Webpack](https://webpack.js.org/) `5.103.0` with `webpack-dev-server` `5.2.2`
- [Babel](https://babeljs.io/) `7.28.x`
- [styled-components](https://styled-components.com/) `6.1.19`
- [Stellar SDK](https://github.com/stellar/js-stellar-sdk) `14.4.3`
- [Freighter API](https://github.com/stellar/freighter) `4.0.0`
- [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) `1.7.7`
- [WalletConnect Sign Client](https://walletconnect.com/) `2.16.2`
- [Sentry React](https://docs.sentry.io/platforms/javascript/guides/react/) `10.28.0`
- [D3](https://d3js.org/) `7.9.0`, [lightweight-charts](https://tradingview.github.io/lightweight-charts/) `5.0.9`, and [Quill](https://quilljs.com/) `2.0.3`
- [ESLint](https://eslint.org/) `9.39.1` and [Prettier](https://prettier.io/) `3.7.4`

## Requirements

- Node.js `>=20.18.0`
- Yarn v1. The repository uses a `yarn.lock` v1 lockfile and package scripts call `yarn`
  internally.

Check your local Node version:

```sh
node --version
```

## Environment

The app reads build-time variables through Webpack `DefinePlugin`.

| Variable | Required | Used for |
| --- | --- | --- |
| `WALLET_CONNECT_PROJECT_ID` | Yes | WalletConnect wallet discovery and sessions |
| `TESTNET_ASSETS_ISSUER_SECRET` | Testnet flows only | Signing the local testnet asset distribution transaction |
| `BRANCH` | Optional in production builds | Overrides git branch detection for build context |

Development builds also read `.env` through `dotenv`.

```sh
WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
TESTNET_ASSETS_ISSUER_SECRET=optional_testnet_issuer_secret
```

Production builds derive the Sentry context and Horizon URL from the branch name:

- `master` builds use the production context
- `staging` builds use the staging context
- other branches build without a Sentry environment context

## Getting Started

Clone the repository and install dependencies:

```sh
yarn install
```

Start the development server:

```sh
yarn start-dev
```

The app is served by `webpack-dev-server` at:

```sh
http://localhost:8080
```

Build the production bundle:

```sh
yarn build
```

Run a production build locally with Express:

```sh
yarn start-prod
```

The production server serves `dist/` at:

```sh
http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `yarn start` | Alias for `yarn start-dev` |
| `yarn start-dev` | Run Webpack dev server with React Refresh |
| `yarn build` | Clean `dist/` and create a production Webpack build |
| `yarn start-prod` | Build the app and serve `dist/` with `express.js` |
| `yarn clean-dist` | Remove generated files from `dist/` |
| `yarn prettier-fix` | Format source files with Prettier |
| `yarn eslint-fix` | Run ESLint with `--fix` on source files |
| `yarn lint-fix` | Run Prettier and ESLint fixes |

## Project Structure

```text
configs/              Webpack development, production, and shared config
dist/                 Generated production build output
src/api/              HTTP clients for Aquarius and external APIs
src/assets/           Images, icons, token assets, and page assets
src/constants/        Routes, API URLs, Stellar assets, env constants
src/helpers/          Shared formatting, token, URL, environment, and utility helpers
src/hooks/            Shared React hooks
src/pages/            Feature pages: AMM, swap, governance, voting, rewards, market, etc.
src/services/         Stellar, Soroban, auth, wallet, transaction, and Sentry services
src/store/            Global stores and providers
src/types/            Shared TypeScript types
src/web/              App shell, common UI, static assets, routing, modals, and styles
```

The application entry point is `src/index.tsx`, the main shell is `src/App.tsx`, and route
composition lives in `src/web/routing/AppRouter.tsx`.

## Development Notes

- Module aliases are configured in both `configs/webpack-common.js` and `tsconfig.json`.
- Client routes are defined in `src/constants/routes.ts`.
- The app supports production and testnet environments through local storage and
  `src/helpers/env.ts`.
- Static files from `src/web/.static` are copied into `dist/` during production builds.
- There is currently no dedicated test script in `package.json`; run the formatter and ESLint
  fix scripts before opening changes for review.

## Contact

- Email: [hello@aqua.network](mailto:hello@aqua.network)
- Telegram chat: [@aquarius_official_community](https://t.me/aquarius_official_community)
- Telegram news: [@aqua_token](https://t.me/aqua_token)
- X: [@AquariusDeFi](https://x.com/AquariusDeFi)
- GitHub: [@AquaToken](https://github.com/AquaToken)
- Discord: [Aquarius](https://discord.gg/sgzFscHp4C)
- Reddit: [r/AquariusAqua](https://www.reddit.com/r/AquariusAqua/)
- Docs: [Aquarius docs](https://docs.aqua.network/developers/integrating-with-aquarius)

Project Link: [Aquarius Frontend](https://github.com/AquaToken/dao-aquarius)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/AquaToken/dao-aquarius.svg?style=for-the-badge
[contributors-url]: https://github.com/AquaToken/dao-aquarius/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AquaToken/dao-aquarius.svg?style=for-the-badge
[forks-url]: https://github.com/AquaToken/dao-aquarius/network/members
[stars-shield]: https://img.shields.io/github/stars/AquaToken/dao-aquarius.svg?style=for-the-badge
[stars-url]: https://github.com/AquaToken/dao-aquarius/stargazers
[issues-shield]: https://img.shields.io/github/issues/AquaToken/dao-aquarius.svg?style=for-the-badge
[issues-url]: https://github.com/AquaToken/dao-aquarius/issues
[license-shield]: https://img.shields.io/github/license/AquaToken/dao-aquarius.svg?style=for-the-badge
[license-url]: https://github.com/AquaToken/dao-aquarius/blob/master/LICENSE
[product-screenshot]: src/web/.static/img/readme-screenshot.png
