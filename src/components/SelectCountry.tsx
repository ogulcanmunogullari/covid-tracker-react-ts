import { useEffect, useState } from "react"
import axios from "axios"

const HOST = import.meta.env.VITE_HOST
const KEY = import.meta.env.VITE_KEY

function SelectCountry({
  userData,
  setUserData,
}: {
  userData: any
  setUserData: any
}) {
  const [countries, setCountries] = useState<string[]>([])
  useEffect(() => {
    const getCountries = async () => {
      const res = await axios("https://covid-193.p.rapidapi.com/countries", {
        headers: {
          "X-RapidAPI-Key": `${KEY}`,
          "X-RapidAPI-Host": `${HOST}`,
        },
      })
      const data = await res.data.response
      setCountries(data)
    }
    getCountries()
  }, [])
  return (
    <select
      className="w-96 mx-1 border-2 border-black rounded-xl outline-2 my-2 text-xl"
      value={userData}
      onChange={(e) => setUserData(e.target.value)}>
      <option key={Math.random()} value="global">
        Global
      </option>
      {countries?.map((country: string, index: number) => {
        return (
          <option key={index} value={country}>
            {country}
          </option>
        )
      })}
    </select>
  )
}

export default SelectCountry
