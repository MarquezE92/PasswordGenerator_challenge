import { useState, ChangeEvent } from 'react'
import {BsClipboard, BsClipboardCheck} from "react-icons/bs";
import './App.css'

interface passwordConfiguration {
  length: number,
  copied: boolean
}

interface passwordErrors {
  length: string
}


function App() {
  const [passwordDetails, setPasswordDetails] = useState<passwordConfiguration>({length: 8, copied: false});
  const [error, setError] = useState<passwordErrors>({length: ""});
  const [password, setPassword] = useState<string>('');


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
    const capital = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

  const characters = [...capital, ...lowercase, ...numbers, ...special];

  let newPassword = '';

  for(let i = 1; i <= passwordDetails?.length; i++) {
    const character = characters[Math.floor(Math.random() * characters.length)]
    newPassword += character
  }
  setPassword(newPassword)
  setPasswordDetails(prev => ({
    ...prev,
    copied: false
  }));
  }

  const handleCopy = ()=>{
    setPasswordDetails(prev => ({
      ...prev,
      copied: true
    }));
    navigator.clipboard.writeText(password);

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
        <div className='createPassDiv'>
          <div className='CreateBtn' onClick={generatePassword}>Create</div>
          {password ?
          <div className='pass'>
            <div>{password} </div>
            {
              passwordDetails?.copied ?
              <BsClipboardCheck className="copyIcon" /> :
              <BsClipboard onClick={handleCopy} className="copyIcon"/>
            }
            
          </div>
            :
            null
          }
        </div>
  
      </div>
   
  )
}

export default App
