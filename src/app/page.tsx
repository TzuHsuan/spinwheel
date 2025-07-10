"use client"
import React, { useState, useEffect } from "react"
import { Tracks } from "@/app/components/tracks"
import { Visualizer } from "./components/eq"
import { Roulette } from "./components/roulette"
import { Entries } from "./components/entries"
import { Prizes } from "./components/prizes"
import { PrizePicker } from "./components/prizePicker"
import { Side } from "./components/side"
import { Participants } from "./components/participants"
import { Winners } from "./components/winners"
import { Settings } from "./components/settings"

import type { entry } from "./components/entries"
import type { prize } from "./components/prizes"
import type { Winner } from "./components/winners"
import type { SettingsType } from "./components/settings"

export default function Home() {
  const basePath = 'spinwheel'
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackList] = useState([
    { title: "Yugioh", path: `/${basePath}/yugioh.mp3` },
    { title: "Dog Song", path: `/${basePath}/Dogsong.mp3` },
    { title: "Dummy", path: `/${basePath}/Dummy1.mp3` },
    { title: "Nyeh Heh Heh!", path: `/${basePath}/Nyeh Heh Heh!.mp3` },
    { title: "Spider Dance", path: `/${basePath}/Spider Dance.mp3` }
  ])
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [duration, setDuration] = useState(0) // Duration in milliseconds
  const [entries, setEntries] = useState<entry[]>([])
  const [prizes, setPrizes] = useState<prize[]>([])
  const [prizeIndex, setPrizeIndex] = useState(0)
  const [winners, setWinners] = useState<Winner[]>([])
  const [settings, setSettings] = useState<SettingsType>({ volume: 50 })

  const startSpin = () => {
    if (entries.length === 0 || prizes.length === 0) {
      alert("Please add entries and prizes before spinning.");
      return;
    }
    setIsSpinning(true);
  }

  const spinEnd = () => {
    setIsSpinning(false)
  }

  useEffect(() => {
    if (winner) {
      console.log(`${winner} won ${prizes[prizeIndex].id}`);
      setWinners(prev => [...prev, { id: winner, prize: prizes[prizeIndex].id }])
      setWinner(null)
      setEntries(prev => {
        return prev.map(entry => {
          if (entry.id === winner) {
            return { ...entry, entries: entry.entries - 1 }
          }
          return entry
        }).filter(entry => entry.entries > 0)
      })
      setPrizes(prev => {
        return prev.map((prize, index) => {
          if (index === prizeIndex) {
            return { ...prize, entries: prize.entries - 1 }
          }
          return prize
        }).filter(prize => prize.entries > 0)
      })
    }
  }, [winner, prizes, prizeIndex, entries])

  useEffect(() => {
    if (prizes.length > 0 && prizeIndex >= prizes.length) {
      setPrizeIndex(prizes.length - 1);
    }
  }, [prizes, prizeIndex])

  useEffect(() => {
    if (trackList.length > 0 && trackIndex >= trackList.length) {
      setTrackIndex(trackList.length - 1);
    }
  }, [trackList, trackIndex])

  const blocks = [{ icon: `/${basePath}/icon/ticket.svg`, title: 'Entries', content: EntryInput, props: { entries, setEntries } },
  { icon: `/${basePath}/icon/gift.svg`, title: 'Prizes', content: PrizeInput, props: { prizes, setPrizes } },
  { icon: `/${basePath}/icon/user.svg`, title: 'Participants', content: Entriants, props: { entries } },
  { icon: `/${basePath}/icon/trophy.svg`, title: 'Winners', content: WinnersTable, props: { winners } },
  { icon: `/${basePath}/icon/settings.svg`, title: 'Settings', content: SettingsPanel, props: { settings, setSettings } },
  ]

  return (
    <div className="relative flex flex-col h-dvh items-center bg-background-300">
      <Tracks trackList={trackList} index={trackIndex} setIndex={setTrackIndex} />
      <PrizePicker prizeList={prizes} setIndex={setPrizeIndex} index={prizeIndex} />
      <Visualizer trackPath={trackList[trackIndex].path} setDuration={setDuration} isSpinning={isSpinning} volume={settings.volume} />
      <Roulette isSpinning={isSpinning} duration={duration} done={spinEnd} setWinner={setWinner} entries={entries} />
      <button onClick={startSpin} disabled={isSpinning} className="mt-4 px-4 py-2 bg-background-200 hover:bg-background-300 cursor-pointer shadow text-black rounded">Start Spin</button>
      <Side blocks={blocks} />
    </div>
  );
}

const EntryInput = ({ entries, setEntries, done }: { entries: entry[], setEntries: React.Dispatch<React.SetStateAction<entry[]>>, done?: () => void }) => {
  return (
    <Entries entries={entries} setEntries={setEntries} done={done} />
  )
}

const PrizeInput = ({ prizes, setPrizes, done }: { prizes: prize[], setPrizes: React.Dispatch<React.SetStateAction<prize[]>>, done?: () => void }) => {
  return (
    <Prizes prizes={prizes} setPrizes={setPrizes} done={done} />
  )
}

const Entriants = ({ entries }: { entries: entry[] }) => {
  return (
    <Participants participants={entries} />
  )
}

const WinnersTable = ({ winners }: { winners: Winner[] }) => {
  return (
    <Winners winners={winners} />
  )
}

const SettingsPanel = ({ settings, setSettings }: { settings: SettingsType, setSettings: React.Dispatch<React.SetStateAction<SettingsType>> }) => {
  return (
    <Settings settings={settings} setSettings={setSettings} />
  )
}
