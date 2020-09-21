import React, {useEffect} from 'react'
import axios from 'axios'
function Main() {
  useEffect(()=>{
    localStorage.removeItem('courses')
  },[])
  const getAuthModal  = async() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get('/api/auth', config)
    window.location.href = res.data.authUrl
  }
  return (
    <div className='ButtonParent'>
      <button
      className="Button"
      onClick={getAuthModal}>
        Google login
      </button>
    </div>
  )
}

export default Main
