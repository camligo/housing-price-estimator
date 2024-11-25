import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [suburb, setSuburb] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/predict', { suburb, bedrooms, bathrooms });
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="Suburb" />
        <input type="number" value={bedrooms} onChange={(e) => setBedrooms(+e.target.value)} min={1} />
        <input type="number" value={bathrooms} onChange={(e) => setBathrooms(+e.target.value)} min={1} />

        <button type="submit">
          Predict Price
        </button>
      </form>
      {predictedPrice !== null && <h3>Predicted Price: ${predictedPrice.toFixed(2)}</h3>}
    </div>
  )
}

export default Form
