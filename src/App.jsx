import {  useCallback, useEffect, useRef, useState } from "react"

export default function App(){

  const [password,setPassword] = useState('')
  const [length, setLength] = useState(7)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeChars, setIncludeChars] = useState(false)
  const [copied, setCopied] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let mix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const num = '0123456789'
    const char = '`~!@#$%^&*(){}_-:;"\'><,./?'
    if( includeNumbers) mix = mix+num
    if( includeChars) mix = mix+char
  
    for(let i = 0; i<length; i++){
      let index = Math.floor(Math.random()*mix.length) 
      pass = pass + mix[index]
    }
    setPassword(pass)
  },[length,includeNumbers,includeChars])

  const passwordRef = useRef(null)

  function copyhandler(){
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }

useEffect(() => {
  passwordGenerator()
},[passwordGenerator])     

  return(
    <div className="bg-slate-900 min-h-screen flex justify-center items-center p-5" >
      <div className="bg-gray-500 p-5 rounded-4xl">
        <div className="flex">
            <input className="bg-white w-50 h-10 rounded-l-2xl px-3 py-2 " ref={passwordRef} readOnly value ={password} />
            <button className="w-15 bg-blue-400 rounded-r-2xl mx-auto " onClick={copyhandler} >{copied ? 'copied' : 'copy'}</button>
        </div>
        <div className="flex flex-col justify-center  items-center gap-x-4">
            <input type="range" value={length} min={7} max={20} onChange={(e)=>{setLength(e.target.value)}} className="bg-gray-900 w-40 px-3 py-2"/>
            <div> {length} </div>

            <label htmlFor="numbers"> Numbers </label>
            <input type="checkbox" checked={includeNumbers} name="numbers" onChange={()=> setIncludeNumbers((prev)=> !prev)} />
            
            <label htmlFor="chars"> Special characters </label>
            <input type="checkbox" checked={includeChars} name="chars" onChange={()=> setIncludeChars((prev)=> !prev) }/>
        </div>
      </div>


    </div>
  )
}