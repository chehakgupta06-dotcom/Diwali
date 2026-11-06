import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FamilyMessage from './components/FamilyMessage'
import DiyaLighting from './components/DiyaLighting'
import Lakshmi from './components/Lakshmi'
import Wishes from './components/Wishes'
import DailyBlessing from './components/DailyBlessing'
import SpinWheel from './components/SpinWheel'
import Sweets from './components/Sweets'
import Rangoli from './components/Rangoli'
import Fireworks from './components/Fireworks'
import CardGenerator from './components/CardGenerator'
import WishWall from './components/WishWall'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import { SvgDefs } from './components/Shared'
import useMusic from './hooks/useMusic'

export default function App() {
  const music = useMusic()
  return (
    <>
      <SvgDefs />
      <Particles />
      <Navbar music={music} />
      <main>
        <Hero music={music} />
        <FamilyMessage />
        <DiyaLighting />
        <Lakshmi />
        <Wishes />
        <DailyBlessing />
        <SpinWheel />
        <Sweets />
        <Rangoli />
        <Fireworks />
        <CardGenerator />
        <WishWall />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
