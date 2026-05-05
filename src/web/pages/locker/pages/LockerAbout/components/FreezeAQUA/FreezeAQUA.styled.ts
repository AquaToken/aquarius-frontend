import styled from 'styled-components';

import { respondDown } from 'styles/mixins';
import { Breakpoints, COLORS, FONT_SIZE } from 'styles/style-constants';

/* -------------------------------------------------------------------------- */
/*                                  Layout                                    */
/* -------------------------------------------------------------------------- */

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 9rem;
    padding: 6rem 4rem;
    ${respondDown(Breakpoints.sm)`
        flex-direction: column-reverse;
        gap: 3.2rem;
        padding: 0 1.6rem;
    `}
`;

/**
 * Text column wrapper (title, description, link).
 */
export const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    ${respondDown(Breakpoints.sm)`
        width: 100%;
    `}
`;

/**
 * Section title.
 */
export const Title = styled.h2`
    ${FONT_SIZE.xxl};
    font-weight: 700;
    color: ${COLORS.textPrimary};
    margin: 0;

    ${respondDown(Breakpoints.sm)`
        ${FONT_SIZE.xl};
    `}
`;

/**
 * Main text block (description).
 */
export const Description = styled.p`
    font-size: 1.6rem;
    color: ${COLORS.textDark};
    margin: 3rem 0;
    line-height: 1.8;

    b {
        color: ${COLORS.textPrimary};
    }
`;

/**
 * Image wrapper for the right-side illustration.
 */
export const ImageWrapper = styled.div`
    width: 40%;
    margin: -5rem auto 0;

    ${respondDown(Breakpoints.sm)`
        width: 100%;
        margin: 0 auto;
        max-height: 40rem;
    `}
`;
