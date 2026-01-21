// export const API_BASE = "http://localhost:9090"; // change for production

// export const API = {
//   AUTH: {
//     LOGIN: `${API_BASE}/auth/user/login`,
//     REGISTER: `${API_BASE}/auth/user/register`,
//   },

//   ADMIN: {
//     REGISTER: `${API_BASE}/admin/register`,
//   },

//   MOVIES: {
//     GET_ALL: `${API_BASE}/movies/all-movies`,
//     GET_BY_GENRE: (genre) => `${API_BASE}/movies/genre/${genre}`,
//     GET_BY_NAME: (name) => `${API_BASE}/movies/name/${name}`,
//     ADD: `${API_BASE}/movies/addMovie`,
//     UPDATE: (id) => `${API_BASE}/movies/update/${id}`,
//     DELETE: (id) => `${API_BASE}/movies/delete/${id}`,
//   },

//   THEATERS: {
//     GET_BY_LOCATION: (location) => 
//   `${API_BASE}/theaters/getTheaterByLocation?location=${location}`,
//     ADD: `${API_BASE}/theaters/addTheater`,
//     UPDATE: (id) => `${API_BASE}/theaters/updateTheater/${id}`,
//     DELETE: (id) => `${API_BASE}/theaters/delete/${id}`,
//   },

//   SHOWS: {
//     GET_ALL: `${API_BASE}/shows/getShows`,
//     GET_BY_MOVIE: (movieId) => `${API_BASE}/shows/movie/${movieId}`,
//     GET_BY_THEATER: (theaterId) => `${API_BASE}/shows/theater/${theaterId}`,
//     ADD: `${API_BASE}/shows/addShow`,
//     UPDATE: (id) => `${API_BASE}/shows/updateShow/${id}`,
//     DELETE: (id) => `${API_BASE}/shows/deleteShow/${id}`,
//   },

//   BOOKINGS: {
//     CREATE: `${API_BASE}/bookings/createBooking`,
//     GET_BY_USER: (userId) => `${API_BASE}/bookings/getUserBooking/${userId}`,
//     GET_BY_SHOW: (showId) => `${API_BASE}/bookings/getShowsBooking/${showId}`,
//     CONFIRM: (bookingId) => `${API_BASE}/bookings/${bookingId}/confirm`,
//     CANCEL: (bookingId) => `${API_BASE}/bookings/${bookingId}/cancel`,
//     GET_BY_STATUS: (status) => `${API_BASE}/bookings/getBookingsByStatus/${status}`,
//   },

//   USERS: {
//     GET_ALL: `${API_BASE}/users/getAll`,
//     DELETE: (id) => `${API_BASE}/users/delete/${id}`,
//     MAKE_ADMIN: (id) => `${API_BASE}/users/makeAdmin/${id}`,
//   }
// };

// export default API;