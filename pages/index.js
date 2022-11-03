import { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '../styles/Home.module.css'

export default function Home({ todos }) {
  const [formValues, setFormValues] = useState({})
  const [error, setError] = useState()
  const [reqStatus, setReqStatus] = useState("")

  const router = useRouter()

//save login details to the formValues state  
  const onInputChange = e => {
    setFormValues(prev => ({...prev, [e.target.id]:e.target.value}))
  }

//handles signing in  
  const handleSignIn = async (e) => {
    e.preventDefault()
    setError("")
    setReqStatus("loading...")

    try {
      const response = await axios.post("/api/signin", formValues)
      localStorage.setItem("artify_id", response.data.id);
      router.push('/studio')
    } catch (error) {
      setError(error)
    } finally {
      setReqStatus("")
    }
  }

  return (
    <div className={styles.container}>
      <h3>Sign in to create artworks</h3>
      <form>
        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={e => onInputChange(e)} required />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={e => onInputChange(e)} required />
        </div>
        <button onClick={handleSignIn}>Sign in</button>
      </form>
      {error && <p>{error.response?.data.message || "An error occurred, please try again"}</p>}
      {reqStatus && <p>{reqStatus}</p>}
    </div>
  )
}