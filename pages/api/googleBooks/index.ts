
import axios from 'axios'


export default async function handle(req, res) {

  try {
    let searchTerm = req.body.searchTerm;
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    const maxResults = 15;

    axios.defaults.headers.common['Content-Encoding'] = 'gzip'
    axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'
    axios.defaults.headers.common['Accept'] = '*/*'
    axios.defaults.headers.common['Accept-Encoding'] = 'gzip;q=0,deflate;q=0'

    // const apiKey = "AIzaSyC2AyKX4OZ6b8zy1bO4GdMQG_8sG1SptHI";
    // let url = "https://www.googleapis.com/books/v1/volumes?q="+ query + "&key=" + apiKey;

    const result = await axios.get(`${API_URL}?maxResults=${maxResults}&q=${searchTerm}`)
      
   res.json(result.data)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}





// export default async function handle(req, res) {

//   try {
//     let searchTerm = req.body.searchTerm;
//     let API_URL = `https://www.googleapis.com/books/v1/volumes`;

//     // console.log(result.data)
//     // axios.defaults.headers.common['Content-Encoding'] = 'gzip'
//     axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'
//     axios.defaults.headers.common['Accept'] = '*/*'
//     const apiKey = "AIzaSyC2AyKX4OZ6b8zy1bO4GdMQG_8sG1SptHI";
//     // axios.defaults.headers.common['Accept-Encoding'] = 'gzip;q=0,deflate;q=0'
//     // console.log(axios.defaults.headers)

//       const result = await axios.get(`${API_URL}?q=${searchTerm}`);


//       console.log(result.data)
//    res.json(result.data)

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// }