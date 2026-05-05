import * as React from 'react';
import { useEffect, useState } from 'react';

import { getIceStatistics } from 'api/ice-locker';

import { formatBalance } from 'helpers/format-number';

import DotsLoader from 'basics/loaders/DotsLoader';

import {
    Container,
    StatisticItem,
    IconsBlock,
    AquaLogo,
    IceLogo,
    Amount,
    Description,
} from './StatisticBlock.styled';

const UPDATE_INTERVAL = 60 * 1000;

const StatisticBlock: React.FC = () => {
    const [statistics, setStatistics] = useState(null);
    const [updateIndex, setUpdateIndex] = useState(0);

    // Periodically refresh ICE statistics
    useEffect(() => {
        const interval = setInterval(() => {
            setUpdateIndex(prev => prev + 1);
        }, UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    // Fetch new data whenever updateIndex changes
    useEffect(() => {
        getIceStatistics().then(res => setStatistics(res));
    }, [updateIndex]);

    return (
        <Container>
            <StatisticItem>
                <IconsBlock>
                    <AquaLogo />
                </IconsBlock>
                <Amount>
                    {statistics ? formatBalance(statistics.aqua_lock_amount, true) : <DotsLoader />}
                </Amount>
                <Description>Total AQUA Locked</Description>
            </StatisticItem>

            <StatisticItem>
                <IconsBlock>
                    <IceLogo />
                </IconsBlock>
                <Amount>
                    {statistics ? (
                        formatBalance(statistics.ice_supply_amount, true)
                    ) : (
                        <DotsLoader />
                    )}
                </Amount>
                <Description>Total ICE Issued</Description>
            </StatisticItem>

            <StatisticItem>
                <IconsBlock>
                    <AquaLogo />
                    <IceLogo />
                </IconsBlock>
                <Amount>
                    {statistics ? formatBalance(statistics.aqua_lock_accounts) : <DotsLoader />}
                </Amount>
                <Description>Wallets with ICE</Description>
            </StatisticItem>
        </Container>
    );
};

export default StatisticBlock;
