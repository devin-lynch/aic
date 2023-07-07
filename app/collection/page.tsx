'use client';

import { useState, useEffect } from 'react';

export default function Collection() {
  const [savedArt, setSavedArt] = useState([]);

  const fetchSavedArt = async () => {
    const response = await fetch('http://localhost:8000/save');
    const data = await response.json();
    setSavedArt(data);
  };

  useEffect(() => {
    fetchSavedArt();
  }, []);

  const artCollection = savedArt.map((art, i) => {
    return (
      <img
        src={`https://www.artic.edu/iiif/2/${art}/full/843,/0/default.jpg`}
        alt="art"
        className="art"
        key={i}
      />
    );
  });

  return (
    <main>
      <div>
        <a href="http://localhost:3000"><button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>search art</button></a>
      </div>
      <div>
        {artCollection}
      </div>
    </main>
  )
}
