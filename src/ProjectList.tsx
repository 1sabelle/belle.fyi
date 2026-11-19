import { CuivienenIcon, KaleidoscopeIcon, TideIcon } from './ProjectIcons'
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
            <Icon />
            <span className="project-list__name">{name}</span>
            <span className="project-list__description">{description}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
