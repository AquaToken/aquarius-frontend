import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
    getRegistryMyVotesRequest,
    getRegistryAssetMarketStatsRequest,
    getRegistryAssetsRequest,
    getRegistryVoteHistoryRequest,
    getUpcomingRegistryVotesRequest,
} from 'api/asset-registry';

import { getEnvClassicAssetData } from 'helpers/assets';
import { convertLocalDateToUTCIgnoringTimezone, getDateString } from 'helpers/date';
import { createAsset } from 'helpers/token';

import useAuthStore from 'store/authStore/useAuthStore';

import { ModalService } from 'services/globalServices';

import { Option } from 'types/option';

import ChooseLoginMethodModal from 'web/modals/auth/ChooseLoginMethodModal';

import Search from 'assets/icons/actions/icon-search-16.svg';

import { Input } from 'basics/inputs';

import { PageContainer } from 'styles/commonPageStyles';
import { COLORS } from 'styles/style-constants';

import {
    FilterGroup,
    FilterSelect,
    MainSection,
    SearchInputWrap,
    Title,
    Toolbar,
} from './AssetRegistryMainPage.styled';
import {
    AssetRegistryFilter,
    RegistryAsset,
    RegistryAssetMarketStatsMap,
    RegistryAssetProposalType,
    RegistryProposalPreview,
    UpcomingVoteData,
} from './AssetRegistryMainPage.types';
import AssetRegistryContent from './components/AssetRegistryContent/AssetRegistryContent';

const FILTER_OPTIONS: Option<AssetRegistryFilter>[] = [
    { label: 'All', value: AssetRegistryFilter.all },
    { label: 'Whitelisted', value: AssetRegistryFilter.whitelisted },
    { label: 'Revoked', value: AssetRegistryFilter.revoked },
    { label: 'My Votes', value: AssetRegistryFilter.myVotes },
    { label: 'History', value: AssetRegistryFilter.history },
];

const aqua = getEnvClassicAssetData('aqua');
const usdc = getEnvClassicAssetData('usdc');

const DEFAULT_REGISTRY_ASSETS: RegistryAsset[] = [
    {
        asset_code: 'XLM',
        asset_issuer: null,
        asset_contract_address: null,
        whitelisted: true,
        proposals: [],
    },
    {
        asset_code: aqua.code,
        asset_issuer: aqua.issuer,
        asset_contract_address: null,
        whitelisted: true,
        proposals: [],
    },
    {
        asset_code: usdc.code,
        asset_issuer: usdc.issuer,
        asset_contract_address: null,
        whitelisted: true,
        proposals: [],
    },
];

const getRegistryAssetId = (asset: RegistryAsset) =>
    `${asset.asset_code ?? 'unknown'}:${asset.asset_issuer ?? 'native'}`;

const MOCK_UPCOMING_VOTES_ASSETS: Array<Pick<UpcomingVoteData, 'assetCode' | 'assetIssuer'>> = [
    {
        assetCode: 'PYUSD',
        assetIssuer: 'GDQE7IXJ4HUHV6RQHIUPRJSEZE4DRS5WY577O2FY6YQ5LVWZ7JZTU2V5',
    },
    {
        assetCode: 'ESP',
        assetIssuer: 'GD2JVUJNJFJTV3P3DACOQNILC2HDHDQAIX76UNUCMAAKCCT7MVW4OFEW',
    },
    {
        assetCode: 'USDP',
        assetIssuer: 'GDTEQF6YGCKLIBD37RJZE5GTL3ZY6CBQIKH7COAW654SYEBE6XJJOLOW',
    },
    {
        assetCode: 'AQUAmb',
        assetIssuer: 'GDXF6SYWIQOKOZ7BACXHBFBLQZEIH25KOTTLWQK35GO3JKRNIFHHGBPC',
    },
    {
        assetCode: 'yXLM',
        assetIssuer: 'GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55',
    },
    {
        assetCode: 'SHX',
        assetIssuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    },
    {
        assetCode: 'RAYO',
        assetIssuer: 'GBPDJLJ23JEKXV5VVDD3FVNPW5XRRZPK6PCHWRIKM2STZ57423B6IXSQ',
    },
    {
        assetCode: 'yUSDC',
        assetIssuer: 'GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF',
    },
    {
        assetCode: 'ETH',
        assetIssuer: 'GBFXOHVAS43OIWNIO7XLRJAHT3BICFEIKOJLZVXNT572MISM4CMGSOCC',
    },
];

