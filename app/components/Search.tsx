'use client';

import React, { useState } from 'react';

export default function Search({ reachBackend, setImgId }) {
  const [search, setSearch] = useState('cats');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setImgId(await reachBackend(search));
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search art..."
          onChange={handleInputChange}
          id="search"
          value={search}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
