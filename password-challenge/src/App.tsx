import { useState, ChangeEvent } from 'react'
import './App.css'

interface passwordConfiguration {
  length: number
}

interface passwordErrors {
  length: string
}


function App() {
  const [passwordDetails, setPasswordDetails] = useState<passwordConfiguration>({length: 8})
  const [error, setError] = useState<passwordErrors>({length: ""})
  const [password, setPassword] = useState<string>('')

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(prev=>({
      ...prev,
      [name]: ""
    }))
    if(Number(value) < 4) setError(prev=>({
      ...prev,
      [name]: "Your password must have at least 4 characters"
    }))
    setPasswordDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const generatePassword = ()=> {
    const caracteresMayusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const caracteresMinusculas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const numeros = '0123456789';
  const caracteresEspeciales = '!@#$%^&*()';
  }

  return (

      <div className='fondo'>
        <h1 className='title'>Create your secure password</h1>
        <div className='options'>
          <div>
            <div>How many characters should your password have?</div>
            <div className='errorMsn'>{error?.length}</div>
          </div>
          <input  className={error?.length ? 'error' : 'noError'}  name="length" value={passwordDetails.length} onChange={handleChange}/>
        
        </div>
        <div>
          <div className='CreateBtn' onClick={generatePassword}>Create</div>
          <div>{password}</div>
        </div>
  
      </div>
   
  )
}

export default App
