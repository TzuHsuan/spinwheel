'use client'
import { useRef, useEffect, useState } from "react"

const GRID_SPACING = 4
const GRID_COLOR = "rgba(0,0,0,.4)"
const FILL_COLOR = '#f50'

export const Visualizer = ({ setDuration, isSpinning }: { setDuration: React.Dispatch<React.SetStateAction<number>>, isSpinning: boolean }) => {

	const canvasRef = useRef<HTMLCanvasElement>(null)
	let canvasCtx: CanvasRenderingContext2D | null

	useEffect(() => {
		if (!canvasRef.current) return
		canvasCtx = canvasRef.current.getContext('2d')
		drawGrid()
	})

	const drawGrid = () => {
		if (!canvasRef.current || !canvasCtx) return
		for (let i = 0; i < canvasRef.current?.width; i += GRID_SPACING) {
			canvasCtx.fillStyle = GRID_COLOR
			canvasCtx.fillRect(0, i, 1, canvasRef.current.height)
		}

		for (let i = 0; i < canvasRef.current?.height; i += GRID_SPACING) {
			canvasCtx.fillStyle = GRID_COLOR
			canvasCtx.fillRect(0, i, canvasRef.current.width, 1)
		}
	}

	const audioRef = useRef<HTMLAudioElement>(null)
	let audioEle: HTMLAudioElement
	useEffect(() => {
		audioEle = new Audio()
		audioEle.src = "/yugioh.mp3"
		audioRef.current = audioEle
		audioEle.preload = "metadata"
		audioEle.onloadedmetadata = () => {
			console.log(audioEle.duration)
			setDuration(audioEle.duration * 1000) // Set duration in milliseconds
		}
	}, [])



	// useEffect(() => {
	// 	if (!audioEle) audioEle = new Audio("/yugioh.mp3")
	// 	audioEle.src = "/yugioh.mp3"
	// }, [audioRef.current])

	let audioSource = useRef<MediaElementAudioSourceNode | null>(null)
	let analyser: AnalyserNode
	let aCtx = useRef<AudioContext | null>(null)

	useEffect(() => {
		if (isSpinning) {
			playAudio()
		}
	}, [isSpinning])

	const playAudio = async () => {
		if (!canvasRef.current || !canvasCtx) return
		console.log('Playing audio')

		// audioEle = new Audio("/yugioh.mp3")
		// await audioEle.oncanplay

		if (!aCtx.current) {
			aCtx.current = new AudioContext()
			audioSource.current = aCtx.current.createMediaElementSource(audioRef.current as HTMLMediaElement)
		}
		audioRef.current?.play()
		if (!analyser) {
			analyser = aCtx.current.createAnalyser()
			audioSource.current?.connect(analyser)
			analyser.connect(aCtx.current.destination)
			analyser.fftSize = 128
		}

		const bufferLength = analyser.frequencyBinCount
		const dataArray = new Uint8Array(bufferLength)

		const barWidth = (canvasRef.current.width - 1) / bufferLength
		let barHeight

		let heightPixels = canvasRef.current.height / GRID_SPACING

		const drawVisualizer = () => {
			if (!canvasRef.current || !canvasCtx) return
			canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
			analyser.getByteFrequencyData(dataArray)
			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i]
				let barLength = Math.floor(heightPixels * barHeight / 255) * GRID_SPACING
				canvasCtx.fillStyle = FILL_COLOR
				canvasCtx.fillRect(i * barWidth, canvasRef.current.height - barLength, barWidth, barLength)
			}

			drawGrid()

			requestAnimationFrame(drawVisualizer)
		}
		drawVisualizer()
	}



	return (<>
		<canvas ref={canvasRef} height={101} width={513}></canvas>
	</>
	)
}
