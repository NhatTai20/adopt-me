import { render } from 'react-dom'
import SearchParams from './SearchParam';
function App() {
  return (
    <div>
      <h1>Adopt me!</h1>
      <SearchParams />
    </div>
  )
}

render(<App />, document.getElementById("root"));