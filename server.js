const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
    process.env.MONGODB_URL || "mongodb://localhost/resturant-lalala-db",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );

  const food = mongoose.model(
    "foods",
    new mongoose.Schema({
      _id: { type: String, default: shortid.generate },
      name: String,
      description: String,
      image: String,
      price: Number,
      availabletypes: [String],
    })
  );
  app.get("/api/foods", async (req, res) => {
    const foods = await food.find({});
    res.send(foods);
  });
  app.post("/api/foods", async (req, res) => {
    const newfood = new food(req.body);
    const savedfood = await newfood.save();
    res.send(savedfood);
  });
  
  app.delete("/api/foods/:id", async (req, res) => {
    const deletedfood = await food.findByIdAndDelete(req.params.id);
    res.send(deletedfood);
  });
  const Order = mongoose.model(
    "order",
    new mongoose.Schema(
      {
        _id: {
          type: String,
          default: shortid.generate,
        },
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
          {
            _id: String,
            name: String,
            price: Number,
            count: Number,
          },
        ],
      },
      {
        timestamps: true,
      }
    )
  );
  app.post("/api/orders", async (req, res) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
  });
  app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  });

  const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));