const MOCK_UPCOMING_VOTES: UpcomingVoteData[] = MOCK_UPCOMING_VOTES_ASSETS.map(
    ({ assetCode, assetIssuer }, index) => {
        const startAt = convertLocalDateToUTCIgnoringTimezone(
            new Date(Date.UTC(2026, 4, 11 + index * 7, 0, 0, 0)),
        );

        return {
            startsAt: `Starts ${getDateString(startAt.getTime(), {})}`,
            assetCode,
            assetIssuer,
            type: 'ADD_ASSET',
        };
    },
);

const AssetRegistryMainPage = () => {
    const [filter, setFilter] = useState(AssetRegistryFilter.all);
    const [search, setSearch] = useState('');
    const [apiRegistryAssets, setApiRegistryAssets] = useState<RegistryAsset[]>(null);
    const [apiUpcomingVotes, setApiUpcomingVotes] = useState<UpcomingVoteData[]>([]);
    const [myVoteProposals, setMyVoteProposals] = useState<RegistryProposalPreview[]>([]);
    const [historyVoteProposals, setHistoryVoteProposals] = useState<RegistryProposalPreview[]>([]);
    const [isMyVotesLoading, setIsMyVotesLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [marketStats, setMarketStats] = useState<RegistryAssetMarketStatsMap>({});
    const [isMarketStatsLoading, setIsMarketStatsLoading] = useState(true);
    const { account, isLogged } = useAuthStore();

    useEffect(() => {
        let isCancelled = false;

        getRegistryAssetsRequest()
            .then(data => {
                if (!isCancelled) {
                    setApiRegistryAssets(data.results);
                }
            })
            .catch(() => undefined);

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        if (filter !== AssetRegistryFilter.myVotes) {
            return;
        }

        if (!isLogged || !account) {
            setMyVoteProposals([]);
            return;
        }

        let isCancelled = false;

        setIsMyVotesLoading(true);

        getRegistryMyVotesRequest(account.accountId())
            .then(data => {
                if (!isCancelled) {
                    setMyVoteProposals(data);
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    setMyVoteProposals([]);
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setIsMyVotesLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [account, filter, isLogged]);

    useEffect(() => {
        if (filter !== AssetRegistryFilter.history) {
            return;
        }

        if (!isLogged || !account) {
            setHistoryVoteProposals([]);
            return;
        }

        let isCancelled = false;

        setIsHistoryLoading(true);

        getRegistryVoteHistoryRequest(account.accountId())
            .then(data => {
                if (!isCancelled) {
                    setHistoryVoteProposals(data);
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    setHistoryVoteProposals([]);
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setIsHistoryLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [account, filter, isLogged]);

    useEffect(() => {
        let isCancelled = false;

        getUpcomingRegistryVotesRequest()
            .then(data => {
                if (isCancelled) {
                    return;
                }

                const mappedVotes = data
                    .filter(
                        proposal =>
                            proposal.proposal_status === 'DISCUSSION' &&
                            proposal.start_at &&
                            proposal.asset_code,
                    )
                    .sort(
                        (a, b) =>
                            new Date(a.start_at ?? 0).getTime() -
                            new Date(b.start_at ?? 0).getTime(),
                    )
                    .map(proposal => {
                        const startAt = convertLocalDateToUTCIgnoringTimezone(
                            new Date(proposal.start_at as string),
                        );

                        return {
                            id: String(proposal.id),
                            startsAt: `Starts ${getDateString(startAt.getTime(), {})}`,
                            assetCode: proposal.asset_code as string,
                            assetIssuer: proposal.asset_issuer ?? '',
                            type: proposal.proposal_type as RegistryAssetProposalType,
                        };
                    });

                setApiUpcomingVotes(mappedVotes);
            })
            .catch(() => {
                if (!isCancelled) {
                    setApiUpcomingVotes([]);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!apiRegistryAssets) return;

        let isCancelled = false;

        setIsMarketStatsLoading(true);

        const allAssetsContracts = [
            ...DEFAULT_REGISTRY_ASSETS,
            ...apiRegistryAssets.filter(({ proposals }) =>
                proposals.some(
                    ({ proposal_status }) =>
                        proposal_status === 'VOTED' || proposal_status === 'VOTING',
                ),
            ),
        ]
            .filter(asset => asset.asset_code)
            .map(
                asset =>
                    asset.asset_contract_address ??
                    createAsset(asset.asset_code as string, asset.asset_issuer ?? '').contract,
            );

        getRegistryAssetMarketStatsRequest(allAssetsContracts)
            .then(data => {
                if (!isCancelled) {
                    setMarketStats(data);
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    setMarketStats({});
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setIsMarketStatsLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [apiRegistryAssets]);

    const upcomingVotes = useMemo<UpcomingVoteData[]>(
        () => (apiUpcomingVotes.length ? apiUpcomingVotes : MOCK_UPCOMING_VOTES),
        [apiUpcomingVotes],
    );

    const items = useMemo(() => {
        const defaultIds = new Set(DEFAULT_REGISTRY_ASSETS.map(getRegistryAssetId));
        const uniqueApiRegistryAssets =
            apiRegistryAssets?.filter(
                asset =>
                    !defaultIds.has(getRegistryAssetId(asset)) &&
                    asset.proposals.some(proposal => proposal.proposal_status === 'VOTED'),
            ) ?? [];

        return [...DEFAULT_REGISTRY_ASSETS, ...uniqueApiRegistryAssets];
    }, [apiRegistryAssets]);

    const filteredItems = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return items.filter(item => {
            const matchesFilter =
                filter === AssetRegistryFilter.all
                    ? true
                    : filter === AssetRegistryFilter.whitelisted
                      ? item.whitelisted
                      : !item.whitelisted;

            const matchesSearch =
                !searchValue ||
                item.asset_code?.toLowerCase().includes(searchValue) ||
                item.asset_issuer?.toLowerCase().includes(searchValue);

            return matchesFilter && matchesSearch;
        });
    }, [items, filter, search]);

    const onFilterChange = (value: AssetRegistryFilter) => {
        if (
            (value === AssetRegistryFilter.myVotes || value === AssetRegistryFilter.history) &&
            !isLogged
        ) {
            ModalService.openModal(ChooseLoginMethodModal);
            return;
        }

        setFilter(value);
    };

    const isVotesMode =
        filter === AssetRegistryFilter.myVotes || filter === AssetRegistryFilter.history;
    const voteProposals =
        filter === AssetRegistryFilter.myVotes ? myVoteProposals : historyVoteProposals;
    const isVotesLoading =
        filter === AssetRegistryFilter.myVotes ? isMyVotesLoading : isHistoryLoading;

    return (
        <PageContainer $color={COLORS.gray50}>
            <MainSection>
                <Title>Asset Registry</Title>

                <AssetRegistryContent
                    items={filteredItems}
                    voteProposals={voteProposals}
                    isVotesMode={isVotesMode}
                    isVotesLoading={isVotesLoading}
                    marketStats={marketStats}
                    isMarketStatsLoading={isMarketStatsLoading}
                    upcomingVotes={upcomingVotes}
                    toolbar={
                        <Toolbar>
                            <FilterGroup
                                value={filter}
                                options={FILTER_OPTIONS}
                                onChange={onFilterChange}
                            />

                            <FilterSelect
                                value={filter}
                                options={FILTER_OPTIONS}
                                onChange={onFilterChange}
                            />
                            {!isVotesMode ? (
                                <SearchInputWrap>
                                    <Input
                                        inputSize="medium"
                                        placeholder="Search by token name or address"
                                        value={search}
                                        onChange={({ target }) => setSearch(target.value)}
                                        postfix={<Search />}
                                    />
                                </SearchInputWrap>
                            ) : null}
                        </Toolbar>
                    }
                />
            </MainSection>
        </PageContainer>
    );
};

export default AssetRegistryMainPage;
