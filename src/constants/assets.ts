import { getEnv } from 'helpers/env';

import { ENV_ICE_ASSETS_CONFIG, type EnvIceAssetName } from './assets-env';

type ClassicAssetConfig = { code: string; issuer: string };

const getClassicAssetString = ({ code, issuer }: ClassicAssetConfig) => `${code}:${issuer}`;

export const getIceAssetString = (name: EnvIceAssetName) =>
    getClassicAssetString(ENV_ICE_ASSETS_CONFIG[name][getEnv()]);

export const getDefaultIceAssets = () =>
    (['ice', 'governIce', 'upvoteIce', 'downvoteIce'] as EnvIceAssetName[]).map(getIceAssetString);

export const getDelegatedIceAssets = () =>
    (['dIce', 'gdIce'] as EnvIceAssetName[]).map(getIceAssetString);

export const getIceToDelegate = () =>
    (['upvoteIce', 'governIce'] as EnvIceAssetName[]).map(getIceAssetString);

export const getIceDelegationMap = () =>
    new Map([
        [getIceAssetString('upvoteIce'), getIceAssetString('dIce')],
        [getIceAssetString('governIce'), getIceAssetString('gdIce')],
    ]);

export const getAllIceAssets = () => [...getDefaultIceAssets(), ...getDelegatedIceAssets()];

export const PYUSD_CODE = 'PYUSD';
export const PYUSD_ISSUER = 'GDQE7IXJ4HUHV6RQHIUPRJSEZE4DRS5WY577O2FY6YQ5LVWZ7JZTU2V5';
