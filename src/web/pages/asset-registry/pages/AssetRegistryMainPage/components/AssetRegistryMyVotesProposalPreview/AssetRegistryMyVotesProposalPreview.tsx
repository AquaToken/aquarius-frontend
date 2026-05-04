import * as React from 'react';
import { useMemo } from 'react';

import { getProposalStatus } from 'helpers/dao';
import { createAsset } from 'helpers/token';

import Asset from 'basics/Asset';

import ProposalStatus from 'pages/governance/components/GovernanceMainPage/ProposalStatus/ProposalStatus';
import YourVotes from 'pages/governance/components/GovernanceMainPage/ProposalPreview/YourVotes/YourVotes';

import { AppRoutes } from 'constants/routes';

import {
    AssetRow,
    Container,
    Header,
    Id,
    ProposalStatusWrap,
    StyledLink,
    Text,
    Title,
    VotesBlock,
} from './AssetRegistryMyVotesProposalPreview.styled';

import { RegistryProposalPreview } from '../../AssetRegistryMainPage.types';
import AssetRegistryStatusBadge from '../AssetRegistryStatusBadge/AssetRegistryStatusBadge';
import { AssetRegistryBadgeVariant } from '../../AssetRegistryMainPage.types';

type AssetRegistryMyVotesProposalPreviewProps = {
    proposal: RegistryProposalPreview;
};

const AssetRegistryMyVotesProposalPreview = ({
    proposal,
}: AssetRegistryMyVotesProposalPreviewProps): React.ReactNode => {
    const asset = useMemo(() => {
        if (!proposal.asset_code) {
            return null;
        }

        return createAsset(proposal.asset_code, proposal.asset_issuer ?? '');
    }, [proposal.asset_code, proposal.asset_issuer]);

    return (
        <Container>
            <StyledLink
                to={AppRoutes.section.assetRegistry.to.voting({
                    id: String(proposal.id),
                })}
            >
                <Header>
                    <Id>#{proposal.id}</Id>
                    <Title>{proposal.title}</Title>
                    <ProposalStatusWrap>
                        <ProposalStatus status={getProposalStatus(proposal)} />
                    </ProposalStatusWrap>
                </Header>

                <Text>{proposal.text.replace(/<[^>]*>?/gm, ' ')}</Text>

                {asset ? (
                    <AssetRow>
                        <Asset asset={asset} variant="compactDomain" />
                        <AssetRegistryStatusBadge
                            variant={
                                proposal.proposal_type === 'ADD_ASSET'
                                    ? AssetRegistryBadgeVariant.whitelisted
                                    : AssetRegistryBadgeVariant.revoked
                            }
                            label={proposal.proposal_type === 'ADD_ASSET' ? 'Whitelist' : 'Revoke'}
                            withIcon
                        />
                    </AssetRow>
                ) : null}
            </StyledLink>

            <VotesBlock>
                <YourVotes proposal={proposal} />
            </VotesBlock>
        </Container>
    );
};

export default AssetRegistryMyVotesProposalPreview;
