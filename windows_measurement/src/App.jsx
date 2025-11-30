import Table from './components/Table.jsx'
import './index.css' // <-- THIS LINE IS CRUCIAL

function App() {
  return (
    // The class 'bg-gray-50' should apply a light background to the entire page.
    <div className="min-h-screen bg-gray-50 p-4"> 
      <Table />
    </div>
  )
}

export default App