import * as React from 'react';

import { Layout, LeftColumn } from './AssetRegistryContent.styled';

import {
    RegistryAsset,
    RegistryAssetMarketStatsMap,
    RegistryProposalPreview,
    UpcomingVoteData,
} from '../../AssetRegistryMainPage.types';
import AssetRegistryList from '../AssetRegistryList/AssetRegistryList';
import AssetRegistryMyVotesList from '../AssetRegistryMyVotesList/AssetRegistryMyVotesList';
import AssetRegistrySidebar from '../AssetRegistrySidebar/AssetRegistrySidebar';

type AssetRegistryContentProps = {
    items: RegistryAsset[];
    voteProposals: RegistryProposalPreview[];
    isVotesMode: boolean;
    isVotesLoading: boolean;
    marketStats: RegistryAssetMarketStatsMap;
    isMarketStatsLoading: boolean;
    upcomingVotes: UpcomingVoteData[];
    toolbar: React.ReactNode;
};

const AssetRegistryContent = ({
    items,
    voteProposals,
    isVotesMode,
    isVotesLoading,
    marketStats,
    isMarketStatsLoading,
    upcomingVotes,
    toolbar,
}: AssetRegistryContentProps) => (
    <Layout>
        <LeftColumn>
            {toolbar}
            {isVotesMode ? (
                <AssetRegistryMyVotesList proposals={voteProposals} isLoading={isVotesLoading} />
            ) : (
                <AssetRegistryList
                    items={items}
                    marketStats={marketStats}
                    isMarketStatsLoading={isMarketStatsLoading}
                />
            )}
        </LeftColumn>
        <AssetRegistrySidebar
            marketStats={marketStats}
            isMarketStatsLoading={isMarketStatsLoading}
            upcomingVotes={upcomingVotes}
        />
    </Layout>
);

export default AssetRegistryContent;
