
import axios from 'axios'


export default async function handle(req, res) {

  try {
    let searchTerm = req.body.searchTerm;
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    let maxResults = 15
    

    const result = await axios.get(`${API_URL}?maxResults=${maxResults}&q=${searchTerm}`)

    res.json(result.data)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}



