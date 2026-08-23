```
        .///.                .///.     //.            .//  `/////////////-
       `++:++`              .++:++`    :++`          `++:  `++:......---.`
      `/+: -+/`            `++- :+/`    /+/         `/+/   `++.
      /+/   :+/            /+:   /+/    `/+/        /+/`   `++.
  -::/++::`  /+:       -::/++::` `/+:    `++:      :++`    `++/:::::::::.
  -:+++::-`  `/+:      --++/---`  `++-    .++-    -++.     `++/:::::::::.
   -++.       .++-      -++`       .++.    .++.  .++-      `++.
  .++-         -++.    .++.         -++.    -++``++-       `++.
 `++:           :++`  .++-           :++`    :+//+:        `++:----------`
 -/:             :/-  -/:             :/.     ://:         `/////////////-
```

# Aave protocol interface :ghost:

An open source interface for the decentralized liquidity protocol Aave

Enabling users to:

- Manage and monitor their positions on the Aave Protocol, and the overall status of it
- Manage and monitor their positions on the Aave Safety module
- Participate in the Aave Governance

## Prerequisites

- Node.js version pinned in [`.nvmrc`](./.nvmrc) (currently `16`) — run `nvm use`
- [Yarn](https://yarnpkg.com/) package manager

## Quick start

```sh
nvm use
yarn install
cp .env.example .env.local
yarn dev
```

The app is served at `http://localhost:3000`.

## Configuration

### Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` (used by `yarn dev`/`yarn build`) and adjust as needed. `.env.development` shows the values used for the hosted staging build.

