import * as React from 'react';

import LobstrIcon from 'assets/wallets/lobstr/lobstr-name-logo.svg';
import StellarTermIcon from 'assets/wallets/stellarterm-logo.svg';
import StellarXIcon from 'assets/wallets/stellarx-logo.svg';

import {
    Wrapper,
    Title,
    FlexTitle,
    ImageBlock,
    IconWrapper,
    FreighterIcon,
    HotWalletIcon,
} from './SupportedWallets.styled';

const SupportedWallets: React.FC = () => {
    return (
        <Wrapper id="supported-wallets">
            <Title>Supported by:</Title>

            <ImageBlock>
                <FlexTitle>Supported by:</FlexTitle>

                <IconWrapper href="https://lobstr.co/" target="_blank" rel="noreferrer">
                    <LobstrIcon />
                </IconWrapper>

                <IconWrapper href="https://www.stellarx.com/" target="_blank" rel="noreferrer">
                    <StellarXIcon />
                </IconWrapper>

                <IconWrapper href="https://www.freighter.app/" target="_blank" rel="noreferrer">
                    <FreighterIcon />
                </IconWrapper>

                <IconWrapper href="https://stellarterm.com/" target="_blank" rel="noreferrer">
                    <StellarTermIcon />
                </IconWrapper>

                <IconWrapper href="https://hot-labs.org/" target="_blank" rel="noreferrer">
                    <HotWalletIcon />
                </IconWrapper>
            </ImageBlock>
        </Wrapper>
    );
};

export default SupportedWallets;
