import Product from "../models/Product.js";

export async function addProduct(req, res) {
  const { name, price } = req.body;
  const thumbnail = req.file ? req.file.filename : null;

  const product = await Product.create({
    name,
    price,
    thumbnail,
    owner: req.userId,
  });

  res.json(product);
}

export async function getUserProducts(req, res) {
  const products = await Product.find({ owner: req.params.userId });
  res.json(products);
}

export async function getMyProducts(req, res) {
  const products = await Product.find({ owner: req.userId });
  res.json(products);
}

export async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (String(product.owner) !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await product.deleteOne();
  res.json({ message: "Deleted", id: product._id });
}