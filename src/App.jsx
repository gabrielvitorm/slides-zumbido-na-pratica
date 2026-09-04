import { Navigate, Route, Routes } from 'react-router-dom'
import DeckView from './components/DeckView.jsx'
import Home from './components/Home.jsx'
import TrilhaHome from './components/TrilhaHome.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:curso/:trilha" element={<TrilhaHome />} />
      <Route path="/:curso/:trilha/:aula" element={<DeckView />} />
      <Route path="/:curso/:trilha/:aula/:slide" element={<DeckView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
