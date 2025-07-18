'use client'

import { useState } from 'react'
import { MinMaxFilter, MinMaxValue } from './min-max-filter'

// Example usage of MinMaxFilter component

export const MinMaxFilterExample = () => {
  const [priceRange, setPriceRange] = useState<MinMaxValue>({ min: undefined, max: undefined })
  const [ageRange, setAgeRange] = useState<MinMaxValue>({ min: 18, max: 65 })
  const [amountRange, setAmountRange] = useState<MinMaxValue>({ min: undefined, max: undefined })
  const [percentageRange, setPercentageRange] = useState<MinMaxValue>({ min: undefined, max: undefined })

  return (
    <div className='p-6 space-y-6'>
      <h2 className='text-2xl font-bold'>MinMaxFilter Component Examples</h2>
      
      <div className='space-y-6'>
        <div>
          <MinMaxFilter
            label="Price"
            placeholder="Select price range"
            value={priceRange}
            onChange={setPriceRange}
            minPlaceholder="Min Price"
            maxPlaceholder="Max Price"
            prefix="$"
            decimalScale={2}
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {priceRange.min !== undefined ? `$${priceRange.min}` : 'No min'} - {priceRange.max !== undefined ? `$${priceRange.max}` : 'No max'}
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3'>Age Range Filter</h3>
          <MinMaxFilter
            label="Age"
            placeholder="Select age range"
            value={ageRange}
            onChange={setAgeRange}
            minPlaceholder="Min Age"
            maxPlaceholder="Max Age"
            suffix="years"
            decimalScale={0}
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {ageRange.min !== undefined ? `${ageRange.min} years` : 'No min'} - {ageRange.max !== undefined ? `${ageRange.max} years` : 'No max'}
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3'>Amount Range Filter (No Clear Button)</h3>
          <MinMaxFilter
            label="Amount"
            placeholder="Select amount range"
            value={amountRange}
            onChange={setAmountRange}
            minPlaceholder="From"
            maxPlaceholder="To"
            decimalScale={0}
            showClearButton={false}
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {amountRange.min !== undefined ? amountRange.min : 'No min'} - {amountRange.max !== undefined ? amountRange.max : 'No max'}
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3'>Percentage Range Filter</h3>
          <MinMaxFilter
            label="Percentage"
            placeholder="Select percentage range"
            value={percentageRange}
            onChange={setPercentageRange}
            minPlaceholder="Min %"
            maxPlaceholder="Max %"
            suffix="%"
            decimalScale={1}
            className="min-w-[200px]"
          />
          <p className='text-sm text-muted-foreground mt-2'>
            Selected: {percentageRange.min !== undefined ? `${percentageRange.min}%` : 'No min'} - {percentageRange.max !== undefined ? `${percentageRange.max}%` : 'No max'}
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3'>Disabled Filter</h3>
          <MinMaxFilter
            label="Disabled"
            placeholder="This filter is disabled"
            value={{ min: undefined, max: undefined }}
            onChange={() => {}}
            disabled={true}
          />
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-2'>Current Filter Values:</h3>
        <div className='bg-muted p-4 rounded-md'>
          <pre className='text-sm'>
            {JSON.stringify({
              priceRange,
              ageRange,
              amountRange,
              percentageRange
            }, null, 2)}
          </pre>
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-2'>Combined Filters Demo:</h3>
        <div className='flex flex-wrap gap-3'>
          <MinMaxFilter
            label="Price"
            value={priceRange}
            onChange={setPriceRange}
            prefix="$"
            decimalScale={2}
          />
          <MinMaxFilter
            label="Age"
            value={ageRange}
            onChange={setAgeRange}
            suffix="y"
            decimalScale={0}
          />
          <MinMaxFilter
            label="Amount"
            value={amountRange}
            onChange={setAmountRange}
            decimalScale={0}
          />
        </div>
      </div>
    </div>
  )
} 