import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Item name is required."],
    minlength: 1,
    maxlength: 255,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const ShoppingListSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      required: [true, "Owner is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: [true, "Name of a list has been already used"],
      minlength: 1,
      maxlength: 255,
    },
    sys: {
      cts: { type: Date, default: Date.now },
      mts: { type: Date, default: Date.now },
      rev: { type: Number, default: 0 },
    },
    archived: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId, // Reference to the User schema for each member
        ref: "User",
      },
    ],

    items: [ItemSchema],
  },
  {
    versionKey: false, // Disable the version key (__v)
  }
);

// Create an index on the members array
ShoppingListSchema.index({ members: 1 });
// Create an index on the archived field
ShoppingListSchema.index({ archived: 1 });

ShoppingListSchema.path("members").validate(function (value) {
  return value.length <= process.env.MAX_MEMBERS_PER_LIST;
}, `You cannot have more than ${process.env.MAX_MEMBERS_PER_LIST} members in a shopping list`);

ShoppingListSchema.path("items").validate(function (value) {
  return value.length <= process.env.MAX_ITEMS_PER_LIST;
}, `You cannot have more than ${process.env.MAX_ITEMS_PER_LIST} items in a shopping list`);

ShoppingListSchema.pre("save", async function (next) {
  const maxLists = process.env.MAX_LISTS_PER_USER;
  const count = await this.model("ShoppingList").countDocuments({
    owner: this.owner,
  });

  if (count >= maxLists) {
    throw new Error(
      `Each user can only create up to ${maxLists} shopping lists.`,
      { cause: "MaxListsPerUserError" }
    );
  }

  next();
});

const ShoppingList = models.ShoppingList || model("ShoppingList", ShoppingListSchema);
export default ShoppingList;
