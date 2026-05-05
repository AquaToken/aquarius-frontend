import * as React from 'react';

import HowItWorksIcon from 'assets/main-page/how-it-works.svg';

import {
    Wrapper,
    BlocksWrapper,
    TitleBlock,
    Title,
    Description,
    BlockInteractive,
    IconBlock,
    InteractiveItem,
    InteractiveTitle,
} from './HowItWorks.styled';

const HowItWorks: React.FC = () => {
    return (
        <Wrapper id="how-it-works">
            <BlocksWrapper>
                <TitleBlock>
                    <Title>How it works</Title>
                    <Description>
                        Aquarius incentives are designed to drive deep liquidity and sustainable
                        DeFi growth.
                    </Description>
                </TitleBlock>

                <BlockInteractive>
                    <InteractiveItem>
                        <InteractiveTitle>Traders</InteractiveTitle>
                        <Description>
                            Swap tokens seamlessly through Aquarius AMMs with low fees and fast
                            on-chain execution.
                        </Description>
                    </InteractiveItem>

                    <InteractiveItem>
                        <InteractiveTitle>Voters</InteractiveTitle>
                        <Description>
                            Lock AQUA into ICE to vote on pools and direct emissions. Earn AQUA
                            rewards every day for voting!
                        </Description>
                    </InteractiveItem>

                    <InteractiveItem>
                        <InteractiveTitle>Liquidity Providers</InteractiveTitle>
                        <Description>
                            Provide liquidity to AMM pools and earn AQUA rewards, trading fees, and
                            occasional bonus tokens.
                        </Description>
                    </InteractiveItem>
                </BlockInteractive>

                <IconBlock>
                    <HowItWorksIcon />
                </IconBlock>
            </BlocksWrapper>
        </Wrapper>
    );
};

export default HowItWorks;
