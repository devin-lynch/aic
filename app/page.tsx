'use client';

import Search from './components/Search';
import { useEffect, useState } from 'react';

export default function Home() {
  const [imgId, setImgId] = useState('');

  const reachBackend = async (search) => {
    try {
      const response = await fetch('http://localhost:8000', {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 },
        method: 'POST',
        body: JSON.stringify({
          query: search,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchImageId = async () => {
      setImgId(await reachBackend('cats'));
    };
    fetchImageId().catch(console.log);
    console.log('fetched id');
  }, []);

  return (
    <main>
      <div>
        <p>test</p>
        <img
          src={`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`}
          alt="art"
        />
        <Search reachBackend={reachBackend} setImgId={setImgId} />
      </div>
    </main>
  );
}
