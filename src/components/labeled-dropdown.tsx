'use client'

import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger, DropdownValue } from '@/components/dropdown'

interface LabeledDropdownProps {
  name: string
  defaultValue: string
  labels: Record<string, string>
  ariaLabel: string
  className?: string
  size?: 'default' | 'sm'
}

export function LabeledDropdown({ name, defaultValue, labels, ariaLabel, className, size }: LabeledDropdownProps) {
  return (
    <Dropdown name={name} defaultValue={defaultValue}>
      <DropdownTrigger aria-label={ariaLabel} size={size} className={className}>
        <DropdownValue>{(value: string) => labels[value]}</DropdownValue>
      </DropdownTrigger>
      <DropdownContent>
        {Object.entries(labels).map(([value, label]) => (
          <DropdownItem key={value} value={value}>{label}</DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  )
}
