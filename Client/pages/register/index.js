import { useRouter } from "next/router"
import { useState } from "react"
import styles from "../../styles/styles.module.css"

export default function SignIn() {
    const router = useRouter()

    const [state, setState] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e) {
        const copy = { ...state }
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    async function handleSubmit() {
        console.log(JSON.stringify(state))
        const res = await fetch('http://34.116.133.168:3000/auth/register', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            const json = await res.json()
            console.log(json);
        } else {
            console.log(res);
            alert("Bad credentials")
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Sign Up</h1>
                <div className={styles.form}>
                    <input className={styles.input} type="text" name="name" placeholder="name" value={state.name} onChange={handleChange} />
                    <input className={styles.input} type="text" name="email" placeholder="email" value={state.email} onChange={handleChange} />
                    <input className={styles.input} type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
                    <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}