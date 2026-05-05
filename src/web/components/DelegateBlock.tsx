import * as React from 'react';
import styled, { css } from 'styled-components';

import { AppRoutes } from 'constants/routes';

import { useScrollAnimation } from 'hooks/useScrollAnimation';

import Logo from 'assets/delegate/delegate-promo.svg?url';
import DAO from 'assets/icons/objects/icon-dao-16x17.svg';
import Heart from 'assets/icons/objects/icon-heart.svg';
import Present from 'assets/icons/objects/icon-present.svg';

import { ExternalLink } from 'basics/links';
import Tooltip, { TOOLTIP_POSITION } from 'basics/Tooltip';

import { slideUpSoftAnimation, containerScrollAnimation } from 'styles/animations';
import { commonMaxWidth, flexAllCenter, flexColumn, respondDown } from 'styles/mixins';
import { Breakpoints, COLORS } from 'styles/style-constants';

/* ------------------------------- STYLED PART ------------------------------ */

type AnimationProps = {
    $animated: boolean;
    $visible: boolean;
};

const Container = styled.section<AnimationProps>`
    width: 100%;
    background-color: ${COLORS.white};
    margin-top: 8rem;
    display: flex;
    justify-content: center;
    opacity: ${({ $animated }) => ($animated ? 0 : 1)};
    ${({ $animated }) => $animated && containerScrollAnimation};

    ${({ $animated, $visible }) =>
        $animated &&
        $visible &&
        css`
            ${slideUpSoftAnimation};
        `}
`;

const Wrapper = styled.div`
    display: flex;
    ${commonMaxWidth};
    width: 100%;
    padding: 0 10rem;
    gap: 6rem;

    ${respondDown(Breakpoints.sm)`
        padding: 0 1.6rem;
        margin-left: 0;
        flex-direction: column;
    `}
`;

const LogoStyled = styled.img`
    position: absolute;
    width: 40.9rem;
`;

const LogoWrapper = styled.div<AnimationProps>`
    ${flexAllCenter};
    background-color: ${COLORS.gray50};
    border-radius: 8rem;
    flex: 1;
    position: relative;
    opacity: ${({ $animated }) => ($animated ? 0 : 1)};

    ${({ $animated, $visible }) =>
        $animated &&
        $visible &&
        css`
            ${slideUpSoftAnimation};
            animation-delay: 0.1s;
        `}

    ${respondDown(Breakpoints.xl)`
       min-height: 35rem;
       margin-top: 4rem;
    `}
`;

const ContentWrapper = styled.div<AnimationProps>`
    ${flexColumn};
    padding: 1.9rem 0;
    flex: 1;
    opacity: ${({ $animated }) => ($animated ? 0 : 1)};

    ${({ $animated, $visible }) =>
        $animated &&
        $visible &&
        css`
            ${slideUpSoftAnimation};
            animation-delay: 0.2s;
        `}
`;

const Title = styled.h2`
    font-weight: 400;
    font-size: 3.5rem;
    line-height: 100%;
    color: ${COLORS.textPrimary};
`;

const Description = styled.p`
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.8rem;
    margin: 2.4rem 0;
    color: ${COLORS.textGray};
`;

const List = styled.ul`
    padding: 0;
    margin-bottom: 0.8rem;
`;

const ListItem = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: ${COLORS.textGray};
    margin-bottom: 1.6rem;
`;

const IconWrapper = styled.div`
    ${flexAllCenter};
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    background-color: ${COLORS.gray50};

    svg {
        width: 1.6rem;
        height: 1.6rem;

        path {
            stroke: ${COLORS.black};
        }
    }
`;

/* ------------------------------- COMPONENT ------------------------------- */

interface Props {
    disableAnimation?: boolean;
}

const DelegateBlock = ({ disableAnimation = false }: Props) => {
    const { ref, visible } = useScrollAnimation(0.25, true);
    const animated = !disableAnimation;

    return (
        <Container
            ref={ref as React.RefObject<HTMLDivElement>}
            $animated={animated}
            $visible={visible}
        >
            <Wrapper>
                <LogoWrapper $animated={animated} $visible={visible}>
                    <LogoStyled src={Logo} />
                </LogoWrapper>
                <ContentWrapper $animated={animated} $visible={visible}>
                    <Tooltip
                        content={<span>⚡ Live now</span>}
                        position={TOOLTIP_POSITION.right}
                        isShow
                    >
                        <Title>Delegate ICE</Title>
                    </Tooltip>
                    <Description>
                        Delegate your ICE tokens to a trusted community member to maximize your
                        returns and minimize your effort
                    </Description>
                    <List>
                        <ListItem>
                            <IconWrapper>
                                <Present />
                            </IconWrapper>
                            Let others vote on your behalf and still earn all rewards for voting.
                        </ListItem>
                        <ListItem>
                            <IconWrapper>
                                <Heart />
                            </IconWrapper>
                            Support delegates who align with your values, approach, or ideology
                        </ListItem>
                        <ListItem>
                            <IconWrapper>
                                <DAO />
                            </IconWrapper>
                            Stay hands-off, or engage as deeply as you want
                        </ListItem>
                    </List>
                    <ExternalLink to={AppRoutes.section.delegate.link.index}>
                        Read more about Delegation
                    </ExternalLink>
                </ContentWrapper>
            </Wrapper>
        </Container>
    );
};

export default DelegateBlock;
