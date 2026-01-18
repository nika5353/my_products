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