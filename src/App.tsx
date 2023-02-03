import { useState } from "react";
import { City } from "./api/GeocodingAPI";
import Content from "./components/Content"
import NavBar from "./components/NavBar"

function App() {
  const [city, setCity] = useState<City>();

  return (
    <div className="App overflow-clip w-screen h-screen">
      <NavBar city={city} setCity={setCity} />
      <Content city={city} />
    </div>
  )
}

export default App
