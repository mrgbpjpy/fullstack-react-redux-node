import app from './app.js';

const PORT = process.env.PORT || 5000;

console.log("BOOT DATABASE_URL =", process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
