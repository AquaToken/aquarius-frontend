import * as React from 'react';

import { AppRoutes } from 'constants/routes';

import ArrowLeft from 'assets/icons/arrows/arrow-left-16.svg';

import { BlankRouterLink } from 'basics/links';

import {
    Container,
    Content,
    Image,
    TextContainer,
    Title,
    Description,
    BackButton,
} from './Purpose.styled';

const Purpose: React.FC = () => {
    return (
        <Container>
            <Content>
                <TextContainer>
                    <BlankRouterLink to={AppRoutes.section.locker.link.index}>
                        <BackButton label="Back to locker">
                            <ArrowLeft />
                        </BackButton>
                    </BlankRouterLink>

                    <Title>Freeze your AQUA into ICE!</Title>
                    <Description>
                        Lock AQUA to receive ICE — a non-transferable token that boosts your voting
                        power and increases your rewards across the Aquarius ecosystem. Use ICE to
                        vote for markets, earn bribes and protocol incentives, and unlock higher
                        yields through ICE Boosts when providing liquidity on AMM or SDEX.
                    </Description>
                </TextContainer>

                <Image />
            </Content>
        </Container>
    );
};

export default Purpose;
