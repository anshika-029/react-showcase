import './App.css'
import { useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    gender: "",
    class: "",
  });

  const [card, setCard] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    setCard([...card, formData]); 
    setFormData({ name: "", email: "", message: "", gender: "", class: "" }); // reset
  }

  return (
    <div className="app-container">
      <h1 className="title">Form Handling App</h1>

      <form onSubmit={handleSubmit} className="form-container">

        <div className="form-group">
          <label htmlFor='username'>Name</label>
          <input 
            id='username'
            name='name'
            type='text'
            placeholder='Enter your name'
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input 
            id='email'
            name='email'
            type="email"
            placeholder='Enter your email'
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor='message'>Message</label>
          <textarea 
            id='message'
            name='message'
            placeholder='Any message for us...'
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor='gender'>Gender</label>
          <select
            id='gender'
            name='gender'
            required
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Choose</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <div className="radio-group">
            {["10th","12th","diploma","graduate","postgraduate","phd"].map((cls) => (
              <label key={cls}>
                <input
                  type="radio"
                  value={cls}
                  name="class"
                  required
                  checked={formData.class === cls}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                />
                {cls}
              </label>
            ))}
          </div>
        </div>

        <button type='submit' className="submit-btn">Submit</button>
      </form>

      <div className="cards-container">
        {card.map((data, index) => (
          <div key={index} className="card">
            <h2>{data.name}</h2>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Message:</strong> {data.message}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            <p><strong>Class:</strong> {data.class}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
