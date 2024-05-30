'use client';

import { useContext } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';

import { ActiveUnitContext } from './ActiveUnitProvider';

export const UnitSelect = ({ units }: { units: string[] }) => {
  const { currentActiveUnit, setCurrentActiveUnit } =
    useContext(ActiveUnitContext);
  console.log(units.length);
  return (
    <Select
      onValueChange={(value) => {
        setCurrentActiveUnit(value);
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            currentActiveUnit ? currentActiveUnit : 'No active unit.'
          }
        />
      </SelectTrigger>
      <SelectContent>
        {units.length ? (
          units.map((unit, index) => (
            <SelectItem key={`${unit}${index}`} value={unit}>
              {unit}
            </SelectItem>
          ))
        ) : (
          <SelectGroup>
            <SelectLabel>You are not associated with a unit.</SelectLabel>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};
