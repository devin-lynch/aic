export default function Home() {

  const reachBackend = async () => {
    try {
      const response = await fetch('http://localhost:8000')
      const data = await response.json()
      console.log(data)
      return data.data.title
    } catch (error) {
      console.log(error)
    }
  }

  reachBackend()
  
  return (
    <main>
      <div>
        <p>test</p>
      </div>
      
    </main>
  )
}
