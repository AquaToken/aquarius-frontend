import * as React from 'react';

import { AppRoutes } from 'constants/routes';

import AquaLogo from 'assets/aqua/aqua-logo.svg';
import TokenSystemIcon from 'assets/main-page/token-system.svg?url';
import IceLogo from 'assets/tokens/ice-logo.svg';

import {
    Wrapper,
    BlocksWrapper,
    IconBlock,
    TokensBlock,
    StyledTokenSystemIcon,
    Title,
    Description,
    LinkButton,
    LinkContent,
    LogoWrapper,
    DescWrapper,
    LinkTitle,
    LinkTitleXs,
    LinkDesc,
    ArrowAlt16Styled,
} from './TokenSystem.styled';

const TokenSystem: React.FC = () => {
    return (
        <Wrapper id="token-system">
            <BlocksWrapper>
                <IconBlock>
                    <StyledTokenSystemIcon src={TokenSystemIcon} />
                </IconBlock>

                <TokensBlock>
                    <Title>Token system</Title>
                    <Description>
                        Earn AQUA by providing liquidity. Lock AQUA into ICE to access voting, earn
                        voting rewards, boost liquidity rewards, and participate in governance.
                    </Description>

                    <LinkButton to={AppRoutes.page.token}>
                        <LinkContent>
                            <LogoWrapper>
                                <AquaLogo />
                                <LinkTitleXs>AQUA</LinkTitleXs>
                            </LogoWrapper>
                            <DescWrapper>
                                <LinkTitle>AQUA</LinkTitle>
                                <LinkDesc>
                                    Utility token for liquidity rewards and ICE conversion.
                                </LinkDesc>
                            </DescWrapper>
                            <ArrowAlt16Styled />
                        </LinkContent>
                    </LinkButton>

                    <LinkButton to={AppRoutes.section.locker.link.index}>
                        <LinkContent>
                            <LogoWrapper>
                                <IceLogo />
                                <LinkTitleXs>ICE</LinkTitleXs>
                            </LogoWrapper>
                            <DescWrapper>
                                <LinkTitle>ICE</LinkTitle>
                                <LinkDesc>
                                    Non-transferable token for voting and reward boosts.
                                </LinkDesc>
                            </DescWrapper>
                            <ArrowAlt16Styled />
                        </LinkContent>
                    </LinkButton>
                </TokensBlock>
            </BlocksWrapper>
        </Wrapper>
    );
};

export default TokenSystem;
