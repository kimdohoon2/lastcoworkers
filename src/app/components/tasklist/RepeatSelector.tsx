'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MONTH_DAYS, WEEK_DAYS } from '@/app/constants/dateConstants';
import { FrequencyType, RecurringTaskDataBody } from '@/app/types/task';
import useDropdown from '@/app/hooks/useDropdown';
import IconToggle from '@/app/components/icons/IconToggle';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';

interface RepeatSelectorProps {
  onRepeatChange: (repeatData: RecurringTaskDataBody) => void;
}

export default function RepeatSelector({
  onRepeatChange,
}: RepeatSelectorProps) {
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [selectedMonthDay, setSelectedMonthDay] = useState<number>(1);
  const { isOpen, toggleDropdown, currentItem, closeDropdown, selectItem } =
    useDropdown();

  useEffect(() => {
    let repeatData: RecurringTaskDataBody;

    if (currentItem === '월 반복') {
      repeatData = {
        frequencyType: FrequencyType.MONTHLY,
        monthDay: selectedMonthDay,
      };
    } else if (currentItem === '주 반복') {
      repeatData = {
        frequencyType: FrequencyType.WEEKLY,
        weekDays: selectedWeekDays,
      };
    } else if (currentItem === '매일') {
      repeatData = { frequencyType: FrequencyType.DAILY };
    } else {
      repeatData = { frequencyType: FrequencyType.ONCE };
    }

    onRepeatChange(repeatData);
  }, [currentItem, selectedWeekDays, selectedMonthDay, onRepeatChange]);

  const handleWeekDaySelect = (day: number) => {
    setSelectedWeekDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleMonthDaySelect = (day: number) => {
    setSelectedMonthDay(day);
    onRepeatChange({
      frequencyType: FrequencyType.MONTHLY,
      monthDay: day,
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    value: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleWeekDaySelect(value);
    }
  };

  return (
    <div>
      <Dropdown onClose={closeDropdown}>
        <DropdownToggle onClick={toggleDropdown}>
          <div
            className={`mb-2 flex h-11 w-28 items-center justify-between rounded-xl bg-background-darkPrimary px-3.5 py-2.5 text-center text-md font-normal ${
              currentItem ? 'text-text-inverse' : 'text-text-default'
            } hover:bg-background-tertiary`}
          >
            {currentItem || '반복 안함'}
            <IconToggle
              className={clsx('transition-transform', {
                'rotate-180': isOpen,
                'rotate-0': !isOpen,
              })}
            />
          </div>
        </DropdownToggle>

        <DropdownList className="w-28" isOpen={isOpen}>
          {['한 번', '매일', '주 반복', '월 반복'].map((item) => (
            <DropdownItem
              key={item}
              className="text-start"
              onClick={() => selectItem(item)}
              onClose={closeDropdown}
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownList>
      </Dropdown>

      {currentItem === '주 반복' && (
        <div className="mt-4 flex flex-col gap-3">
          <h3 className="w-full text-lg">반복 요일 * (복수 선택 가능)</h3>
          <ul className="flex justify-around">
            {WEEK_DAYS.map(({ name, value }) => (
              <li key={name}>
                <button
                  type="button"
                  className={clsx(
                    'flex h-12 w-11 cursor-pointer items-center justify-center rounded-xl border-2 border-transparent text-md hover:border-brand-primary',
                    selectedWeekDays.includes(value)
                      ? 'bg-brand-primary text-text-primary'
                      : 'bg-background-darkPrimary text-text-default',
                  )}
                  onClick={() => handleWeekDaySelect(value)}
                  onKeyDown={(event) => handleKeyDown(event, value)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentItem === '월 반복' && (
        <div className="mt-4 flex flex-col gap-3">
          <h3 className="w-full text-lg">반복 날짜 * (기본값: 1일)</h3>
          <div className="grid grid-cols-7 grid-rows-5 rounded-xl border border-interaction-hover p-4">
            {MONTH_DAYS.map((date) => (
              <button
                key={date}
                type="button"
                className={clsx(
                  'h-8 rounded-lg text-md hover:bg-brand-primary',
                  date === selectedMonthDay &&
                    'bg-brand-primary text-background-secondary',
                )}
                onClick={() => handleMonthDaySelect(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
