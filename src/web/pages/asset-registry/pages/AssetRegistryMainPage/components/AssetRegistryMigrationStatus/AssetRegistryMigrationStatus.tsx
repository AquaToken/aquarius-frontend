import * as React from 'react';

import { AppRoutes } from 'constants/routes';

import { getPercentValue } from 'helpers/number';

import Check16 from 'assets/icons/small-icons/check/icon-check-16.svg';
import Pending16 from 'assets/icons/status/pending-16.svg';

import DotsLoader from 'basics/loaders/DotsLoader';
import { ProgressLine } from 'basics/progress';

import { COLORS } from 'styles/style-constants';

import {
    Card,
    Description,
    Header,
    ProgressWrap,
    ReadMoreLink,
    StatusBadge,
    Title,
} from './AssetRegistryMigrationStatus.styled';

type AssetRegistryMigrationStatusProps = {
    whitelistedAssetsCount?: number;
    totalAmmRewardsAmount?: number;
    whitelistedAmmRewardsAmount?: number;
    isAssetsLoading: boolean;
    isRewardsLoading: boolean;
};

const ASSET_MIGRATION_TOTAL_ASSETS_TARGET = 15;
const ASSET_MIGRATION_REWARD_TARGET = 50;
const ASSET_MIGRATION_PROPOSAL_ID = '125';
const isMigrationComplete = false;

const AssetRegistryMigrationStatus = ({
    whitelistedAssetsCount,
    totalAmmRewardsAmount,
    whitelistedAmmRewardsAmount,
    isAssetsLoading,
    isRewardsLoading,
}: AssetRegistryMigrationStatusProps) => {
    const rewardsAlignmentPercent =
        totalAmmRewardsAmount && whitelistedAmmRewardsAmount !== undefined
            ? getPercentValue(whitelistedAmmRewardsAmount, totalAmmRewardsAmount)
            : undefined;

    return (
        <Card>
            <Header>
                <Title>Asset Whitelisting Migration Status</Title>
                <StatusBadge $isComplete={isMigrationComplete}>
                    {isMigrationComplete ? <Check16 /> : <Pending16 />}
                    {isMigrationComplete ? 'Migration Complete' : 'Migration Pending'}
                </StatusBadge>
            </Header>

            <Description>
                When at least one of the below conditions is met Aquarius will automatically migrate
                to asset whitelisting.
            </Description>

            <ProgressWrap>
                <ProgressLine
                    leftLabel="Approved Assets"
                    rightLabel={
                        isAssetsLoading ? (
                            <DotsLoader />
                        ) : (
                            `${whitelistedAssetsCount ?? 0}/${ASSET_MIGRATION_TOTAL_ASSETS_TARGET}`
                        )
                    }
                    percent={
                        +getPercentValue(
                            Number(whitelistedAssetsCount),
                            ASSET_MIGRATION_TOTAL_ASSETS_TARGET,
                        )
                    }
                    color={COLORS.blue500}
                />
                <ProgressLine
                    leftLabel="AQUA Rewards Alignment"
                    rightLabel={
                        isRewardsLoading || rewardsAlignmentPercent === undefined ? (
                            <DotsLoader />
                        ) : (
                            `${rewardsAlignmentPercent}/${ASSET_MIGRATION_REWARD_TARGET}%`
                        )
                    }
                    percent={Math.min(
                        100,
                        +getPercentValue(
                            Number(rewardsAlignmentPercent),
                            ASSET_MIGRATION_REWARD_TARGET,
                        ),
                    )}
                />
            </ProgressWrap>

            <ReadMoreLink
                href={AppRoutes.section.governance.to.proposal({
                    id: ASSET_MIGRATION_PROPOSAL_ID,
                })}
            >
                Read more
            </ReadMoreLink>
        </Card>
    );
};

export default AssetRegistryMigrationStatus;
