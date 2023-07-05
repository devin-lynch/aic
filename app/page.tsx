'use client';

import Search from './components/Search';
import { useEffect, useState } from 'react';

export default function Home() {
  const [searchResults, setSearchResults] = useState();
  const [imgId, setImgId] = useState();
  const [searchResultsIndex, setSearchResultsIndex] = useState(0);

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
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setSearchResults(await reachBackend('cats'));
    };
    fetchSearchResults().catch(console.log);
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        let response = await fetch('http://localhost:8000/image', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            id: searchResults[searchResultsIndex].id,
          }),
        });
        let data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResults) {
      (async () => {
        setImgId(await fetchImage());
      })();
    }
  }, [searchResults, searchResultsIndex]);

  const handleNextClick = () => {
    setSearchResultsIndex(searchResultsIndex + 1);
  };
  return (
    <main>
      <div>
        <p>test</p>
        {imgId ? (
          <div>
            <img
              src={`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`}
              alt="art"
            />
            <button onClick={handleNextClick}>next</button>
          </div>
        ) : null}
        <Search
          reachBackend={reachBackend}
          setSearchResults={setSearchResults}
        />
      </div>
    </main>
  );
}
