import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword]=useState('')

  const[isLogin, setIsLogin]=useState(false)

useEffect(()=>{
  toast.info('please Login')
},[])
 useEffect(()=>{
  if(isLogin){
    toast.success("Login Sucess")
  }
 },[isLogin])


  function handleLogin(e){
    e.preventDefault()
   
     if(email==='daya@gmail.com' && password==='Daya@123'){
      setIsLogin(true)
    }

      else if(email==='' || password===''){
      toast.warn('plese Enter Email and password')
    }

   
  
    else{
      toast.error("Check credenshill")
    }
  }

  return (
    <>
    <form onSubmit={handleLogin}>
      <input type='email' name='emal' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

      <button type='submit'>Login</button>
      </form>
      
       <ToastContainer />
    </>
  )
}

export default App
