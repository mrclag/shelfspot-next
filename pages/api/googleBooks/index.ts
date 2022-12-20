
import axios from 'axios'


export default async function handle(req, res) {

  try {
    const {searchTerm, page, maxResults } = req.body
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    const startIndex = page * maxResults;

    axios.defaults.headers.common['Content-Encoding'] = 'gzip'
    axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'
    axios.defaults.headers.common['Accept'] = '*/*'
    axios.defaults.headers.common['Accept-Encoding'] = 'gzip;q=0,deflate;q=0'

    const result = await axios.get(`${API_URL}?maxResults=${maxResults}&startIndex=${startIndex}&q=${searchTerm}`)
      
   res.json(result.data)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

