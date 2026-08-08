import { useEffect, type SetStateAction } from 'react'
import './App.css'
import { parseContent, type Lang } from './lib/parser'

function App() {
  const [lang, setLang] : [Lang, SetStateAction<Lang>] = useState<Lang>(() => {
    localStorage.getItem('lang') as Lang | null ?? 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const result = parseContent(lang)

  if (!result.success) {
    console.error(result.error.issues)
    return <div>Error al cargar el CV: revisá la consola.</div>
  }

  const content = result.data

  return (
    <>
      <div>{content.cv.email}</div>
    </>
  )
}

export default App
