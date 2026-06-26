import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from '#config/database.js';
import potionRoutes from '#routes/potion.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Poçoes e Soluçoes API');
});

app.use('/api/potions', potionRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server up and running at http://localhost:${PORT}`);
    });
  }
  catch (error) {
    console.error('Could not start the server:', error);
  }
}

startServer();