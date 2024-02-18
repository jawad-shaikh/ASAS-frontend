'use client'
import CustomFilterButton from '@/components/filter/filter';
import React, { useState } from 'react'

const monthOptions = [
    { name: 'Jan', value: 'January' },
    { name: 'Feb', value: 'February' },
    { name: 'Mar', value: 'March' },
    { name: 'Apr', value: 'April' },
    { name: 'May', value: 'May' },
    { name: 'Jun', value: 'June' },
    { name: 'Jul', value: 'July' },
    { name: 'Aug', value: 'August' },
    { name: 'Sep', value: 'September' },
    { name: 'Oct', value: 'October' },
    { name: 'Nov', value: 'November' },
    { name: 'Dec', value: 'December' },
];

const SearchPage = () => {
    const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);


    const handleFilterChange = (selectedOptions: Option[]) => {
        setSelectedFilters(selectedOptions);
    };

    return (
        <div>
            <h1 className='text-3xl font-medium text-center'>Search</h1>
            <div>
                <CustomFilterButton options={monthOptions} onChange={[{name:"SDas", value: 1}, {name:"SDas", value: 1}, {name:"SDas", value: 1}, , {name:"SDas", value: 1}, {name:"SDas", value: 1}]} name='Day' />
                <CustomFilterButton options={monthOptions} onChange={handleFilterChange} name='Months' />
                <CustomFilterButton options={monthOptions} onChange={handleFilterChange} name='Months' />
                <CustomFilterButton options={monthOptions} onChange={handleFilterChange} name='Months' />
                <p>Selected Filters: {selectedFilters.join(', ')}</p>
            </div>
        </div>
    )
}

export default SearchPage
