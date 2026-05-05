import * as React from 'react';

import { DotsLoader } from 'basics/loaders';

import {
    Wrapper,
    DexTitle,
    DexBlocks,
    Block,
    StatsBlock,
    StatWrapper,
    StatsTitle,
    StatsDesc,
} from './DexStats.styled';

interface Props {
    isLoading: boolean;
    volumeInUsd: string;
    tvlInUsd: string;
}

const DexStats: React.FC<Props> = ({ isLoading, volumeInUsd, tvlInUsd }) => {
    return (
        <Wrapper id="dex-stats">
            <DexBlocks>
                <Block>
                    <DexTitle>The Largest DEX on Stellar</DexTitle>
                </Block>

                <StatsBlock>
                    <StatWrapper>
                        <StatsTitle>{isLoading ? <DotsLoader /> : tvlInUsd}</StatsTitle>
                        <StatsDesc>Total Locked in Liquidity</StatsDesc>
                    </StatWrapper>

                    <StatWrapper>
                        <StatsTitle>{isLoading ? <DotsLoader /> : volumeInUsd}</StatsTitle>
                        <StatsDesc>Total Swap Volume</StatsDesc>
                    </StatWrapper>
                </StatsBlock>
            </DexBlocks>
        </Wrapper>
    );
};

export default DexStats;
