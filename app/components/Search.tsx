'use client'

import React, { useState } from 'react'

export default function Search() {

    const [search, setSearch] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        console.log(search)
    }

    return (
        <div>
            <input 
                type="text" 
                name='search' 
                placeholder="Search art..." 
                onChange={handleInputChange}
                id='search'
            />
            <input 
                type="submit"
                name="search"
            />
        </div>
    )
}