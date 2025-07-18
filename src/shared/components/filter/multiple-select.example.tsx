'use client'

import { useState } from 'react'
import { MultipleSelectStatic, SelectOption } from './multiple-selects-static'

// Example usage of MultipleSelectStatic component

const categoryOptions: SelectOption[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports' },
  { value: 'toys', label: 'Toys & Games' }
]

const priorityOptions: SelectOption<number>[] = [
  { value: 1, label: 'Low Priority' },
  { value: 2, label: 'Medium Priority' },
  { value: 3, label: 'High Priority' },
  { value: 4, label: 'Critical', disabled: true }
]

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'Korea' },
  { value: 'vn', label: 'Vietnam' }
]

export const MultipleSelectExample = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  return (
    <div className='p-6 space-y-6'>
      <h2 className='text-2xl font-bold'>MultipleSelectStatic Component Examples</h2>
      
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Categories Filter</h3>
          <MultipleSelectStatic
            label="Categories"
            placeholder="Select categories"
            options={categoryOptions}
            selectedValues={selectedCategories}
            onChange={setSelectedCategories}
            maxDisplayedItems={2}
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {selectedCategories.join(', ') || 'None'}
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-2'>Priority Filter (Number values)</h3>
          <MultipleSelectStatic
            label="Priority"
            placeholder="Select priorities"
            options={priorityOptions}
            selectedValues={selectedPriorities}
            onChange={setSelectedPriorities}
            maxDisplayedItems={3}
            showClearAll={false}
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {selectedPriorities.join(', ') || 'None'}
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-2'>Countries Filter (Long list)</h3>
          <MultipleSelectStatic
            label="Countries"
            placeholder="Select countries"
            options={countryOptions}
            selectedValues={selectedCountries}
            onChange={setSelectedCountries}
            maxDisplayedItems={1}
            className="min-w-[200px]"
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {selectedCountries.join(', ') || 'None'}
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-2'>Current Selections:</h3>
        <div className='bg-muted p-4 rounded-md'>
          <pre className='text-sm'>
            {JSON.stringify({
              categories: selectedCategories,
              priorities: selectedPriorities,
              countries: selectedCountries
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
} 