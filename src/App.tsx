import { Routes, Route } from 'react-router-dom'
import Sparkle from './Sparkle'
import Nav from './Nav'
import './App.css'

  function Home() {
    return (
      <section>
        <p className="body-text">there is a pleasure in the pathless woods </p>
      </section>
    )
  }

  function Work() {
    return (
      <section>
        <p className="body-text">there is a rapture on the lonely shore</p>
      </section>
    )
  }

  function Contact() {
    return (
      <section>
        <p className="body-text">there is society, where none intrudes</p>
        <p className="body-hidden">by the deep sea, and music in its roar:</p>
        <p className="body-hidden">i love not man the less, but nature more</p>
      </section>
    )
  }

  function App() {
    return (
      <main className="container">
        <header className="masthead">
          <div className="masthead__title">
            <h1><Sparkle size={20} /> isabelle <Sparkle size={20} /></h1>
            <p className="tagline">fyi very much</p>
          </div>
          
          <Nav />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    )
  }

  export default App