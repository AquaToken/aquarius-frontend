import { getEnv } from 'helpers/env';

import { Environment } from 'types/env';
import { ClassicToken } from 'types/token';

import { ENV_PRODUCTION, ENV_TESTNET } from './env';

const AQUA_CODE = 'AQUA';
const AQUA_ISSUER = 'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA';

const USDC_CODE = 'USDC';
const USDC_ISSUER = 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN';

export const TESTNET_SHARED_ISSUER = 'GAHPYWLK6YRN7CVYZOO4H3VDRZ7PVF5UJGLZCSPAEIKJE2XSWF5LAGER';

export const ICE_CODE = 'ICE';
const PRODUCTION_ICE_ISSUER = 'GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE';
export const TESTNET_ICE_ISSUER = 'GAYYH44SS4OSFDY4WXMWM2BKRA2RG5M6NZULUQWGHKGFASFY2ZVI7IHX';

export const GOV_ICE_CODE = 'governICE';
export const UP_ICE_CODE = 'upvoteICE';
export const DOWN_ICE_CODE = 'downvoteICE';
export const D_ICE_CODE = 'dICE';
export const GD_ICE_CODE = 'gdICE';

type ClassicAssetConfig = { code: string; issuer: string };

export type EnvClassicAssetConfig = Record<Environment, ClassicAssetConfig>;

export type EnvClassicAssetName = 'aqua' | 'usdc' | 'governIce' | 'gdIce';
export type EnvIceAssetName = 'ice' | 'governIce' | 'upvoteIce' | 'downvoteIce' | 'dIce' | 'gdIce';

export type BaseClassicAssetData = {
    code: string;
    issuer: string;
    assetString: string;
    asset: ClassicToken;
    contract: string;
};

const createTestnetAssetKey = ({ code, issuer }: { code: string; issuer: string }) =>
    `${code}:${issuer}`;

const createTestnetAssetInfo = ({
    code,
    image,
    home_domain,
    issuer,
}: {
    code: string;
    image: string;
    home_domain: string;
    issuer: string;
}) =>
    [
        createTestnetAssetKey({ code, issuer }),
        {
            code,
            issuer,
            image,
            home_domain,
        },
    ] as const;

const createTestnetDistribution = ({
    code,
    amount,
    issuer,
}: {
    code: string;
    amount: string;
    issuer: string;
}): [string, string] => [createTestnetAssetKey({ code, issuer }), amount];

export const ENV_ICE_ISSUERS: Record<Environment, string> = {
    [ENV_PRODUCTION]: PRODUCTION_ICE_ISSUER,
    [ENV_TESTNET]: TESTNET_ICE_ISSUER,
};

export const ICE_ISSUER = ENV_ICE_ISSUERS[getEnv()];

export const ENV_ICE_ASSETS_CONFIG: Record<EnvIceAssetName, EnvClassicAssetConfig> = {
    ice: {
        [ENV_PRODUCTION]: { code: ICE_CODE, issuer: PRODUCTION_ICE_ISSUER },
        [ENV_TESTNET]: { code: ICE_CODE, issuer: TESTNET_ICE_ISSUER },
    },
    governIce: {
        [ENV_PRODUCTION]: { code: GOV_ICE_CODE, issuer: PRODUCTION_ICE_ISSUER },
        [ENV_TESTNET]: { code: GOV_ICE_CODE, issuer: TESTNET_ICE_ISSUER },
    },
    upvoteIce: {
        [ENV_PRODUCTION]: { code: UP_ICE_CODE, issuer: PRODUCTION_ICE_ISSUER },
        [ENV_TESTNET]: { code: UP_ICE_CODE, issuer: TESTNET_ICE_ISSUER },
    },
    downvoteIce: {
        [ENV_PRODUCTION]: { code: DOWN_ICE_CODE, issuer: PRODUCTION_ICE_ISSUER },
        [ENV_TESTNET]: { code: DOWN_ICE_CODE, issuer: TESTNET_ICE_ISSUER },
    },
    dIce: {
        [ENV_PRODUCTION]: { code: D_ICE_CODE, issuer: PRODUCTION_ICE_ISSUER },
        [ENV_TESTNET]: { code: D_ICE_CODE, issuer: TESTNET_ICE_ISSUER },
    },
    gdIce: {
        [ENV_PRODUCTION]: { code: GD_ICE_CODE, issuer: PRODUCTION_ICE_ISSUER },
        [ENV_TESTNET]: { code: GD_ICE_CODE, issuer: TESTNET_ICE_ISSUER },
    },
};

export const ENV_CLASSIC_ASSETS_CONFIG: Record<EnvClassicAssetName, EnvClassicAssetConfig> = {
    aqua: {
        [ENV_PRODUCTION]: { code: AQUA_CODE, issuer: AQUA_ISSUER },
        [ENV_TESTNET]: { code: AQUA_CODE, issuer: TESTNET_SHARED_ISSUER },
    },
    usdc: {
        [ENV_PRODUCTION]: { code: USDC_CODE, issuer: USDC_ISSUER },
        [ENV_TESTNET]: { code: USDC_CODE, issuer: TESTNET_SHARED_ISSUER },
    },
    governIce: ENV_ICE_ASSETS_CONFIG.governIce,
    gdIce: ENV_ICE_ASSETS_CONFIG.gdIce,
};

