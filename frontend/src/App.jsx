import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Fetch all data when component mounts
  useEffect(() => {
    fetchData()
  }, [])

  // Fetch data from MongoDB
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/data')
      console.log("🚀 ~ fetchData ~ response:", response)
      const result = await response.json()
      if (result.success) {
        setAllData(result.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("working");
    
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:8000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      console.log("🚀 ~ handleSubmit ~ response:", response)

      const result = await response.json()

      if (result.success) {
        setMessage('✅ Data added successfully!')
        setFormData({ name: '', email: '', message: '' })
        fetchData() // Refresh the data list
      } else {
        setMessage(`❌ Error: ${result.message}`)
      }
    } catch (error) {
      setMessage('❌ Network error. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MongoDB Atlas Data Manager</h1>
        <p>Add and view data in your "smit-project" database</p>
      </header>

      <main className="App-main">
        {/* Add Data Form */}
        <section className="form-section">
          <h2> Add New Data</h2>
          <form onSubmit={handleSubmit} className="data-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Enter your message"
                rows="4"
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Adding...' : 'Add Data to MongoDB'}
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </section>

        {/* Display All Data */}
        <section className="data-section">
          <h2>All Data from MongoDB</h2>
          <button onClick={fetchData} className="refresh-btn">
            🔄 Refresh Data
          </button>
          
          {allData.length === 0 ? (
            <p className="no-data">No data found. Add some data using the form above!</p>
          ) : (
            <div className="data-grid">
              {allData.map((item) => (
                <div key={item._id} className="data-card">
                  <h3>{item.name}</h3>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                  <small>Created: {new Date(item.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
