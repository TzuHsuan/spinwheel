import { useRef, useEffect } from "react"

const GRID_SPACING = 4
const GRID_COLOR = "rgba(0,0,0,.4)"
const FILL_COLOR = '#f50'

export const Visualizer = ({ trackPath, setDuration, isSpinning, volume }: { trackPath: string, setDuration: React.Dispatch<React.SetStateAction<number>>, isSpinning: boolean, volume: number }) => {

	const canvasRef = useRef<HTMLCanvasElement>(null)
	const canvasCtx = useRef<CanvasRenderingContext2D | null>(null)

	useEffect(() => {
		if (!canvasRef.current) return
		canvasCtx.current = canvasRef.current.getContext('2d')
		drawGrid()
	})

	const drawGrid = () => {
		if (!canvasRef.current || !canvasCtx.current) return
		for (let i = 0; i < canvasRef.current?.width; i += GRID_SPACING) {
			canvasCtx.current.fillStyle = GRID_COLOR
			canvasCtx.current.fillRect(0, i, 1, canvasRef.current.height)
		}

		for (let i = 0; i < canvasRef.current?.height; i += GRID_SPACING) {
			canvasCtx.current.fillStyle = GRID_COLOR
			canvasCtx.current.fillRect(0, i, canvasRef.current.width, 1)
		}
	}

	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const audioEle = new Audio()
		audioRef.current = audioEle
		audioRef.current.preload = "metadata"
		audioRef.current.onloadedmetadata = () => {
			if (!audioRef.current) return
			console.log(audioRef.current.duration)
			setDuration(audioRef.current.duration * 1000) // Set duration in milliseconds
		}
	}, [setDuration])

	useEffect(() => {
		if (trackPath && audioRef.current) {
			audioRef.current.src = trackPath
			audioRef.current.load()
		}
	}, [trackPath, setDuration, audioRef]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume / 100 // Assuming volume is between 0 and 100
		}
	}, [volume])



	const audioSource = useRef<MediaElementAudioSourceNode | null>(null)
	const aCtx = useRef<AudioContext | null>(null)
	let analyser: AnalyserNode


	const playAudio = async () => {
		if (!canvasRef.current || !canvasCtx) return

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

		const heightPixels = canvasRef.current.height / GRID_SPACING

		const drawVisualizer = () => {
			if (!canvasRef.current || !canvasCtx.current) return
			canvasCtx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
			analyser.getByteFrequencyData(dataArray)
			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i]
				const barLength = Math.floor(heightPixels * barHeight / 255) * GRID_SPACING
				canvasCtx.current.fillStyle = FILL_COLOR
				canvasCtx.current.fillRect(i * barWidth, canvasRef.current.height - barLength, barWidth, barLength)
			}

			drawGrid()

			requestAnimationFrame(drawVisualizer)
		}
		drawVisualizer()
	}


	useEffect(() => {
		if (isSpinning) {
			playAudio()
		}
	}, [isSpinning])

	return (<>
		<canvas ref={canvasRef} height={101} width={513}></canvas>
	</>
	)
}
