import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { getPoolsWithAssets, getTokenStatsRequest } from 'api/amm';
import { getIncentives } from 'api/incentives';
import { getAssetDetails } from 'api/stellar-expert';

import { AppRoutes } from 'constants/routes';

import { contractValueToFormattedAmount, tpsToDailyAmount } from 'helpers/amount';
import { getAssetString, getEnvClassicAssetData } from 'helpers/assets';
import { getDateString } from 'helpers/date';
import getExplorerLink, { ExplorerSection } from 'helpers/explorer-links';
import { formatBalance } from 'helpers/format-number';

import { useIsMounted } from 'hooks/useIsMounted';

import { LumenInfo } from 'store/assetsStore/reducer';
import useAssetsStore from 'store/assetsStore/useAssetsStore';

import { resolveToml } from 'services/stellar/utils/resolvers';

import { PoolProcessed, TokenStats } from 'types/amm';
import { ExpertAssetData } from 'types/api-stellar-expert';
import { AssetInfo } from 'types/asset-info';
import { IncentiveProcessed } from 'types/incentives';
import { StellarToml as StellarTomlType } from 'types/stellar';
import { ClassicToken, Token } from 'types/token';

import Mail from 'assets/community/email16.svg';
import Git from 'assets/community/github16.svg';
import X from 'assets/community/twitter16.svg';
import External from 'assets/icons/nav/icon-external-link-16.svg';
import IconInfo from 'assets/icons/status/icon-info-16.svg';

import Asset from 'basics/Asset';
import DotsLoader from 'basics/loaders/DotsLoader';
import PageLoader from 'basics/loaders/PageLoader';
import Tooltip, { TOOLTIP_POSITION } from 'basics/Tooltip';

import Changes24 from 'components/Changes24';
import PublicKeyWithIcon from 'components/PublicKeyWithIcon';

import { getFilteredPairsList } from 'pages/vote/api/api';
import { Bribe } from 'pages/vote/api/types';

import {
    AssetWrap,
    ContactLink,
    CopyButtonStyled,
    Description,
    Detail,
    Details,
    InfoIconWrap,
    InfoLabelWrap,
    Links,
    PoolsLink,
    Section,
    SectionTitle,
    TopRow,
} from './AssetInfoContent.styled';

const ExternalBlack = styled(External)`
    path {
        fill: currentColor;
    }
`;

type AssetInfoContentProps = {
    asset: ClassicToken;
    badge?: React.ReactNode;
};

type AssetRewardSummary = {
    bribes: Bribe[];
    incentives: IncentiveProcessed[];
    aquaRewards: PoolProcessed[];
    poolsCount: number;
};

const isSameToken = (left: ClassicToken, right: Token | ClassicToken) => {
    if (
        'contract' in right &&
        left.contract &&
        right.contract &&
        left.contract === right.contract
    ) {
        return true;
    }

    return getAssetString(left) === getAssetString(right as ClassicToken);
};

const getGroupedDailyRewardsView = (
    rewards: Array<{ amount: string; code: string; issuer?: string | null }>,
) => {
    const groupedRewards = rewards.reduce<Map<string, { amount: number; code: string }>>(
        (acc, reward) => {
            const key = `${reward.code}-${reward.issuer ?? 'native'}`;
            const currentValue = acc.get(key);

            if (currentValue) {
                currentValue.amount += Number(reward.amount);
                return acc;
            }

            acc.set(key, {
                amount: Number(reward.amount),
                code: reward.code,
            });

            return acc;
        },
        new Map(),
    );

    if (!groupedRewards.size) {
        return '—';
    }

    return Array.from(groupedRewards.values())
        .map(({ amount, code }) => `${formatBalance(amount, true)} ${code} per day`)
        .join(', ');
};

const getCountLabel = (count: number, singular: string, plural: string) =>
    `${count} ${count === 1 ? singular : plural}`;

