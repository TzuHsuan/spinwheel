"use client"
import { useState } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"
import { Roulette } from "./components/roulette"

export default function Home() {
  const [trackIndex, setTrackIndex] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center ">
      <Tracks trackList={[{ title: "1" }, { title: "2" }, { title: "3" }]} index={trackIndex} setIndex={setTrackIndex} />
      <Visualizer />
      <Roulette entries={[{ id: "1", name: "Entry 1" }, { id: "2", name: "Entry 2" }, { id: "3", name: "Entry 3" }]} />
    </div>
  );
}
