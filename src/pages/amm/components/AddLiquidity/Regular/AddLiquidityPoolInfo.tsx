import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { contractValueToAmount } from 'helpers/amount';
import { formatBalance } from 'helpers/format-number';
import { getPercentValue } from 'helpers/number';

import { useDebounce } from 'hooks/useDebounce';

import { SorobanService } from 'services/globalServices';

import { PoolExtended } from 'types/amm';

import Arrow from 'assets/icons/arrows/arrow-alt2-16.svg';

import PageLoader from 'basics/loaders/PageLoader';

import { DescriptionRow, PoolInfo } from './AddLiquidity.styled';

import AddLiquidityRewardsInfo from '../AddLiquidityRewardsInfo';
import { useAddLiquidityPoolRewards } from '../hooks/useAddLiquidityPoolRewards';

type AddLiquidityPoolInfoProps = {
    pool: PoolExtended;
    amounts: Map<string, string>;
    withPoolInfoCardSpacing: boolean;
};

type EstimatedPoolInfo = {
    depositShares: number | null;
    newWorkingBalance: number | null;
    newWorkingSupply: number | null;
};

const AddLiquidityPoolInfo = ({
    pool,
    amounts,
    withPoolInfoCardSpacing,
}: AddLiquidityPoolInfoProps): React.ReactNode => {
    const {
        account,
        poolRewards,
        incentives,
        isRewardsEnabled,
        hasActiveIncentives,
        isRewardsStatusLoading,
        isPoolRewardsLoading,
        isIncentivesLoading,
    } = useAddLiquidityPoolRewards(pool);
    const [accountShare, setAccountShare] = useState<string | null>(null);
    const [isAccountShareLoading, setIsAccountShareLoading] = useState(false);
    const [isEstimateLoading, setIsEstimateLoading] = useState(false);
    const [estimatedPoolInfo, setEstimatedPoolInfo] = useState<EstimatedPoolInfo | null>(null);
    const estimateRequestIdRef = useRef(0);

    useEffect(() => {
        if (!account) {
            setAccountShare(null);
            setIsAccountShareLoading(false);
            return;
        }

        setIsAccountShareLoading(true);
        SorobanService.token
            .getTokenBalance(pool.share_token_address, account.accountId())
            .then(setAccountShare)
            .finally(() => setIsAccountShareLoading(false));
    }, [account, pool.share_token_address]);

    const debouncedAmounts = useDebounce(amounts, 1000);

    useEffect(() => {
        if (
            !account ||
            [...debouncedAmounts.current.values()].some(value => Number.isNaN(+value))
        ) {
            setEstimatedPoolInfo(null);
            setIsEstimateLoading(false);
            return;
        }

        const requestId = estimateRequestIdRef.current + 1;
        estimateRequestIdRef.current = requestId;
        setIsEstimateLoading(true);

        const estimatePromise = SorobanService.amm
            .estimateDeposit(
                account.accountId(),
                pool.address,
                pool.tokens,
                debouncedAmounts.current,
            )
            .then(depositShares => {
                if (!depositShares) {
                    return { depositShares, newWorkingBalance: null, newWorkingSupply: null };
                }

                return SorobanService.amm
                    .estimateWorkingBalanceAndSupply(
                        pool,
                        account.accountId(),
                        String(Number(accountShare) + depositShares),
                    )
                    .then(({ workingBalance, workingSupply }) => ({
                        depositShares,
                        newWorkingBalance: workingBalance,
                        newWorkingSupply: workingSupply,
                    }));
            });

        estimatePromise
            .then(nextEstimatedPoolInfo => {
                if (requestId !== estimateRequestIdRef.current || !nextEstimatedPoolInfo) {
                    return;
                }

                setEstimatedPoolInfo(nextEstimatedPoolInfo);
            })
            .catch(() => {
                if (requestId !== estimateRequestIdRef.current) {
                    return;
                }

                setEstimatedPoolInfo(null);
            })
            .finally(() => {
                if (requestId === estimateRequestIdRef.current) {
                    setIsEstimateLoading(false);
                }
            });
    }, [account, pool, debouncedAmounts, accountShare, pool.share_token_decimals]);

    const depositShares = estimatedPoolInfo?.depositShares ?? null;
    const newWorkingBalance = estimatedPoolInfo?.newWorkingBalance ?? null;
    const newWorkingSupply = estimatedPoolInfo?.newWorkingSupply ?? null;

    const sharesBeforePercent = useMemo(() => {
        if (!Number(pool.total_share)) {
            return 0;
        }

        return +getPercentValue(Number(accountShare), +contractValueToAmount(pool.total_share), 2);
    }, [pool.total_share, accountShare]);

    const sharesAfterPercent = useMemo(() => {
        if (!depositShares) {
            return 0;
        }

        return +getPercentValue(
            Number(accountShare) + depositShares,
            +contractValueToAmount(pool.total_share) + depositShares,
            2,
        );
    }, [pool.total_share, accountShare, depositShares]);

    const isInitialDataLoading =
        !!account &&
        (isRewardsStatusLoading ||
            isAccountShareLoading ||
            isPoolRewardsLoading ||
            isIncentivesLoading ||
            (isEstimateLoading && estimatedPoolInfo === null));

    if (!account) {
        return null;
    }

    if (isInitialDataLoading) {
        return (
            <PoolInfo $withCardSpacing={withPoolInfoCardSpacing}>
                <PageLoader />
            </PoolInfo>
        );
    }

    return (
        <PoolInfo $withCardSpacing={withPoolInfoCardSpacing}>
            <DescriptionRow>
                <span>Share of Pool</span>
                <span>
                    {formatBalance(sharesBeforePercent, true)}%
                    {!!sharesAfterPercent && (
                        <>
                            <Arrow />
                            {formatBalance(sharesAfterPercent, true)}%
                        </>
                    )}
                </span>
            </DescriptionRow>

            <AddLiquidityRewardsInfo
                poolRewardTps={pool.reward_tps}
                poolTotalShare={pool.total_share}
                poolRewards={poolRewards}
                incentives={incentives}
                isRewardsEnabled={isRewardsEnabled}
                hasActiveIncentives={hasActiveIncentives}
                accountShare={accountShare}
                depositShares={depositShares}
                newWorkingBalance={newWorkingBalance}
                newWorkingSupply={newWorkingSupply}
            />
        </PoolInfo>
    );
};

export default AddLiquidityPoolInfo;