| Variable                          | Purpose                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `URL`                               | Base URL the app is served from locally.                                                                    |
| `NEXT_PUBLIC_ENV`                   | `prod` or `staging`. `staging` enables testnet markets and disables governance/staking/production markets.  |
| `NEXT_PUBLIC_ENABLE_GOVERNANCE`     | Feature flag to enable/disable the Governance pages (see `next.config.js`).                                 |
| `NEXT_PUBLIC_ENABLE_STAKING`        | Feature flag to enable/disable the Safety Module (staking) pages.                                           |
| `NEXT_PUBLIC_API_BASEURL`           | Base URL of the [aave-api](../aave-api) instance used for historical rates data (`ratesHistoryApiUrl`-style calls, market stats, etc). Point this at your own `aave-api` deployment if you're not using `https://aave-api-v2.aave.com`. |
| `NEXT_PUBLIC_FIAT_ON_RAMP`          | Enable/disable the fiat on-ramp entry points.                                                               |
| `NEXT_PUBLIC_TRANSAK_APP_URL` / `NEXT_PUBLIC_TRANSAK_API_URL` / `NEXT_PUBLIC_TRANSAK_API_KEY` | [Transak](https://transak.com/) on-ramp integration config.                                    |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | [WalletConnect Cloud](https://cloud.walletconnect.com/) project ID, required for WalletConnect to work.  |
| `NEXT_PUBLIC_MIXPANEL`              | Mixpanel analytics token (leave empty to disable analytics).                                                |
| `TENDERLY_KEY` / `TENDERLY_ACCOUNT` / `TENDERLY_PROJECT` | [Tenderly](https://tenderly.co/) credentials, only needed for the Cypress integration test suite / chain forks. |
| `NEXT_PUBLIC_FORK_BASE_CHAIN_ID` / `NEXT_PUBLIC_FORK_CHAIN_ID` / `NEXT_PUBLIC_FORK_URL_RPC` | Chain-fork configuration for running against a Tenderly fork instead of a live network (see "Running Against a Chain Fork" in [Contributing](./CONTRIBUTING.md)). |

### Protocol / market configuration

This app is a customized deployment of the Aave interface (currently wired up for the **Harmony** network). Everything protocol-specific lives in `src/ui-config/` rather than in environment variables:

- **`src/ui-config/networksConfig.ts`** — one entry per chain (keyed by `ChainId`), defining:
  - `publicJsonRPCUrl` / `privateJsonRPCUrl` (+ optional WS variants) — RPC endpoints for the network
  - `baseAssetSymbol` / `wrappedBaseAssetSymbol` / `baseAssetDecimals` — **the native token** (e.g. `ONE`/`WONE` for Harmony) and its wrapped ERC20 counterpart, used for gas display, wrapping/unwrapping on withdraw, and adding the network to wallets
  - `explorerLink` / `explorerLinkBuilder` — block explorer used for tx/address links
  - `ratesHistoryApiUrl` — the [aave-api](../aave-api) endpoint (`/data/rates-history`) to pull historical rates from for that network

- **`src/ui-config/marketsConfig.tsx`** — one entry per market (keyed by `CustomMarket`), defining the on-chain contract addresses for that market's `PoolAddressesProvider`-based deployment:
  - `LENDING_POOL_ADDRESS_PROVIDER` — the Aave `PoolAddressesProvider` contract. **This is also where the price oracle address comes from**: the UI resolves the `PriceOracle` (and other core periphery contracts) at runtime via this provider contract, so there is no separate "oracle address" field to set manually — pointing this at the correct `PoolAddressesProvider` for your deployment is enough.
  - `LENDING_POOL`, `WETH_GATEWAY`, `WALLET_BALANCE_PROVIDER`, `UI_POOL_DATA_PROVIDER`, `UI_INCENTIVE_DATA_PROVIDER`, `FAUCET`, `COLLECTOR`, etc. — the rest of the periphery contract addresses for that market
  - `subgraphUrl` — the subgraph used for reserve/market data on that market
  - For canonical, audited Aave deployments these addresses are usually pulled from [`@bgd-labs/aave-address-book`](https://github.com/bgd-labs/aave-address-book) (see the `proto_harmony_v3` entry); for custom/testnet deployments they're hardcoded (see `proto_harmony_testnet_v3`)

- **`src/ui-config/stakeConfig.ts`** and **`src/ui-config/governanceConfig.ts`** — Safety Module (staking) and Governance contract addresses. In this deployment they're zeroed out / disabled (paired with `NEXT_PUBLIC_ENABLE_STAKING=false` / `NEXT_PUBLIC_ENABLE_GOVERNANCE=false`); fill these in with real addresses and flip the corresponding feature flag on to enable them.

- **`src/ui-config/reservePatches.ts`** — symbol remapping/display overrides for reserves (e.g. bridged/wrapped token naming), and token icons live under `public/icons/tokens/<symbol>.svg`.

To point the interface at a different network/market, add entries to `networksConfig.ts` and `marketsConfig.tsx` with the addresses above, add a matching icon set, then rebuild.

## Build & run commands

```bash
yarn dev                # start the Next.js dev server (with hot reload) on localhost:3000
yarn build               # production build
yarn build:static        # production build + static export (for IPFS/S3/CDN hosting)
yarn start               # start the production server (after `yarn build`)
yarn serve:static        # serve the statically exported output (after `yarn build:static`)
yarn build:analyze       # production build with the webpack bundle analyzer enabled
yarn build:optimize-svgs # run svgo over public/*.svg assets
```

Linting, tests & i18n:

```bash
yarn lint          # lint code + formatting
yarn lint:fix       # auto-fix lint + formatting issues
yarn test           # unit tests (jest, watch mode)
yarn test:ci         # unit tests, single run
yarn test:open       # open the Cypress integration test suite (needs Tenderly env vars)
yarn test:headless   # run the Cypress integration test suite headlessly
yarn i18n            # extract + compile translation strings
```

## Contribution

For instructions on local development, deployment, configurations & feature proposals, see [Contributing](./CONTRIBUTING.md)

Also, contributors with at least one pull request that has been merged into the main branch are eligible for a unique GitPOAP. Visit [gitpoap.io](https://www.gitpoap.io/gp/638) to claim it.

<img src="https://www.gitpoap.io/_next/image?url=https%3A%2F%2Fassets.poap.xyz%2Fgitpoap3a-2022-aave-protocol-interface-contributor-2022-logo-1668012040505.png&w=2048&q=75" width="164">

## IPFS deployment

Each commit gets deployed to IPFS automatically

There's a github action commenting the appropriate IPFS hash embedded in the Cloudflare IPFS gateway after each commit

For ease of use:

- the DNS of [https://staging.aave.com](https://staging.aave.com) will always point to the latest main IPFS hash with all networks enabled
- the DNS of [https://app.aave.com](https://app.aave.com) will always point to the latest main IPFS hash with disabled test networks

### Links known to work at some point:

- [https://app-aave-com.ipns.cf-ipfs.com/#/](https://app-aave-com.ipns.cf-ipfs.com/#/)
- [https://app-aave-com.ipns.dweb.link/#/](https://app-aave-com.ipns.dweb.link/#/)

### Troubleshooting

Issue: Cannot connect to `app.aave.com`

The aave-ui is hosted on IPFS in a decentralized manner. `app.aave.com` just holds a CNAME record to the Cloudflare IPFS gateway. You can use [any](https://ipfs.github.io/public-gateway-checker/) public or private IPFS gateway supporting origin isolation to access aave-ui if for some reason the Cloudflare gateway doesn't work for you

Just go to `<your favorite public ipfs gateway>/ipns/app.aave.com`

⚠️ Make sure the gateway supports origin isolation to avoid possible security issues: you should be redirected to URL that looks like `https://app-aave-com.<your gateway>`

## License

[BSD-3-Clause](./LICENSE.md)

## Credits

To all the Ethereum community
