import { Navigate, Route, Routes } from 'react-router-dom'
import DeckView from './components/DeckView.jsx'
import { defaultPath } from './content/registry.js'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultPath} replace />} />
      <Route path="/:curso/:trilha" element={<DeckView />} />
      <Route path="/:curso/:trilha/:aula" element={<DeckView />} />
      <Route path="/:curso/:trilha/:aula/:slide" element={<DeckView />} />
      <Route path="*" element={<Navigate to={defaultPath} replace />} />
    </Routes>
  )
}
