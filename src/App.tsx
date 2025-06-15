import { renderRouter } from './routes/get-routes'
import routes from './routes/init-routes'

function App() {
  return <>{renderRouter(routes)}</>
}

export default App
