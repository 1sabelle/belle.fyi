import { CuivienenIcon, KaleidoscopeIcon, TideIcon } from './ProjectIcons'
import Sparkle from './Sparkle'
import './ProjectList.css'

const PROJECTS = [
  { name: 'kaleidoscope', url: 'https://kaleidoscope.belle.fyi', description: 'a palette creator', Icon: KaleidoscopeIcon },
  { name: 'tide', url: 'https://tide.belle.fyi', description: 'a cycle tracker', Icon: TideIcon },
  { name: 'cuiviénen', url: 'https://github.com/1sabelle/cuivienen', description: 'a calm navy theme', Icon: CuivienenIcon },
]

export default function ProjectList() {
  return (
    <ul className="project-list">
      {PROJECTS.map(({ name, url, description, Icon }) => (
        <li key={url}>
          <a className="project-list__link" href={url} target="_blank" rel="noopener noreferrer">
            <span className="project-list__star">
              <Icon />
              <Sparkle size={14} className="project-list__twinkle" />
            </span>
            <span className="project-list__name">{name}</span>
            <span className="project-list__description">{description}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
