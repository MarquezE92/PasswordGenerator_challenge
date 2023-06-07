import { useState, ChangeEvent } from 'react'
import './App.css'

interface passwordConfiguration {
  length: number
}

function App() {
  const [passwordDetails, setPasswordDetails] = useState<passwordConfiguration>({length: 8})
  const [password, setPassword] = useState<string>('')

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (

      <div className='fondo'>
        <h1 className='title'>Create your secure password</h1>
        <div className='options'>
        How many characters should your password have?
        <input name="length" value={passwordDetails.length} onChange={handleChange} />
        </div>
        <div>
          <div className='CreateBtn'>Create</div>
          <div>{password}</div>
        </div>
  
      </div>
   
  )
}

export default App