const TESTNET_AQUA_CLASSIC_ASSET_CONFIG = ENV_CLASSIC_ASSETS_CONFIG.aqua[ENV_TESTNET];
const TESTNET_USDC_CLASSIC_ASSET_CONFIG = ENV_CLASSIC_ASSETS_CONFIG.usdc[ENV_TESTNET];
const TESTNET_ICE_ASSET_CONFIG = ENV_ICE_ASSETS_CONFIG.ice[ENV_TESTNET];
const TESTNET_GOVERN_ICE_ASSET_CONFIG = ENV_ICE_ASSETS_CONFIG.governIce[ENV_TESTNET];
const TESTNET_UPVOTE_ICE_ASSET_CONFIG = ENV_ICE_ASSETS_CONFIG.upvoteIce[ENV_TESTNET];
const TESTNET_DOWNVOTE_ICE_ASSET_CONFIG = ENV_ICE_ASSETS_CONFIG.downvoteIce[ENV_TESTNET];
const TESTNET_D_ICE_ASSET_CONFIG = ENV_ICE_ASSETS_CONFIG.dIce[ENV_TESTNET];
const TESTNET_GD_ICE_ASSET_CONFIG = ENV_ICE_ASSETS_CONFIG.gdIce[ENV_TESTNET];

export const TESTNET_ASSETS = new Map([
    createTestnetAssetInfo({
        code: TESTNET_USDC_CLASSIC_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/ba187c6f-f0e6-45bd-b66b-89ed45640c7d.png',
        home_domain: 'circle.io',
        issuer: TESTNET_USDC_CLASSIC_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: 'USDT',
        image: 'https://static.ultrastellar.com/media/assets/img/de88cd49-1b8e-439d-8dc0-48fb53bde644.png',
        home_domain: 'tether.io',
        issuer: TESTNET_SHARED_ISSUER,
    }),
    createTestnetAssetInfo({
        code: 'BTC',
        image: 'https://static.ultrastellar.com/media/assets/img/c3380651-52e5-4054-9121-a438c60a1ec4.png',
        home_domain: 'ultrastellar.com',
        issuer: TESTNET_SHARED_ISSUER,
    }),
    createTestnetAssetInfo({
        code: TESTNET_AQUA_CLASSIC_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/1878ee2d-2fd1-4e31-89a7-5a430f1596f8.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_AQUA_CLASSIC_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: TESTNET_ICE_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/c2cdac64-386b-4815-9e16-044ae494ceac.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: TESTNET_GOVERN_ICE_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/c2cdac64-386b-4815-9e16-044ae494ceac.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_GOVERN_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: TESTNET_UPVOTE_ICE_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/c2cdac64-386b-4815-9e16-044ae494ceac.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_UPVOTE_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: TESTNET_DOWNVOTE_ICE_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/c2cdac64-386b-4815-9e16-044ae494ceac.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_DOWNVOTE_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: TESTNET_D_ICE_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/9694b5ba-3483-451e-85b1-bbadd480da6a.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_D_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: TESTNET_GD_ICE_ASSET_CONFIG.code,
        image: 'https://static.ultrastellar.com/media/assets/img/9694b5ba-3483-451e-85b1-bbadd480da6a.png',
        home_domain: 'aqua.network',
        issuer: TESTNET_GD_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetAssetInfo({
        code: 'ETH',
        image: 'https://static.ultrastellar.com/media/assets/img/f50535aa-8fcb-487f-912f-96d338b8e610.png',
        home_domain: 'ultrastellar.com',
        issuer: TESTNET_SHARED_ISSUER,
    }),
    createTestnetAssetInfo({
        code: 'DAI',
        image: 'https://spark.fi/images/deposit---icon.png',
        home_domain: 'makerdao.com',
        issuer: TESTNET_SHARED_ISSUER,
    }),
]);

export const TESTNET_DISTRIBUTION_AMOUNTS: Array<[string, string]> = [
    createTestnetDistribution({
        code: TESTNET_AQUA_CLASSIC_ASSET_CONFIG.code,
        amount: '10000000',
        issuer: TESTNET_AQUA_CLASSIC_ASSET_CONFIG.issuer,
    }),
    createTestnetDistribution({
        code: TESTNET_GOVERN_ICE_ASSET_CONFIG.code,
        amount: '10000000',
        issuer: TESTNET_GOVERN_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetDistribution({
        code: TESTNET_GD_ICE_ASSET_CONFIG.code,
        amount: '10000000',
        issuer: TESTNET_GD_ICE_ASSET_CONFIG.issuer,
    }),
    createTestnetDistribution({
        code: TESTNET_USDC_CLASSIC_ASSET_CONFIG.code,
        amount: '10000',
        issuer: TESTNET_USDC_CLASSIC_ASSET_CONFIG.issuer,
    }),
    createTestnetDistribution({
        code: 'BTC',
        amount: '0.5',
        issuer: TESTNET_SHARED_ISSUER,
    }),
    createTestnetDistribution({
        code: 'ETH',
        amount: '5',
        issuer: TESTNET_SHARED_ISSUER,
    }),
    createTestnetDistribution({
        code: 'USDT',
        amount: '10000',
        issuer: TESTNET_SHARED_ISSUER,
    }),
    createTestnetDistribution({
        code: 'DAI',
        amount: '500',
        issuer: TESTNET_SHARED_ISSUER,
    }),
];
