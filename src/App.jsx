import { useState } from 'react'
import NavBar from "./components/NavBar"
import Main from './components/Main';

function App() {
  const [accounts, setAccounts] = useState("");

  return (
    <div>
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <Main accounts={accounts} />
    </div>
  )
}

export default App
