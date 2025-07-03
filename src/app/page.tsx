"use client"
import { useState } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"
import { Roulette } from "./components/roulette"

export default function Home() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [duration, setDuration] = useState(0) // Duration in milliseconds

  const spinEnd = () => {
    setIsSpinning(false)
    console.log("Spin ended")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Tracks trackList={[{ title: "1" }, { title: "2" }, { title: "3" }]} index={trackIndex} setIndex={setTrackIndex} />
      <Visualizer setDuration={setDuration} isSpinning={isSpinning} />
      <Roulette isSpinning={isSpinning} duration={duration} done={spinEnd} setWinner={setWinner} entries={[{ id: "1", name: "Entry 1" }, { id: "2", name: "Entry 2" }, { id: "3", name: "Entry 3" }]} />
      <button onClick={() => setIsSpinning(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Spin</button>
    </div>
  );
}
