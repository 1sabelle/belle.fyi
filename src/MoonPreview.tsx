import { useMoonPreview } from './MoonPreviewContext'
import './MoonPreview.css'

// a glimpse of a project's page inside the backdrop moon, shown while its link is hovered
export default function MoonPreview() {
  const { preview, isShowing } = useMoonPreview()
  if (!preview) return null

  return (
    <div className={`moon-preview${isShowing ? ' moon-preview--showing' : ''}`}>
      <img className="moon-preview__page" src={preview} alt="" />
    </div>
  )
}
