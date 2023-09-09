let apiEndpoint;

if (process.env.NODE_ENV === 'production') {
  apiEndpoint = 'https://nineideasapi.fly.dev/api'; // Your production API URL
} else {
  apiEndpoint = 'https://nineideasapi.fly.dev/api' //'http://localhost:3000/api'; // Your local development API URL
}

export default apiEndpoint;
