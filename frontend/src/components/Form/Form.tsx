import axios from "axios";
import { useEffect, useState } from "react";
import "./Form.css"

const Form = () => {
  const [suburb, setSuburb] = useState('');
  const [rooms, setRooms] = useState<number | ''>('');
  const [bathrooms, setBathrooms] = useState<number | ''>('');
  const [suburbs, setSuburbs] = useState<string[]>([])
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchSuburbs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/suburbs');
        setSuburbs(response.data.suburbs);
      } catch (err) {
        setError('Failed to fetch suburbs.');
        console.error(err);
      }
    }
    fetchSuburbs();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!suburb || !rooms || !bathrooms ) {
      setError("Please fill in all fields.")
      return;
    }

    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        suburb,
        rooms: Number(rooms),
        bathrooms: Number(bathrooms)
      });
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      setError("Something went wrong, try again.")
      console.error(err);
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit} className="formContainer">

        <label>Select suburb:</label>
        <select value={suburb} onChange={(e) => setSuburb(e.target.value)}>
          <option value="">-</option>
          {suburbs.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <label>Number of rooms:</label>
        <input
          type="number"
          value={rooms}
          onChange={(e) => setRooms(+e.target.value)}
          min={1}
        />

        <label>Number of bathrooms:</label>
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(+e.target.value)}
          min={1}
        />

        <button type="submit">
          Predict price
        </button>
      </form>

      {error && <p>{error}</p>}

      {predictedPrice !== null && (
        <h3>Predicted price: ${predictedPrice.toFixed(2)}</h3>
      )}
    </div>
  )
}

export default Form
