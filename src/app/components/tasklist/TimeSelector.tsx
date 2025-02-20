'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { generateTimes } from '@/app/utils/formatTime';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';

interface TimeSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export default function TimeSelector({
  isOpen,
  onToggle,
  onClose,
  selectedTime,
  onTimeSelect,
}: TimeSelectorProps) {
  const [isAM, setIsAM] = useState(true);

  const handleTimeSelect = (time: string) => {
    onTimeSelect(`${isAM ? '오전' : '오후'} ${time}`);
  };

  return (
    <div className="mt-9 flex">
      <Dropdown onClose={onClose}>
        <DropdownToggle
          className={clsx(
            'flex h-12 w-[7.75rem] items-center rounded-xl border border-[#F8FAFC1A] px-4 focus:border-interaction-focus',
            selectedTime ? 'text-text-inverse' : 'text-text-default',
          )}
          onClick={onToggle}
        >
          {selectedTime || '시간'}
        </DropdownToggle>

        {isOpen && (
          <DropdownList
            isOpen={isOpen}
            className="right-0 mt-2 flex w-[21rem] gap-3.5 p-3"
          >
            <div className="flex w-[4.875rem] flex-col gap-2">
              {['오전', '오후'].map((label, index) => (
                <DropdownItem
                  key={label}
                  className={`rounded-xl bg-background-darkPrimary text-text-default hover:bg-brand-primary hover:text-text-inverse ${
                    isAM === (index === 0)
                      ? 'bg-brand-primary text-text-inverse'
                      : ''
                  }`}
                  onClick={() => setIsAM(index === 0)}
                >
                  {label}
                </DropdownItem>
              ))}
            </div>

            <div className="custom-scrollbar h-[11rem] w-[13.75rem] overflow-y-auto rounded-xl bg-background-darkPrimary p-2">
              {generateTimes().map((time) => (
                <div
                  key={time}
                  role="button"
                  tabIndex={0}
                  className="w-full py-2 text-center text-md text-text-primary hover:text-brand-primary"
                  onClick={() => handleTimeSelect(time)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTimeSelect(time);
                  }}
                >
                  {time}
                </div>
              ))}
            </div>
          </DropdownList>
        )}
      </Dropdown>
    </div>
  );
}
