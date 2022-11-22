import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import axios from "axios"
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto"
import env from "ts-react-dotenv"

ChartJS.register(ArcElement, Tooltip, Legend)

type dataType = {
  data: string
}

const HOST = import.meta.env.VITE_HOST
const KEY = import.meta.env.VITE_KEY

const options = {
  indexAxis: "x" as const,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}
function CoronaChart({ data }: dataType) {
  const [chartData, setChartData] = useState(null)
  useEffect(() => {
    const getStatistics = async () => {
      const res = await axios("https://covid-193.p.rapidapi.com/statistics", {
        headers: {
          "X-RapidAPI-Key": `${KEY}`,
          "X-RapidAPI-Host": `${HOST}`,
        },
      })
      const sData = await res.data.response
      const totalCases = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.cases.total,
          0,
        )
      const recoveredCases = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.cases.recovered,
          0,
        )
      const activeCases = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.cases.active,
          0,
        )
      const newCases = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.cases.new),
          0,
        )
      const criticalCases = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.cases.critical,
          0,
        )
      const totalDeaths = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.deaths.total,
          0,
        )
      const newDeaths = await sData
        .filter((x) => x.deaths.new !== null)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.deaths.new),
          0,
        )
      setChartData({
        labels: [`${data}`],
        datasets: [
          {
            label: "Total Cases",
            data: [totalCases],
            borderColor: ["red"],
            backgroundColor: ["yellow"],
          },
          {
            label: "Recovered Cases",
            data: [recoveredCases],
            borderColor: ["red"],
            backgroundColor: ["green"],
          },
          {
            label: "Active Cases",
            data: [activeCases],
            borderColor: ["red"],
            backgroundColor: ["pink"],
          },
          {
            label: "Critical Cases",
            data: [criticalCases],
            borderColor: ["red"],
            backgroundColor: ["red"],
          },
          {
            label: "New Cases",
            data: [newCases],
            borderColor: ["red"],
            backgroundColor: ["yellow"],
          },
          {
            label: "Total Deaths",
            data: [totalDeaths],
            borderColor: ["black"],
            backgroundColor: ["black"],
          },
          {
            label: "New Deaths",
            data: [newDeaths],
            borderColor: ["black"],
            backgroundColor: ["red"],
          },
        ],
      })
    }
    const getStatisticsData = async () => {
      const res = await axios("https://covid-193.p.rapidapi.com/statistics", {
        params: { country: data },
        headers: {
          "X-RapidAPI-Key": `${KEY}`,
          "X-RapidAPI-Host": `${HOST}`,
        },
      })
      const sData = await res.data.response[0]
      setChartData({
        labels: [`${data}`],
        datasets: [
          {
            label: "Total Cases",
            data: [sData.cases.total],
            borderColor: ["red"],
            backgroundColor: ["yellow"],
          },
          {
            label: "Recovered Cases",
            data: [sData.cases.recovered],
            borderColor: ["red"],
            backgroundColor: ["green"],
          },
          {
            label: "Active Cases",
            data: [sData.cases.active],
            borderColor: ["red"],
            backgroundColor: ["pink"],
          },
          {
            label: "Critical Cases",
            data: [sData.cases.critical],
            borderColor: ["red"],
            backgroundColor: ["red"],
          },
          {
            label: "New Cases",
            data: [
              sData.cases.new === null
                ? "No New Case"
                : Number(sData.cases.new),
            ],
            borderColor: ["red"],
            backgroundColor: ["yellow"],
          },
          {
            label: "Total Deaths",
            data: [sData.deaths.total],
            borderColor: ["black"],
            backgroundColor: ["black"],
          },
          {
            label: "New Deaths",
            data: [
              sData.deaths.new === null
                ? "No New Death"
                : Number(sData.deaths.new),
            ],
            borderColor: ["black"],
            backgroundColor: ["red"],
          },
        ],
      })
    }
    data === "global" ? getStatistics() : getStatisticsData()
  }, [data])

  return (
    <div className="flex flex-col sm:flex-row w-full gap-5">
      <div className="flex-1 hidden lg:block">
        {chartData && <Bar data={chartData} options={options} />}
      </div>
      <div className="flex text-center sm:w-96 sm:my-auto flex-col mx-auto mt-10">
        <h1 className="text-2xl">{data.toUpperCase()}</h1>
        <div className="mb-10">
          {chartData &&
            chartData.datasets.map((items, index) => {
              return (
                <div key={index} className="flex gap-x-1 text-lg lg:ml-auto">
                  <h1>{items.label}</h1>
                  <span>:</span>
                  <span>{items.data[0]}</span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default CoronaChart
