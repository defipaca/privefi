import express from 'express';
import cors from 'cors';
import { FaucetEngine } from './index';

const app = express();
const port = process.env.FAUCET_PORT || 3001;

app.use(cors());
app.use(express.json());

const faucet = new FaucetEngine(
  parseInt(process.env.FAUCET_DAILY_LIMIT || '500'),
  process.env.FAUCET_MINT || 'TESTUSD'
);

// Mint endpoint
app.post('/api/mint', async (req, res) => {
  const { address, amount } = req.body;

  if (!address || !amount) {
    return res.status(400).json({ error: 'Address and amount required' });
  }

  const result = await faucet.mint(address, amount);
  
  if (!result.success) {
    return res.status(400).json({ error: result.error?.message });
  }

  res.json({
    ok: true,
    newBalance: result.data?.newBalance,
    receipt: result.data?.receipt
  });
});

// Balance endpoint
app.get('/api/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = faucet.getBalance(address);
  
  res.json({ address, balance });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Faucet server running on port ${port}`);
});