import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FC } from 'react';

interface TableToolbarProps {
  searchType: 'name' | 'multi'
  searchValue: string
  onSearchChange: (value: string) => void
  onAddClick?: () => void
  radioOptions?: { label: string, value: string }[]
  radioValue?: string
  onRadioChange?: (value: string) => void
}

export const TableToolbar: FC<TableToolbarProps> = ({
                                                            searchType,
                                                            searchValue,
                                                            onSearchChange,
                                                            onAddClick,
                                                            radioOptions,
                                                            radioValue,
                                                            onRadioChange,
                                                          }) => {
  return (
    <div className="flex items-center py-4 justify-between flex-wrap gap-4">
      {searchType === 'name' ? (
        <Input
          placeholder="Поиск по имени..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
      ) : searchType === 'multi' ? (
        <div className="flex items-center gap-4 flex-wrap">
          <RadioGroup
            value={radioValue}
            onValueChange={(value) => onRadioChange?.(value)}
            className="flex flex-row gap-4"
          >
            {radioOptions?.map((option) => (
              <div key={option.value} className="flex items-center gap-1">
                <RadioGroupItem value={option.value} id={option.value} />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </RadioGroup>
          <Input
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
      ) : null}

      {onAddClick && <Button onClick={onAddClick}>Добавить</Button>}
    </div>
  )
}