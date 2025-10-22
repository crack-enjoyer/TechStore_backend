const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { main } = require('./scripts/sync');

const goodsRoutes = require('./routes/goods');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/goods', goodsRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    await main({
      sync: true,
      force: true
    });

    app.listen(config.port, () => {
      console.log(`Goods service listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();