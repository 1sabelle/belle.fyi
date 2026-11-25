import type { ComponentType } from 'react'
import { CuivienenIcon, KaleidoscopeIcon, SeerSchoolIcon, TideIcon } from './ProjectIcons'
import Sparkle from './Sparkle'
import { useMoonPreview } from './MoonPreviewContext'
import kaleidoscopePreview from './assets/previews/kaleidoscope.webp'
import tidePreview from './assets/previews/tide.webp'
import seerSchoolPreview from './assets/previews/seer-school.webp'
import './ProjectList.css'

type Project = {
  name: string
  url: string
  description: string
  Icon: ComponentType
  preview?: string
}

const PROJECTS: Project[] = [
  { name: 'kaleidoscope', url: 'https://kaleidoscope.belle.fyi', description: 'a palette creator', Icon: KaleidoscopeIcon, preview: kaleidoscopePreview },
  { name: 'tide', url: 'https://tide.belle.fyi', description: 'a cycle tracker', Icon: TideIcon, preview: tidePreview },
  { name: 'seer school', url: 'https://seer.belle.fyi', description: 'a tarot study companion', Icon: SeerSchoolIcon, preview: seerSchoolPreview },
  { name: 'cuiviénen', url: 'https://github.com/1sabelle/cuivienen', description: 'a calm navy theme', Icon: CuivienenIcon },
]

export default function ProjectList() {
  const { showPreview, hidePreview } = useMoonPreview()

  return (
    <ul className="project-list">
      {PROJECTS.map(({ name, url, description, Icon, preview }) => (
        <li key={url}>
          <a
            className="project-list__link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={preview ? () => showPreview(preview) : undefined}
            onFocus={preview ? () => showPreview(preview) : undefined}
            onMouseLeave={hidePreview}
            onBlur={hidePreview}
          >
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
