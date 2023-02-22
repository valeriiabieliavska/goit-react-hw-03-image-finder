import axios from 'axios';

const KEY = '31704253-3506fb69b26df966a85a65283';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (value, pageNumber) => {
  const response =
    await axios.get(`${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&
safesearch=true&page=${pageNumber}&per_page=12`);
  return response.data;
};





// import axios from 'axios';

// const KEY = '31704253-3506fb69b26df966a85a65283';
// const BASE_URL = 'https://pixabay.com/api/';


//  export async function fetchImages(searchQuery, pageNumber) {
//     try {
//         const resp = await axios.get(BASE_URL, {
//             params: {
//                 key: KEY,
//                 q: searchQuery,
//                 image_type: 'photo',
//                 orientation: 'horizontal',
//                 safesearch: 'true',
//                 page: pageNumber,
//                 per_page: '12',
//             }
//         })
//         return resp.data
//     } catch (error) {
//         console.log(error);
//     }
// }
