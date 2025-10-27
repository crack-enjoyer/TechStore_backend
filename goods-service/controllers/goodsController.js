const { Goods } = require('../db/init');

async function createGood(req, res) {
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ message: 'name and price required' });

  try {
    const g = await Goods.create({ name, price });
    return res.status(201).json({ good: g });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal error' });
  }
}

async function listGoods(req, res) {
  try {
    const items = await Goods.findAll();
    return res.json({ goods: items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal error' });
  }
}

module.exports = { createGood, listGoods };
