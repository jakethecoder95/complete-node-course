const Product = require("./product");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    reauired: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true }
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCart = { items: [...this.cart.items] };
  const total = this.cart.total
    ? this.cart.total + product.price
    : product.price;
  updatedCart.total = total;

  if (cartProductIndex >= 0) {
    newQuantity = updatedCart.items[cartProductIndex].quantity + 1;
    updatedCart.items[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCart.items.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.getCart = function(cb) {
  return this.populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      return user.cart.items;
    });
};

userSchema.methods.removeFromCart = function(prodId) {
  let productPrice;
  const updatedCart = this.cart.items.filter(item => {
    return item.productId.toString() !== prodId.toString();
  });
  return Product.findById(prodId)
    .then(product => {
      productPrice = product.price;
      return productPrice;
    })
    .then(price => {
      console.log(price);
      this.cart.total -= price;
      this.cart.items = updatedCart;
      return this.save();
    });
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [], total: 0 };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
