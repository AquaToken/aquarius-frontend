import * as React from 'react';

import { AQUA_DOCS_URL } from 'constants/urls';

import AquaBuildersIcon from 'assets/main-page/aqua-builders.svg';

import { BlankExternalLink } from 'basics/links';

import {
    Wrapper,
    ShortWrapper,
    Title,
    Description,
    Benefits,
    BenefitsItem,
    IconCheck,
    DocsButton,
    ArrowAlt16Styled,
} from './AquaForBuilders.styled';

const BENEFITS = ['Wallet swaps', 'Trading automation', 'Liquidity aggregation'];

const AquaForBuilders: React.FC = () => {
    return (
        <Wrapper id="aqua-for-builders">
            <ShortWrapper>
                <AquaBuildersIcon />
                <Title>Build on Aquarius</Title>
                <Description>
                    Tap into Aquarius liquidity and swap contracts to power your project.
                </Description>

                <Benefits>
                    {BENEFITS.map(benefit => (
                        <BenefitsItem key={benefit}>
                            <IconCheck />
                            {benefit}
                        </BenefitsItem>
                    ))}
                </Benefits>

                <BlankExternalLink href={AQUA_DOCS_URL}>
                    <DocsButton withGradient isBig isRounded>
                        View docs <ArrowAlt16Styled />
                    </DocsButton>
                </BlankExternalLink>
            </ShortWrapper>
        </Wrapper>
    );
};

export default AquaForBuilders;
