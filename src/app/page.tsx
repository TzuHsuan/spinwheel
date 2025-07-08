"use client"
import { useState, useEffect, ReactElement } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"
import { Roulette } from "./components/roulette"
import { Entries } from "./components/entries"
import { Side } from "./components/side"

export type entry = {
  id: string, entries: number, name?: string
}

export default function Home() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackList, setTrackList] = useState([
    { title: "Yugioh", path: "/yugioh.mp3" },
    { title: "Track 2", path: "/yugioh.mp3" },
    { title: "Track 3", path: "/yugioh.mp3" },
    { title: "Track 4", path: "/yugioh.mp3" },
    { title: "Track 5", path: "/yugioh.mp3" }
  ])
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [duration, setDuration] = useState(0) // Duration in milliseconds
  const [entries, setEntries] = useState<entry[]>([])

  /*
  useEffect(() => {
    let entriesList = [];
    for (let i = 0; i < 50; i++) {
      entriesList.push({ id: `${i}`, entries: Math.random() * 5, name: `Entry ${i + 1}` });
    }
    setEntries(entriesList);
  }, [])
  */


  const spinEnd = () => {
    setIsSpinning(false)
  }

  const EntryInput = ({ setEntries }: { setEntries: React.Dispatch<React.SetStateAction<entry[]>> }) => {
    return (
      <Entries setEntries={setEntries} />
    )
  }

  const blocks = [{ icon: '/icon/user.svg', title: 'Entries', content: EntryInput, props: { setEntries } }]

  return (
    <div className="relative flex flex-col items-center bg-gray-500">
      <Tracks trackList={trackList} index={trackIndex} setIndex={setTrackIndex} />
      <Visualizer trackPath={trackList[trackIndex].path} setDuration={setDuration} isSpinning={isSpinning} />
      <Roulette isSpinning={isSpinning} duration={duration} done={spinEnd} setWinner={setWinner} entries={entries} />
      <button onClick={() => setIsSpinning(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Spin</button>
      <Side blocks={blocks} />
      {entries.map((entry, index) => (entry.id))}
    </div>
  );
}