const AssetInfoContent = ({ asset, badge }: AssetInfoContentProps): React.ReactNode => {
    const [tomlInfo, setTomlInfo] = useState<StellarTomlType>({});
    const [expertData, setExpertData] = useState<ExpertAssetData | null>();
    const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
    const [isTokenStatsLoading, setIsTokenStatsLoading] = useState(true);
    const [assetRewards, setAssetRewards] = useState<AssetRewardSummary>({
        bribes: [],
        incentives: [],
        aquaRewards: [],
        poolsCount: 0,
    });
    const [isAssetRewardsLoading, setIsAssetRewardsLoading] = useState(true);
    const { assetsInfo } = useAssetsStore();
    const isMounted = useIsMounted();

    const { desc, home_domain } = assetsInfo.get(getAssetString(asset)) || {};
    const assetInfo: Partial<AssetInfo> = asset.isNative()
        ? LumenInfo
        : (assetsInfo.get(getAssetString(asset)) ?? {});

    useEffect(() => {
        if (!home_domain) {
            setTomlInfo({});
            return;
        }

        resolveToml(home_domain)
            .then(res => {
                if (isMounted.current) {
                    setTomlInfo(res);
                }
            })
            .catch(() => {
                if (isMounted.current) {
                    setTomlInfo({});
                }
            });
    }, [home_domain, isMounted]);

    useEffect(() => {
        getAssetDetails(asset)
            .then(details => {
                if (isMounted.current) {
                    setExpertData(details ?? null);
                }
            })
            .catch(() => {
                if (isMounted.current) {
                    setExpertData(null);
                }
            });
    }, [asset, isMounted]);

    useEffect(() => {
        if (!asset.contract) {
            setTokenStats(null);
            setIsTokenStatsLoading(false);
            return;
        }

        setIsTokenStatsLoading(true);

        getTokenStatsRequest(asset.contract)
            .then(stats => {
                if (isMounted.current) {
                    setTokenStats(stats);
                }
            })
            .catch(() => {
                if (isMounted.current) {
                    setTokenStats(null);
                }
            })
            .finally(() => {
                if (isMounted.current) {
                    setIsTokenStatsLoading(false);
                }
            });
    }, [asset.contract, isMounted]);

    useEffect(() => {
        setIsAssetRewardsLoading(true);

        Promise.all([
            getIncentives(),
            getFilteredPairsList(
                {
                    code: asset.code,
                    issuer: asset.isNative() ? '' : (asset.issuer ?? ''),
                },
                null,
                200,
                1,
            ),
            getPoolsWithAssets([asset]),
        ])
            .then(([incentives, { pairs }, pools]) => {
                if (!isMounted.current) {
                    return;
                }

                setAssetRewards({
                    bribes: pairs.flatMap(pair => pair.aggregated_bribes ?? []),
                    incentives: incentives.filter(incentive =>
                        incentive.pool.tokens.some(poolToken => isSameToken(asset, poolToken)),
                    ),
                    aquaRewards: pools.filter(pool => Number(pool.reward_tps) > 0),
                    poolsCount: pools.length,
                });
            })
            .catch(() => {
                if (isMounted.current) {
                    setAssetRewards({
                        bribes: [],
                        incentives: [],
                        aquaRewards: [],
                        poolsCount: 0,
                    });
                }
            })
            .finally(() => {
                if (isMounted.current) {
                    setIsAssetRewardsLoading(false);
                }
            });
    }, [asset, isMounted]);

    const xLink = useMemo(() => {
        if (!tomlInfo?.DOCUMENTATION?.ORG_TWITTER) {
            return null;
        }

        if (!tomlInfo.DOCUMENTATION.ORG_TWITTER.startsWith('https://')) {
            return tomlInfo.DOCUMENTATION.ORG_TWITTER;
        }

        return tomlInfo.DOCUMENTATION.ORG_TWITTER.split('/')[3];
    }, [tomlInfo]);

    const gitLink = useMemo(() => {
        if (!tomlInfo?.DOCUMENTATION?.ORG_GITHUB) {
            return null;
        }

        if (!tomlInfo.DOCUMENTATION.ORG_GITHUB.startsWith('https://')) {
            return tomlInfo.DOCUMENTATION.ORG_GITHUB;
        }

        return tomlInfo.DOCUMENTATION.ORG_GITHUB.split('/')[3];
    }, [tomlInfo]);

    const authorizationFlags = [
        assetInfo.auth_required && 'auth required',
        assetInfo.auth_clawback_enabled && 'clawback enabled',
        assetInfo.auth_immutable && 'immutable',
        assetInfo.auth_revocable && 'revocable',
    ]
        .filter(Boolean)
        .join(', ');

    const getUsdAmountView = (value?: string | number | null) => {
        if (isTokenStatsLoading) {
            return <DotsLoader />;
        }

        if (value === undefined || value === null || value === '') {
            return '—';
        }

        return `$${contractValueToFormattedAmount(value, 7, true, true)}`;
    };

    const getPoolsCountView = () => {
        if (isAssetRewardsLoading) {
            return <DotsLoader />;
        }

        return assetRewards.poolsCount;
    };

    const getRewardsView = (type: keyof AssetRewardSummary) => {
        if (isAssetRewardsLoading) {
            return <DotsLoader />;
        }

        if (type === 'incentives') {
            return getGroupedDailyRewardsView(
                assetRewards.incentives.map(incentive => ({
                    amount: tpsToDailyAmount(incentive.tps, incentive.tokenInstance.decimal),
                    code: incentive.tokenInstance.code,
                })),
            );
        }

        if (type === 'aquaRewards') {
            if (!assetRewards.aquaRewards.length) {
                return '—';
            }

            const totalTps = assetRewards.aquaRewards.reduce(
                (acc, pool) => acc + Number(pool.reward_tps),
                0,
            );
            const { code: aquaCode } = getEnvClassicAssetData('aqua');

            return `${tpsToDailyAmount(totalTps.toString(), 7)} ${aquaCode} per day`;
        }

        return getGroupedDailyRewardsView(
            assetRewards.bribes.map(bribe => ({
                amount: bribe.daily_amount,
                code: bribe.asset_code,
                issuer: bribe.asset_issuer,
            })),
        );
    };

    const incentivesPoolsCount = assetRewards.incentives.length;
    const bribesMarketsCount = new Set(assetRewards.bribes.map(bribe => bribe.market_key)).size;
    const aquaRewardsPoolsCount = assetRewards.aquaRewards.length;
    const incentivesSectionItemsCount =
        Number(Boolean(assetRewards.aquaRewards.length)) +
        Number(Boolean(assetRewards.incentives.length)) +
        Number(Boolean(assetRewards.bribes.length));
    const incentivesSectionPlaceholdersCount = Math.max(0, 3 - incentivesSectionItemsCount);
    const hasIncentivesSection = incentivesSectionItemsCount > 0;

    const renderCountTooltip = (content: string) => (
        <Tooltip content={content} position={TOOLTIP_POSITION.top} showOnHover>
            <InfoIconWrap>
                <IconInfo />
            </InfoIconWrap>
        </Tooltip>
    );

    return (
        <>
            <TopRow>
                <AssetWrap>
                    <Asset asset={asset} isBig hasDomainLink />
                </AssetWrap>
                {badge}
            </TopRow>
            <Description>{desc}</Description>
            <Links>
                {xLink && (
                    <ContactLink target="_blank" href={`https://x.com/${xLink}`}>
                        <X />
                        {xLink}
                    </ContactLink>
                )}
                {gitLink && (
                    <ContactLink target="_blank" href={`https://github.com/${gitLink}`}>
                        <Git />
                        {gitLink}
                    </ContactLink>
                )}
                {tomlInfo.DOCUMENTATION?.ORG_OFFICIAL_EMAIL && (
                    <ContactLink
                        target="_blank"
                        href={`mailto:${tomlInfo.DOCUMENTATION.ORG_OFFICIAL_EMAIL}`}
                    >
                        <Mail />
                        {tomlInfo.DOCUMENTATION.ORG_OFFICIAL_EMAIL}
                    </ContactLink>
                )}
                <ContactLink
                    target="_blank"
                    href={getExplorerLink(ExplorerSection.asset, getAssetString(asset))}
                >
                    <ExternalBlack />
                    StellarExpert
                </ContactLink>
            </Links>
            {expertData !== undefined ? (
                expertData ? (
                    <>
                        <Section>
                            <Details>
                                <Detail>
                                    <span>Asset Holders:</span>
                                    <span>{formatBalance(expertData.trustlines[0])}</span>
                                </Detail>
                                {!asset.isNative() && (
                                    <Detail>
                                        <span>First Transaction:</span>
                                        <span>{getDateString(expertData.created * 1000)}</span>
                                    </Detail>
                                )}

                                <Detail>
                                    <span>Current Price:</span>
                                    <span>
                                        $
                                        {formatBalance(
                                            expertData.price7d?.[
                                                expertData.price7d.length - 1
                                            ]?.[1] ?? 0,
                                            true,
                                        )}
                                    </span>
                                </Detail>
                                <Detail>
                                    <span>24H Change:</span>
                                    <Changes24 expertData={expertData} />
                                </Detail>
                                <Detail>
                                    <span>Authorization Flags:</span>
                                    <span>{authorizationFlags || 'None'}</span>
                                </Detail>
                                <Detail>
                                    <span>Supply Status:</span>
                                    <span>
                                        {assetInfo.is_supply_locked ? 'Locked' : 'Unlocked'}
                                    </span>
                                </Detail>
                                {!asset.isNative() && asset.issuer && (
                                    <Detail>
                                        <span>Issuer:</span>
                                        <CopyButtonStyled text={asset.issuer}>
                                            <PublicKeyWithIcon pubKey={asset.issuer} />
                                        </CopyButtonStyled>
                                    </Detail>
                                )}
                                {!asset.isNative() && asset.contract && (
                                    <Detail>
                                        <span>Contract Address:</span>
                                        <CopyButtonStyled text={asset.contract}>
                                            <PublicKeyWithIcon pubKey={asset.contract} />
                                        </CopyButtonStyled>
                                    </Detail>
                                )}
                                <Detail />
                            </Details>
                        </Section>

                        <Section>
                            <SectionTitle>Asset Stats on Aquarius</SectionTitle>
                            <Details>
                                <Detail>
                                    <span>
                                        <InfoLabelWrap>TVL</InfoLabelWrap>
                                    </span>
                                    <span>{getUsdAmountView(tokenStats?.tvl_usd)}</span>
                                </Detail>
                                <Detail>
                                    <span>
                                        <InfoLabelWrap>Total Volume</InfoLabelWrap>
                                    </span>
                                    <span>{getUsdAmountView(tokenStats?.total_volume_usd)}</span>
                                </Detail>
                                <Detail>
                                    <span>
                                        <InfoLabelWrap>
                                            Daily Avg. Volume
                                            {renderCountTooltip('30-day average')}
                                        </InfoLabelWrap>
                                    </span>
                                    <span>{getUsdAmountView(tokenStats?.volume_24h_usd)}</span>
                                </Detail>
                            </Details>
                            <PoolsLink
                                to={`${AppRoutes.section.amm.link.index}?search=${asset.contract}`}
                            >
                                {getPoolsCountView()} pools with {asset.code}
                            </PoolsLink>
                        </Section>

                        {hasIncentivesSection && (
                            <Section>
                                <SectionTitle>Incentives for {asset.code}</SectionTitle>
                                <Details>
                                    {Boolean(assetRewards.aquaRewards.length) && (
                                        <Detail>
                                            <span>
                                                <InfoLabelWrap>
                                                    Current AQUA Rewards
                                                    {renderCountTooltip(
                                                        `Paid in ${getCountLabel(
                                                            aquaRewardsPoolsCount,
                                                            'pool',
                                                            'pools',
                                                        )}`,
                                                    )}
                                                </InfoLabelWrap>
                                            </span>
                                            <span>{getRewardsView('aquaRewards')}</span>
                                        </Detail>
                                    )}
                                    {Boolean(assetRewards.incentives.length) && (
                                        <Detail>
                                            <span>
                                                <InfoLabelWrap>
                                                    Current Incentives
                                                    {renderCountTooltip(
                                                        `Paid in ${getCountLabel(
                                                            incentivesPoolsCount,
                                                            'pool',
                                                            'pools',
                                                        )}.`,
                                                    )}
                                                </InfoLabelWrap>
                                            </span>
                                            <span>{getRewardsView('incentives')}</span>
                                        </Detail>
                                    )}
                                    {Boolean(assetRewards.bribes.length) && (
                                        <Detail>
                                            <span>
                                                <InfoLabelWrap>
                                                    Current Bribes
                                                    {renderCountTooltip(
                                                        `Paid in ${getCountLabel(
                                                            bribesMarketsCount,
                                                            'market',
                                                            'markets',
                                                        )}.`,
                                                    )}
                                                </InfoLabelWrap>
                                            </span>
                                            <span>{getRewardsView('bribes')}</span>
                                        </Detail>
                                    )}
                                    {Array.from({
                                        length: incentivesSectionPlaceholdersCount,
                                    }).map((_, index) => (
                                        <Detail key={`incentives-placeholder-${index}`} />
                                    ))}
                                </Details>
                            </Section>
                        )}
                    </>
                ) : null
            ) : (
                <PageLoader />
            )}
        </>
    );
};

export default AssetInfoContent;
