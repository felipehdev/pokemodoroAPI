const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: Number,
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pokemons: Array,
  },
  {
    timestamps: true,
  }
);

mongoose.model("User", userSchema);
