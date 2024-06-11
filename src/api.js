import axios from 'axios';

const API_URL = 'http://your-api-url.com/api'; // Replace with your API base URL

// Set up a global configuration for axios
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await axios.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle user registration
export const register = async (email, password) => {
  try {
    const response = await axios.post('/register', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to fetch content
export const fetchContent = async () => {
  try {
    const response = await axios.get('/content');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to add new content
export const addContent = async (title, content) => {
  try {
    const response = await axios.post('/content', { title, content });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to edit existing content
export const editContent = async (id, title, content) => {
  try {
    const response = await axios.put(`/content/${id}`, { title, content });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to fetch comments for a specific content item
export const fetchComments = async (contentId) => {
  try {
    const response = await axios.get(`/comments/${contentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to add a new comment to a content item
export const addComment = async (contentId, comment) => {
  try {
    const response = await axios.post(`/comments/${contentId}`, { comment });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle likes
export const likeContent = async (contentId) => {
  try {
    const response = await axios.post(`/likes/${contentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to rate content
export const rateContent = async (contentId, rating) => {
  try {
    const response = await axios.post(`/ratings/${contentId}`, { rating });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
