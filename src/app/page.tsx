"use client"
import React, { useState, useEffect, ReactElement } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"
import { Roulette } from "./components/roulette"
import { Entries } from "./components/entries"
import { Prizes } from "./components/prizes"
import { Side } from "./components/side"
import { Winners } from "./components/winners"
import { Settings } from "./components/settings"

export type entry = {
  id: string, entries: number, name?: string
}
export type prize = {
  id: string, entries: number
}
import type { Winner } from "./components/winners"

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
  const [prizes, setPrizes] = useState<prize[]>([])
  const [winners, setWinners] = useState<Winner[]>([])
  const [settings, setSettings] = useState<Object>({})


  const spinEnd = () => {
    setIsSpinning(false)
  }

  const blocks = [{ icon: '/icon/user.svg', title: 'Entries', content: EntryInput, props: { setEntries } },
  { icon: '/icon/gift.svg', title: 'Prizes', content: PrizeInput, props: { setPrizes } },
  { icon: '/icon/trophy.svg', title: 'Winners', content: WinnersTable, props: { winners } },
  { icon: '/icon/settings.svg', title: 'Settings', content: SettingsPanel, props: { settings, setSettings } },
  ]

  return (
    <div className="relative flex flex-col h-dvh items-center bg-gray-500">
      <Tracks trackList={trackList} index={trackIndex} setIndex={setTrackIndex} />
      <Visualizer trackPath={trackList[trackIndex].path} setDuration={setDuration} isSpinning={isSpinning} />
      <Roulette isSpinning={isSpinning} duration={duration} done={spinEnd} setWinner={setWinner} entries={entries} />
      <button onClick={() => setIsSpinning(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Spin</button>
      <Side blocks={blocks} />
    </div>
  );
}

const EntryInput = ({ setEntries }: { setEntries: React.Dispatch<React.SetStateAction<entry[]>> }) => {
  return (
    <Entries setEntries={setEntries} />
  )
}

const PrizeInput = ({ setPrizes }: { setPrizes: React.Dispatch<React.SetStateAction<prize[]>> }) => {
  return (
    <Prizes setPrizes={setPrizes} />
  )
}

const WinnersTable = ({ winners }: { winners: Winner[] }) => {
  return (
    <Winners winners={winners} />
  )
}

const SettingsPanel = ({ settings, setSettings }: { settings: Object, setSettings: React.Dispatch<React.SetStateAction<Object>> }) => {
  return (
    <Settings settings={settings} setSettings={setSettings} />
  )
}
