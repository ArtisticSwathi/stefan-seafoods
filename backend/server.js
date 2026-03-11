const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://swathisns2004_db_user:SObuyBGSxXyK7NBL@ac-w2vxxlt-shard-00-00.rhfcprg.mongodb.net:27017,ac-w2vxxlt-shard-00-01.rhfcprg.mongodb.net:27017,ac-w2vxxlt-shard-00-02.rhfcprg.mongodb.net:27017/stefanseafoods?ssl=true&replicaSet=atlas-kj3giv-shard-0&authSource=admin&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Cloud!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  img: String,        // ← fixed: was "image", should be "img"
  category: String,
  inStock: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

const initialProducts = [
  { id: 1, name: 'Fresh Salmon', price: 1800, img: '/fish1.jpg', category: 'fish', inStock: true },
  { id: 2, name: 'King Prawns', price: 950, img: '/fish2.jpg', category: 'prawn', inStock: true },
  { id: 3, name: 'Sea Bass', price: 1200, img: '/fish3.jpg', category: 'fish', inStock: false },
  { id: 4, name: 'Blue Lobster', price: 3500, img: '/fish4.jpg', category: 'crab', inStock: true },
  { id: 5, name: 'Mud Crab', price: 1200, img: '/fish5.jpg', category: 'crab', inStock: true },
  { id: 6, name: 'Fresh Squid', price: 600, img: '/fish6.jpg', category: 'fish', inStock: false },
  { id: 7, name: 'White Pomfret', price: 1400, img: '/fish7.jpg', category: 'fish', inStock: true }
];

app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(initialProducts);
    res.send('✅ Database Seeded Successfully!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const productsFromDB = await Product.find();
    res.json(productsFromDB);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Toggle stock ON/OFF
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.inStock = !product.inStock;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock status' });
  }
});

// ✅ NEW: Update price and image
app.put('/api/products/:id/details', async (req, res) => {
  try {
    const { price, img } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { price: Number(price), img: img },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🐟 Stefan Sea Foods Server running on http://localhost:${PORT}`);
});