import { useState, ChangeEvent, useRef } from 'react'
import {BsClipboard, BsClipboardCheck, BsEyeSlash, BsEye, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from "react-icons/bs";
import './App.css'

interface passwordConfiguration {
  length: number,
  copied: boolean,
  show: boolean,
  hasCapital: boolean,
  hasLowercase: boolean,
  hasNumber: boolean,
  hasSpecial: boolean
}

interface passwordErrors {
  length: string,
}


function App() {
  const [passwordDetails, setPasswordDetails] = useState<passwordConfiguration>({length: 8, copied: false, show: false, hasCapital: true, hasLowercase: true, hasNumber:true, hasSpecial:true});
  const [error, setError] = useState<passwordErrors>({length: ""});
  const [password, setPassword] = useState<string>('');
 


  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(prev=>({
      ...prev,
      [name]: ""
    }))
    if(isNaN(Number(value))) setError(prev=>({
      ...prev,
      [name]: "You must enter a valid number"
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

  const handleLengthBtn = (num:number) => {
    
    setError(prev=>({
      ...prev,
      length: ""
    }))
   
    if(passwordDetails.length <= 4 && Number(num) === -1) return;
    setPasswordDetails(prev => ({
      ...prev,
      length: Number(passwordDetails.length) + Number(num)
  }))
}

const handleCapital = ()=> {
  if(!passwordDetails.hasLowercase && !passwordDetails.hasNumber && !passwordDetails.hasSpecial) return
  setPasswordDetails(prev => ({
    ...prev,
    hasCapital: !passwordDetails.hasCapital
}))
}

const handleLowercase = ()=> {
  if(!passwordDetails.hasCapital && !passwordDetails.hasNumber && !passwordDetails.hasSpecial) return
  setPasswordDetails(prev => ({
    ...prev,
    hasLowercase: !passwordDetails.hasLowercase
}))
}

const handleNumbers = ()=> {
  if(!passwordDetails.hasCapital && !passwordDetails.hasLowercase && !passwordDetails.hasSpecial) return
  setPasswordDetails(prev => ({
    ...prev,
    hasNumber: !passwordDetails.hasNumber
}))
}

const handleSpecial = ()=> {
  if(!passwordDetails.hasCapital && !passwordDetails.hasLowercase && !passwordDetails.hasNumber) return
  setPasswordDetails(prev => ({
    ...prev,
    hasSpecial: !passwordDetails.hasSpecial
}))
}
  
  const handleShow = ()=> {
    setPasswordDetails(prev => ({
      ...prev,
      show: !passwordDetails.show
    }))
  }

 

  const generatePasswords = ()=> {
    //I use closures to keep track of passwords and make sure they are unique, while keeping the record secure
    //The useRef hook is used to store a mutable reference to the allPasswords variable and make sure that the saved values are preserved between renders.
    const allPasswords = useRef<string[]>([]);
    
    const generatePassword = ()=> {
      const capital = passwordDetails.hasCapital ? ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] : [];
      const lowercase = passwordDetails.hasLowercase ? ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] : [];
      const numbers = passwordDetails.hasNumber ? ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] : [];
      const special = passwordDetails.hasSpecial ? ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", ":", "/", "<", ">"] : [];
    
      const characters = [...capital, ...lowercase, ...numbers, ...special];
    
      let newPassword = '';
      const totalCharacters = passwordDetails?.length;
    
      for(let i = 1; i <=  totalCharacters; i++) {
        const character = characters[Math.floor(Math.random() * characters.length)]
        newPassword += character
      }
      //checking all characters are used
      if(passwordDetails.hasSpecial && !special.some(char=> newPassword.includes(char))){
        newPassword = newPassword.substring(0,(totalCharacters-1)) + special[Math.floor(Math.random() * special.length)]}
      if(passwordDetails.hasNumber && !numbers.some(char=> newPassword.includes(char))){
        newPassword = newPassword.substring(0,(totalCharacters-2)) + numbers[Math.floor(Math.random() * numbers.length)] + newPassword.substring(totalCharacters-1) }
      if(passwordDetails.hasLowercase && !lowercase.some(char=> newPassword.includes(char))){
        newPassword = newPassword.substring(0,(totalCharacters-3)) + lowercase[Math.floor(Math.random() * lowercase.length)] + newPassword.substring(totalCharacters-2) }
      if(passwordDetails.hasCapital && !capital.some(char=> newPassword.includes(char))){
        newPassword = newPassword.substring(0,(totalCharacters-4)) + capital[Math.floor(Math.random() * capital.length)] + newPassword.substring(totalCharacters-3) }
      if(passwordDetails.hasSpecial && !special.some(char=> newPassword.includes(char))){
          newPassword = newPassword.substring(0,(totalCharacters-1)) + special[Math.floor(Math.random() * special.length)]}
      if(passwordDetails.hasNumber && !numbers.some(char=> newPassword.includes(char))){
          newPassword = newPassword.substring(0,(totalCharacters-2)) + numbers[Math.floor(Math.random() * numbers.length)] + newPassword.substring(totalCharacters-1) }
      if(passwordDetails.hasLowercase && !lowercase.some(char=> newPassword.includes(char))){
          newPassword = newPassword.substring(0,(totalCharacters-3)) + lowercase[Math.floor(Math.random() * lowercase.length)] + newPassword.substring(totalCharacters-2) }
      if(passwordDetails.hasCapital && !capital.some(char=> newPassword.includes(char))){
          newPassword = newPassword.substring(0,(totalCharacters-4)) + capital[Math.floor(Math.random() * capital.length)] + newPassword.substring(totalCharacters-3) }
      
      if(allPasswords.current.includes(newPassword)) {generatePassword()
      } else {
        allPasswords.current.push(newPassword)
      }
              
      setPassword(newPassword)
      setPasswordDetails(prev => ({
        ...prev,
        copied: false
      }));
      }
  
      return generatePassword

  }

  const handleGeneratePassword = generatePasswords();

  const handleCopy = ()=>{
    setPasswordDetails(prev => ({
      ...prev,
      copied: true
    }));
    navigator.clipboard.writeText(password);

  }

  const validateParameters = ()=> {
    if(!isNaN(Number(passwordDetails.length)) && passwordDetails.length > 3) return true;
    return false
  }

 

  return (

      <div className='fondo'>
        <h1 className='title'>Create your secure password</h1>
        <div className='options'>
          <div>
            <div>How many characters should your password have?</div>
            <div className='errorMsn'>{error?.length}</div>
          </div>
          <div className='btnsDiv'>
            <BsFillArrowUpCircleFill className="arrowBtn" onClick={()=>handleLengthBtn(1)}/>
            <input  className={error?.length ? 'error' : 'noError'}  name="length" value={passwordDetails.length} onChange={handleChange}/>
            <BsFillArrowDownCircleFill className="arrowBtn" onClick={()=>handleLengthBtn(-1)}/>
          </div>
          
        </div>
        <div  className='optionsCharacters'>
          <div>Which characters do you want in your password?</div>
          
          <div className='options'>
              <div className={passwordDetails.hasCapital ? 'seleccionado' :'tachado'} onClick={handleCapital}>ABC</div>
              <div className={passwordDetails.hasLowercase ? 'seleccionado' :'tachado'} onClick={handleLowercase}>abc</div>
              <div className={passwordDetails.hasNumber ? 'seleccionado' :'tachado'} onClick={handleNumbers}>123</div>
              <div className={passwordDetails.hasSpecial ? 'seleccionado' :'tachado'} onClick={handleSpecial}>#@!</div>
          </div>
          
        </div>
        <div className='createPassDiv'>
          <div className='CreateBtn' onClick={validateParameters() ? handleGeneratePassword : ()=> {}}>Create</div>
          {password ?
          <div className='pass'>
            <div>{passwordDetails?.show ? password : "✱".repeat(password.length)} </div>
            <div className='btnsDiv'>
            {
              passwordDetails?.show ?
              <BsEye className="icon" onClick={handleShow}/> :
              <BsEyeSlash className="icon" onClick={handleShow}/>
            }
            {
              passwordDetails?.copied ?
              <BsClipboardCheck className="icon" /> :
              <BsClipboard onClick={handleCopy} className="icon"/>
            }
            </div>
          </div>
            :
            null
          }
        </div>
  
      </div>
   
  )
}

export default App
