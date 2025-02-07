"use client"
import { useState } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"

export default function Home() {
  const [trackIndex, setTrackIndex] = useState(0)

  return (
    <>
      <Tracks trackList={[{ title: "1" }, { title: "2" }, { title: "3" }]} index={trackIndex} setIndex={setTrackIndex} />
      <Visualizer />
    </>
  );
}
