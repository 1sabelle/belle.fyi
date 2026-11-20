import { Routes, Route, Navigate } from 'react-router-dom'
import Sparkle from './Sparkle'
import SparkleI from './SparkleI'
import Nav from './Nav'
import Starfield from './Starfield'
import MessageStars from './MessageStars'
import { MessagesProvider } from './MessagesContext'
import MessageForm from './MessageForm'
import ProjectList from './ProjectList'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'
import MoonPreview from './MoonPreview'
import { MoonPreviewProvider } from './MoonPreviewContext'
import BellePanel from './Sprite/BellePanel'
import BelleStars from './Sprite/BelleStars'
import './App.css'

function Home() {
  return (
    <section className="hero">
      <h2 className="hero__line">
        ‟there is a pleasure
        <br />
        in the pathless woods
      </h2>
      <MessageForm />
    </section>
  )
}

function Creations() {
  return (
    <section className="hero">
      <h2 className="hero__line">
        ‟there is a rapture
        <br />
        on the lonely shore
      </h2>
      <ProjectList />
    </section>
  )
}

const PAST_EXPERIENCE = [
  'Software Engineer at Hedin IT, 2023–2026',
  'Integration Developer Consultant at Exsitec, 2021–2023',
  'Analyst at HCL Technologies (part time), 2019',
]

function FindMe() {
  return (
    <section className="hero">
      <h2 className="hero__line">
        ‟there is society,
        <br />
        where none intrudes
      </h2>
      <div className="hero__about">
        <span className="hero__about-label">who i am</span>
        <p className="hero__about-name">Isabelle Schafhauser</p>
        <p className="hero__about-role">Software Developer at Inet</p>
        <span className="hero__about-heading">work experience</span>
        <ul className="hero__about-past">
          {PAST_EXPERIENCE.map(experience => (
            <li key={experience} className="hero__about-experience">
              <Sparkle size={10} className="hero__about-star" />
              {experience}
            </li>
          ))}
        </ul>
        <span className="hero__about-heading">education</span>
        <p className="hero__about-education">
          <Sparkle size={10} className="hero__about-star" />
          BSc in Informatics, University of Gothenburg, 2018–2021
        </p>
      </div>
      <div className="hero__mail">
        <span className="hero__mail-label">send me a letter</span>
        <a className="hero__mail-link" href="mailto:is@belle.fyi">
          <Sparkle size={16} className="hero__mail-sparkle" />
          <span className="hero__mail-address">is@belle.fyi</span>
          <Sparkle size={16} className="hero__mail-sparkle" />
        </a>
        <div className="hero__socials">
          <a className="hero__social-link" href="https://github.com/1sabelle" target="_blank" rel="noreferrer">
            <GitHubIcon />
            <span>github</span>
          </a>
          <a className="hero__social-link" href="https://www.linkedin.com/in/isabelleschafhauser/" target="_blank" rel="noreferrer">
            <LinkedInIcon />
            <span>linkedin</span>
          </a>
        </div>
      </div>
      <div className="hero__moon-block" aria-hidden="true">
        <p className="hero__moon-text">
          by the deep sea,
          <br />
          and music in its roar:
          <br />
          i love not man the less,
          <br />
          but nature more
        </p>
        <p className="hero__moon-cite">… Byron</p>
      </div>
    </section>
  )
}

function App() {
  return (
    <MessagesProvider>
    <MoonPreviewProvider>
      <Starfield />
      <MessageStars />
      <BelleStars />
      <BellePanel />
      <main className="container">
      <div className="hero__moon" aria-hidden="true">
        <MoonPreview />
      </div>
      <header className="masthead">
        <div className="masthead__title">
          <h1 aria-label="isabelle">
            <SparkleI className="masthead__i" />
            sabelle
          </h1>
        </div>

        <Nav />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creations" element={<Creations />} />
        <Route path="/work" element={<Navigate to="/creations" replace />} />
        <Route path="/find-me" element={<FindMe />} />
        <Route path="/contact" element={<Navigate to="/find-me" replace />} />
      </Routes>
      </main>
    </MoonPreviewProvider>
    </MessagesProvider>
  )
}

export default App
