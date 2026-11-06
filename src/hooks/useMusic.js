import { useCallback, useEffect, useRef, useState } from 'react'

// Happy Diwali song: put your MP3 at public/music/happy-diwali.mp3
// (the file name must match exactly). It plays only when the visitor taps the music button.
const SONG = './music/happy-diwali.mp3'

// Soft fallback tune (generated in the browser) used ONLY if the MP3 file is missing.
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]

export default function useMusic() {
  const [on, setOn] = useState(false)
  const audioRef = useRef(null)
  const ctxRef = useRef(null), timer = useRef(null), master = useRef(null), idx = useRef(2), drone = useRef([])

  const stopSynth = useCallback(() => {
    clearInterval(timer.current)
    drone.current.forEach((o) => { try { o.stop() } catch { /* ignore */ } })
    drone.current = []
    if (master.current) master.current.disconnect()
  }, [])

  const startSynth = useCallback(() => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return false
    if (!ctxRef.current) ctxRef.current = new AC()
    const ctx = ctxRef.current
    ctx.resume()
    master.current = ctx.createGain(); master.current.gain.value = 0.12; master.current.connect(ctx.destination)
    drone.current = [130.81, 196.0].map((f) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = f; g.gain.value = 0.5
      o.connect(g); g.connect(master.current); o.start(); return o
    })
    timer.current = setInterval(() => {
      const step = [-2, -1, -1, 0, 1, 1, 2][Math.floor(Math.random() * 7)]
      idx.current = Math.max(0, Math.min(SCALE.length - 1, idx.current + step))
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + 0.05
      o.type = 'triangle'; o.frequency.value = SCALE[idx.current]
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
      o.connect(g); g.connect(master.current); o.start(t); o.stop(t + 1.7)
    }, 650)
    return true
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) audioRef.current.pause()
    stopSynth()
  }, [stopSynth])

  const toggle = useCallback(() => {
    if (on) { stop(); setOn(false); return }
    if (!audioRef.current) {
      const a = new Audio(SONG)
      a.loop = true; a.preload = 'auto'; a.volume = 0.8
      audioRef.current = a
    }
    setOn(true)
    audioRef.current.play().catch(() => {
      // MP3 missing or blocked: use the soft fallback tune so the button still works
      setOn(startSynth())
    })
  }, [on, stop, startSynth])

  useEffect(() => () => { stop() }, [stop])
  return { on, toggle }
}
