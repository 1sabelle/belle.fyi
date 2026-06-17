import { Routes, Route } from 'react-router-dom'
import Sparkle from './Sparkle'
import Nav from './Nav'
import Starfield from './Starfield'
import Map from './Map'
import './App.css'

function Home() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">welcome home little one</p>
      <h2 className="hero__line">
        ‟there is a pleasure
        <br />
        in the pathless woods
      </h2>
      <p className="hero__cite">… Byron</p>
    </section>
  )
}

function Work() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">we have so much to do</p>
      <h2 className="hero__line">
        ‟there is a rapture
        <br />
        on the lonely shore
      </h2>
      <p className="hero__cite">… Byron</p>
    </section>
  )
}

function Contact() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">but i am here now</p>
      <h2 className="hero__line">
        ‟there is society,
        <br />
        where none intrudes
      </h2>
      <p className="hero__cite">… Byron</p>
    </section>
  )
}

function App() {
  return (
    <>
      <Starfield />
      {/* <div className="belle-dock">
        <Belle />
      </div> */}
      <main className="container">
      <div className="hero__moon" aria-hidden="true" />
      <header className="masthead">
        <div className="masthead__title">
          <h1>
            <Sparkle size={20} />
            {' '}
            isabelle
            {' '}
            <Sparkle size={20} />
          </h1>
          <p className="tagline">fyi very much</p>
        </div>

        <Nav />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      </main>
    </>
  )
}

export default App
