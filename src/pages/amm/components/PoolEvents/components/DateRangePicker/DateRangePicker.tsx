import { isSameDay, startOfDay, subDays, subMonths, subYears } from 'date-fns';
import * as React from 'react';
import { useRef, useState } from 'react';

import { getDateString } from 'helpers/date';

import useOnClickOutside from 'hooks/useOutsideClick';

import { DatePicker, Input } from 'basics/inputs';

import ResetButton from '../ResetButton/ResetButton';

import {
    ArrowIcon,
    DateDropdown,
    DateDropdownDivider,
    DateField,
    DateFields,
    DateFilterActions,
    DateFilterButton,
    DateFilterContainer,
    DateFilterLabel,
    QuickRangeButton,
    QuickRanges,
} from './DateRangePicker.styled';

export enum DatePreset {
    all = 'all',
    week = 'week',
    month = 'month',
    year = 'year',
    custom = 'custom',
}

export type DateRangeFilter = {
    from: number | null;
    to: number | null;
    preset: DatePreset;
};

export const EMPTY_DATE_RANGE: DateRangeFilter = {
    from: null,
    to: null,
    preset: DatePreset.all,
};

const QUICK_DATE_PRESETS: { value: DatePreset; label: string }[] = [
    { value: DatePreset.all, label: 'All time' },
    { value: DatePreset.week, label: 'Last week' },
    { value: DatePreset.month, label: 'Last month' },
    { value: DatePreset.year, label: 'Last year' },
];

const getPresetRange = (preset: DatePreset): DateRangeFilter => {
    const now = new Date();
    const nowTimestamp = now.getTime();

    switch (preset) {
        case DatePreset.week:
            return {
                from: startOfDay(subDays(now, 7)).getTime(),
                to: nowTimestamp,
                preset,
            };
        case DatePreset.month:
            return {
                from: startOfDay(subMonths(now, 1)).getTime(),
                to: nowTimestamp,
                preset,
            };
        case DatePreset.year:
            return {
                from: startOfDay(subYears(now, 1)).getTime(),
                to: nowTimestamp,
                preset,
            };
        case DatePreset.all:
        default:
            return EMPTY_DATE_RANGE;
    }
};

export const isDateRangeActive = ({ from, to }: DateRangeFilter) => Boolean(from || to);

const getDateRangeLabel = (range: DateRangeFilter) => {
    if (!isDateRangeActive(range)) {
        return 'All time';
    }

    const fromLabel = range.from ? getDateString(range.from, { withTime: true }) : 'Any time';
    const toLabel = range.to ? getDateString(range.to, { withTime: true }) : 'Now';

    return `${fromLabel} - ${toLabel}`;
};

interface Props {
    value: DateRangeFilter;
    onChange: (value: DateRangeFilter) => void;
}

const DateRangePicker = ({ value, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const nowTimestamp = Date.now();
    const now = new Date(nowTimestamp);
    const fromMaxTimestamp = value.to ? Math.min(value.to, nowTimestamp) : nowTimestamp;
    const fromMaxDate = new Date(fromMaxTimestamp);

    useOnClickOutside(containerRef, () => setIsOpen(false));

    const clampToNow = (date: number | null) => (date ? Math.min(date, Date.now()) : null);

    const getMaxTime = (date: number | null, maxTimestamp: number) =>
        date && isSameDay(new Date(date), new Date(maxTimestamp))
            ? new Date(maxTimestamp)
            : undefined;

    const updateFrom = (date: number | null) => {
        const from = clampToNow(date);

        onChange({
            from,
            to: from && value.to && value.to < from ? null : value.to,
            preset: DatePreset.custom,
        });
    };

    const updateTo = (date: number | null) => {
        const to = clampToNow(date);

        onChange({
            from: value.from,
            to,
            preset: DatePreset.custom,
        });
    };

    const clearRange = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onChange(EMPTY_DATE_RANGE);
    };

    const toggleOpen = () => setIsOpen(prev => !prev);

    const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleOpen();
        }
    };

    return (
        <DateFilterContainer ref={containerRef}>
            <DateFilterButton
                $isOpen={isOpen}
                onClick={toggleOpen}
                onKeyDown={onTriggerKeyDown}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                <DateFilterLabel>{getDateRangeLabel(value)}</DateFilterLabel>
                <DateFilterActions>
                    {isDateRangeActive(value) && (
                        <ResetButton onClick={clearRange} aria-label="Clear date filter" />
                    )}
                    <ArrowIcon $isOpen={isOpen} />
                </DateFilterActions>
            </DateFilterButton>

            {isOpen && (
                <DateDropdown>
                    <DateFields>
                        <DateField>
                            <span>From</span>
                            <DatePicker
                                customInput={<Input inputSize="medium" />}
                                calendarStartDay={1}
                                date={value.from}
                                onChange={updateFrom}
                                dateFormat="MM.dd.yyyy HH:mm"
                                placeholderText="MM.DD.YYYY hh:mm"
                                maxDate={fromMaxDate}
                                maxTime={getMaxTime(value.from, fromMaxTimestamp)}
                                disabledKeyboardNavigation
                                fullWidth
                                showTimeSelect
                                timeIntervals={60}
                                popperPlacement="top-start"
                            />
                        </DateField>
                        <DateField>
                            <span>To</span>
                            <DatePicker
                                customInput={<Input inputSize="medium" />}
                                calendarStartDay={1}
                                date={value.to}
                                onChange={updateTo}
                                dateFormat="MM.dd.yyyy HH:mm"
                                placeholderText="MM.DD.YYYY hh:mm"
                                minDate={value.from ? new Date(value.from) : undefined}
                                maxDate={now}
                                maxTime={getMaxTime(value.to, nowTimestamp)}
                                disabledKeyboardNavigation
                                fullWidth
                                showTimeSelect
                                timeIntervals={60}
                                popperPlacement="top-start"
                            />
                        </DateField>
                    </DateFields>
                    <DateDropdownDivider />
                    <QuickRanges>
                        {QUICK_DATE_PRESETS.map(({ value: preset, label }) => (
                            <QuickRangeButton
                                key={preset}
                                $isActive={value.preset === preset}
                                onClick={() => onChange(getPresetRange(preset))}
                            >
                                {label}
                            </QuickRangeButton>
                        ))}
                    </QuickRanges>
                </DateDropdown>
            )}
        </DateFilterContainer>
    );
};

export default DateRangePicker;
