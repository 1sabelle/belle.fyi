import './ProjectList.css'

const PROJECTS = [
  { name: 'kaleidoscope', url: 'https://kaleidoscope.belle.fyi', description: 'a palette creator' },
  { name: 'tide', url: 'https://tide.belle.fyi', description: 'a cycle tracker' },
  { name: 'cuiviénen', url: 'https://github.com/1sabelle/cuivienen', description: 'a calm navy theme' },
]

export default function ProjectList() {
  return (
    <ul className="project-list">
      {PROJECTS.map(project => (
        <li key={project.url}>
          <a className="project-list__link" href={project.url} target="_blank" rel="noopener noreferrer">
            <span className="project-list__name">{project.name}</span>
            <span className="project-list__description">{project.description}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
