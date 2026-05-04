import * as React from 'react';

import PageLoader from 'basics/loaders/PageLoader';

import { EmptyState, List } from '../AssetRegistryList/AssetRegistryList.styled';

import { RegistryProposalPreview } from '../../AssetRegistryMainPage.types';
import AssetRegistryMyVotesProposalPreview from '../AssetRegistryMyVotesProposalPreview/AssetRegistryMyVotesProposalPreview';

type AssetRegistryMyVotesListProps = {
    proposals: RegistryProposalPreview[];
    isLoading: boolean;
};

const AssetRegistryMyVotesList = ({
    proposals,
    isLoading,
}: AssetRegistryMyVotesListProps): React.ReactNode => {
    if (isLoading) {
        return <PageLoader />;
    }

    if (!proposals.length) {
        return <EmptyState>No votes found.</EmptyState>;
    }

    return (
        <List>
            {proposals.map(proposal => (
                <AssetRegistryMyVotesProposalPreview key={proposal.id} proposal={proposal} />
            ))}
        </List>
    );
};

export default AssetRegistryMyVotesList;
