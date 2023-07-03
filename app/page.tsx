'use client'

import Search from "./components/Search"

import { useState } from "react"

export default async function Home() {

  const [search, setSearch] = useState('cats')

  const reachBackend = async () => {
    try {
      const response = await fetch('http://localhost:8000', {
        headers: {
          'Content-Type': 'application/json'
        }, 
        next: { revalidate: 0 }, 
        method: 'POST',
        body: JSON.stringify({
          query: search
        })

      })
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // const getArt = async (imageId: string) => {
  //   try {
  //     const response = await fetch(`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`)
  //     const data = await response.json()
  //     // console.log(data)
  //     return data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const imgId = await reachBackend()
  console.log('##################', imgId)


  
  return (
    <main>
      <div>
        <p>test</p>
        <img src={`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`} alt="art" />
        <Search />
      </div>
    </main>
  )
}

// https://www.artic.edu/iiif/2/2683f3a1-f440-d588-85a3-4fc05274d1c6/full/843,/0/default.jpg

// https://www.artic.edu/iiif/2/db1d547c-71c0-a448-0183-9a7952a67700/full/843,/0/default.jpg

// https://api.artic.edu/api/v1/artworks/search?q=cats