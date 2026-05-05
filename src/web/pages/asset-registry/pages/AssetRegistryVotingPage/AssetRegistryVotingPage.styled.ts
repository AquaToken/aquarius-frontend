import styled from 'styled-components';

import ActiveVotingCard from 'web/pages/asset-registry/pages/AssetRegistryMainPage/components/ActiveVotingCard/ActiveVotingCard';

import { commonMaxWidth, flexColumn, respondDown } from 'styles/mixins';
import { Breakpoints, COLORS, FONT_SIZE } from 'styles/style-constants';

import Sidebar from 'pages/governance/components/GovernanceVoteProposalPage/Sidebar/Sidebar';

export const Main = styled.div`
    width: 100%;
    ${commonMaxWidth};
    padding: 4rem 4rem 9.6rem;
    display: grid;
    grid-template-columns: minmax(0, 100rem) 36.6rem;
    justify-content: space-between;
    align-items: start;
    column-gap: 3.2rem;

    ${respondDown(Breakpoints.md)`
        display: block;
        padding: 2.4rem 1.6rem 6.4rem;
    `}
`;

export const MainColumn = styled.div`
    ${flexColumn};
    gap: 3.2rem;
    min-width: 0;
`;

export const Header = styled.div`
    ${flexColumn};
    gap: 2.4rem;
`;

export const ProposalId = styled.div`
    ${FONT_SIZE.sm};
    color: ${COLORS.textSecondary};
    opacity: 0.7;
`;

export const ProposalTitle = styled.h1`
    font-size: 5.6rem;
    line-height: 6.4rem;
    color: ${COLORS.textPrimary};

    ${respondDown(Breakpoints.md)`
        font-size: 4rem;
        line-height: 4.5rem;
    `}
`;

export const AssetInfoSection = styled.section`
    padding: 3.2rem;
    background: ${COLORS.white};
    border-radius: 3.2rem;

    ${respondDown(Breakpoints.md)`
        padding: 2.4rem;
        border-radius: 2.4rem;
    `}
`;

export const Content = styled.div`
    ${flexColumn};
    gap: 3.2rem;
`;

export const SectionCard = styled.section`
    padding: 3.2rem;
    background: ${COLORS.white};
    border-radius: 3.2rem;

    ${respondDown(Breakpoints.md)`
        padding: 2.4rem;
        border-radius: 2.4rem;
    `}
`;

export const SectionTitle = styled.h2`
    ${FONT_SIZE.lg};
    color: ${COLORS.textPrimary};
    margin-bottom: 2.4rem;
`;

export const ProposalText = styled.div`
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: ${COLORS.textSecondary};
    opacity: 0.7;
    white-space: pre-wrap;

    ${respondDown(Breakpoints.md)`
        word-break: break-word;
    `}
`;

export const AssetFields = styled.div`
    ${flexColumn};
    gap: 3.2rem;
    margin-top: 3.2rem;

    ${respondDown(Breakpoints.md)`
        grid-template-columns: minmax(0, 1fr);
        gap: 1.6rem;
    `}
`;

export const AssetField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

export const AssetFieldLabel = styled.div`
    ${FONT_SIZE.sm};
    color: ${COLORS.textGray};
`;

export const AssetFieldValue = styled.div`
    ${FONT_SIZE.md};
    color: ${COLORS.textTertiary};
    line-height: 2.4rem;
    word-break: break-word;
    white-space: pre-wrap;
`;

export const ResultsBlock = styled.div`
    ${flexColumn};
    gap: 2.4rem;
`;

export const Divider = styled.div`
    width: 100%;
    height: 0.1rem;
    margin: 3.2rem 0 0;
    background: ${COLORS.gray100};
`;

export const SidebarColumn = styled.aside`
    position: sticky;
    top: 4rem;
    align-self: start;
    margin-top: 7.2rem;

    ${respondDown(Breakpoints.md)`
        display: none;
    `}
`;

export const SidebarWeb = styled(Sidebar)`
    position: relative;
    top: unset;
    right: unset;
    margin: 0;
    float: none;
    width: 100%;
`;

export const SidebarMobile = styled(Sidebar)`
    display: none;
    position: relative;
    top: unset;
    right: unset;
    margin: 0;
    float: none;
    width: 100%;

    ${respondDown(Breakpoints.md)`
        display: block;
    `}
`;

export const ActiveVotingSidebarWeb = styled(ActiveVotingCard)`
    width: 100%;
`;

export const ActiveVotingSidebarMobile = styled(ActiveVotingCard)`
    display: none;

    ${respondDown(Breakpoints.md)`
        display: flex;
        width: 100%;
    `}
`;
