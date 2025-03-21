import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/api/hello')
            .then(res => res.json())
            .then(data => setMessage(data.message))
    }, [])

    return (
        <div className="App">
            <h1>GDG Frontend</h1>
            <p>後端回傳：{message}</p>
        </div>
    )
}

export default App
