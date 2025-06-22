import { ActionButton } from "@/components/ui/custom/custom-button/action-button"
import { CustomButton } from "@/components/ui/custom/custom-button/button"
import { CustomInput } from "@/components/ui/custom/custom-input"
import { cn } from "@/lib/utils"
import { ShopSearchModel } from "@/models/class/shop/shop.model"
import { useState } from "react"

interface FilterBoxProps {
    onSearch: (search: Partial<ShopSearchModel>) => void
    onReset: () => void
    className?: string
}

export const FilterBox = (props: FilterBoxProps) => {
    const { onSearch, onReset, className } = props
    const [search, setSearch] = useState<string>('')

    const handleSearch = () => {
        onSearch({
            search
        })
    }
    const handleReset = () => {
        setSearch('')
        onReset()
    }

    return (
        <div className={cn("flex items-center gap-2 flex-wrap mr-4", className)}>
            <CustomInput placeholder='Search shop id/ shop name/ wallet address' className="filter w-[18rem]" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="flex items-center gap-2">
                <CustomButton disabled={!search} variant="cancel" size="sm" className="filter" onClick={handleReset}>Reset</CustomButton>
                <ActionButton action="search" onClick={() => handleSearch()} className="filter">
                    Search
                </ActionButton>
            </div>
        </div>
    )
}