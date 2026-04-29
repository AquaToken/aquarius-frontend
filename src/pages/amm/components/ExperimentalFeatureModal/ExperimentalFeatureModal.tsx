import * as React from 'react';
import styled from 'styled-components';

import { ModalProps } from 'types/modal';

import ExperimentalFeatureModalBg from 'assets/experimental-feature-modal-bg.svg';

import Button from 'basics/buttons/Button';
import { ModalDescription, ModalTitle, ModalWrapper, StickyButtonWrapper } from 'basics/ModalAtoms';

import { respondDown } from 'styles/mixins';
import { Breakpoints, FONT_SIZE } from 'styles/style-constants';

export const ExperimentalFeatureModalBackground = styled(ExperimentalFeatureModalBg)`
    width: 62.4rem;
    height: 24rem;

    ${respondDown(Breakpoints.md)`
        display: none;
    `}
`;

const Description = styled(ModalDescription)`
    ${FONT_SIZE.xs};
`;

const Title = styled(ModalTitle)`
    ${FONT_SIZE.xl};
`;

const ExperimentalFeatureModal = ({ close }: ModalProps<never>): React.ReactNode => (
    <ModalWrapper>
        <Title>Concentrated Liquidity Pools — Security Notice</Title>
        <Description>
            <p>
                Concentrated liquidity is a new pool type on Aquarius. These smart contracts have
                not yet completed an independent security audit — an audit is currently in progress.
            </p>
            <p>
                You may experience partial or total loss of deposited funds due to undiscovered
                vulnerabilities.
            </p>
            <p>
                <strong>Only deposit amounts you are prepared to lose.</strong>
            </p>
            <p>
                In the event of a confirmed protocol-level exploit resulting in loss of funds,
                Aquarius has allocated a $100,000 protection fund covering all concentrated
                liquidity pools. Any compensation will be subject to internal review and distributed
                at Aquarius&apos;s discretion.
            </p>
            <p>This feature may be modified, paused or discontinued without prior notice.</p>
        </Description>

        <StickyButtonWrapper>
            <Button fullWidth isBig onClick={() => close()}>
                I accept the risks
            </Button>
        </StickyButtonWrapper>
    </ModalWrapper>
);

export default ExperimentalFeatureModal;
