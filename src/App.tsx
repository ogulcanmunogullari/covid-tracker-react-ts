import { lazy, Suspense, useState, useEffect } from "react"
import Loading from "./components/Loading"
import Navigation from "./components/Navigation"
import SelectCountry from "./components/SelectCountry"
import WhatCanWeDo from "./components/WhatCanWeDo"
const CoronaChart = lazy(() => import("./components/CoronaChart"))

function App() {
  const [userData, setUserData] = useState("global")

  return (
    <>
      <nav className="py-5 border-b-2 border-black">
        <Navigation />
      </nav>
      <main className="container mx-auto ">
        <WhatCanWeDo />
        <Suspense fallback={<Loading />}>
          <div className="flex justify-center h-20">
            <SelectCountry userData={userData} setUserData={setUserData} />
          </div>
        </Suspense>
        <Suspense fallback={<Loading />}>
          <div className="flex">
            <CoronaChart data={userData} />
          </div>
        </Suspense>
      </main>
    </>
  )
}

export default App
