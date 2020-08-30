const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require ('./app');

// Heroku settings
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));