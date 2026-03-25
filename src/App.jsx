import { HashRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import PageMath from './pages/PageMath'
import PageFrancais from './pages/PageFrancais'
import PageDefis from './pages/PageDefis'
import MonStudio from './pages/MonStudio'
import TableauBordParent from './pages/TableauBordParent'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"                element={<Accueil />} />
        <Route path="/mathematiques"   element={<PageMath />} />
        <Route path="/francais"        element={<PageFrancais />} />
        <Route path="/defis"           element={<PageDefis />} />
        <Route path="/mon-studio"      element={<MonStudio />} />
        <Route path="/tableau-bord-parent" element={<TableauBordParent />} />
        <Route path="*"                element={<Accueil />} />
      </Routes>
    </HashRouter>
  )
}
