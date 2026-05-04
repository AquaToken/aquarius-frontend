import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { flexAllCenter, respondDown } from 'styles/mixins';
import { Breakpoints, COLORS } from 'styles/style-constants';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 0.1rem solid ${COLORS.gray600};
    box-sizing: border-box;
    border-radius: 0.5rem;
    padding: 3.4rem 3.2rem 3.2rem;
    background-color: ${COLORS.white};

    &:hover {
        background-color: ${COLORS.gray50};
    }

    a {
        text-decoration: none;
    }

    ${respondDown(Breakpoints.md)`
        padding: 3.2rem 1.6rem;
    `}
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
`;

export const Header = styled.div`
    margin-bottom: 1.6rem;
    display: grid;
    grid-template-areas: 'id title status';
    grid-template-columns: min-content minmax(0, 1fr) max-content;
    align-items: center;
    grid-column-gap: 1.5rem;

    ${respondDown(Breakpoints.lg)`
        grid-template-areas: 'id status' 'title title';
        grid-template-columns: min-content 1fr;
        grid-row-gap: 1.5rem;
    `}
`;

export const Id = styled.div`
    padding: 0.2rem 0.4rem;
    ${flexAllCenter};
    background: ${COLORS.gray50};
    color: ${COLORS.textGray};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    grid-area: id;
    height: min-content;
    border-radius: 0.5rem;
`;

export const Title = styled.span`
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.8rem;
    color: ${COLORS.textPrimary};
    grid-area: title;
    min-width: 0;
`;

export const Text = styled.div`
    display: -webkit-box;
    max-height: 6rem;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 2.4rem;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${COLORS.textGray};

    ${respondDown(Breakpoints.md)`
        -webkit-line-clamp: 5;
        max-height: 10rem;
    `}
`;

export const ProposalStatusWrap = styled.div`
    margin-left: auto;
    grid-area: status;
`;

export const AssetRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
    margin-bottom: 2.4rem;

    ${respondDown(Breakpoints.md)`
        flex-direction: column;
        align-items: flex-start;
    `}
`;

export const VotesBlock = styled.div`
    margin-top: 0.8rem;
`;
