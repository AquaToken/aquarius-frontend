import * as React from 'react';
import styled, { css } from 'styled-components';

import { flexAllCenter } from 'styles/mixins';
import { COLORS } from 'styles/style-constants';

const Container = styled.div`
    width: 100%;
`;

const Labels = styled.div`
    width: 100%;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${COLORS.textGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.7rem;
`;

const LeftLabel = styled.div`
    ${flexAllCenter};
`;

const progressLineStyles = css`
    height: 0.8rem;
    border-radius: 8px;
`;

const Outer = styled.div`
    ${progressLineStyles};
    width: 100%;
    background-color: ${COLORS.gray100};
`;

const Inner = styled.div<{ $width: string }>`
    ${progressLineStyles};
    width: ${({ $width }) => $width};
    background-color: ${({ $color }: { $color?: string }) => $color || COLORS.purple500};
`;

const ProgressLine = ({
    percent,
    leftLabel,
    rightLabel,
    color = COLORS.purple500,
}: {
    percent: number;
    leftLabel: string;
    rightLabel: string | React.ReactNode;
    color?: string;
}): React.ReactNode => (
    <Container>
        <Labels>
            <LeftLabel>{leftLabel}</LeftLabel>
            <span>{rightLabel}</span>
        </Labels>
        <Outer>
            <Inner $width={`${percent}%` || '0'} $color={color} />
        </Outer>
    </Container>
);

export default ProgressLine;
