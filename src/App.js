import React, { useEffect, useState } from 'react'
import './App.css';
import Home from './components/Home'


const App = () => {
  const [data, setData] = useState(null)
  const [isPersonClicked, setIsPersonClicked] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('/data.json');
    const result = await response.json();
    setData(result)
  }

  if (data == null) return null

  return (
    <div className="App">
      <Home data={data} />
    </div>
  );
}

export default App;
