import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import PageMath from './pages/PageMath'
import PageFrancais from './pages/PageFrancais'
import MonStudio from './pages/MonStudio'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                element={<Accueil />} />
        <Route path="/mathematiques"   element={<PageMath />} />
        <Route path="/francais"        element={<PageFrancais />} />
        <Route path="/mon-studio"      element={<MonStudio />} />
        <Route path="*"                element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  )
}
