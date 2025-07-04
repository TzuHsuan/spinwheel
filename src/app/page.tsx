"use client"
import { useState, useEffect } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"
import { Roulette } from "./components/roulette"

export default function Home() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackList, setTrackList] = useState([
    { title: "Yugioh", path: "/yugioh.mp3" },
    { title: "Track 2" },
    { title: "Track 3" },
    { title: "Track 4" },
    { title: "Track 5" }
  ])
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [duration, setDuration] = useState(0) // Duration in milliseconds
  const [entries, setEntries] = useState([] as { id: string, name?: string }[])

  useEffect(() => {
    let entriesList = [];
    for (let i = 0; i < 50; i++) {
      entriesList.push({ id: `${i}`, name: `Entry ${i + 1}` });
    }
    setEntries(entriesList);
  }, [])


  const spinEnd = () => {
    setIsSpinning(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <Tracks trackList={trackList} index={trackIndex} setIndex={setTrackIndex} />
      <Visualizer setDuration={setDuration} isSpinning={isSpinning} />
      <Roulette isSpinning={isSpinning} duration={duration} done={spinEnd} setWinner={setWinner} entries={entries} />
      <button onClick={() => setIsSpinning(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Spin</button>
    </div>
  );
}
