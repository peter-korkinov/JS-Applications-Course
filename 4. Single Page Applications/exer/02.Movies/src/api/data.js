import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;
const get = api.get;
const post = api.post;
const put = api.put;
const del = api.del;

const endpoints = {
  movies: '/data/movies/',
  likes: '/data/likes'
};

async function getAllMovies() {
  return api.get(endpoints.movies);
}

async function getMovie(id) {
  return api.get(endpoints.movies + id);
}

async function getLikes(movieId) {
  return api.get(endpoints.likes + `?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
}

async function postNewMovieRecord(data) {
  return api.post(endpoints.movies, data)
}

async function postLike(id) {
  return api.post(endpoints.likes, id)
}

async function isUserlikedMovie() {

}

export {
  login,
  register,
  logout,
  get,
  post,
  put,
  del,
  getMovie,
  getAllMovies,
  getLikes,
  postNewMovieRecord,
  postLike
}