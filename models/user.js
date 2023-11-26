import { Schema, model, models } from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    // id is generated automatically
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username has been already used."],
      minlength: 1,
      maxlength: 255,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email has been already used."],
      match: [/.+\@.+\..+/, "Please fill a valid email address."],
    },
    passwordHash: {
      type: String,
      validate: {
        validator: function (password) {
          // Regex for password validation
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}$/.test(
            password
          );
        },
        message: (props) =>
          `${props.value} is not a valid password. Password must be 8-128 characters long, including at least one uppercase letter, one lowercase letter, one digit, and one special character.`,
      },
    },
    image: {
      type: String,
      default: "https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"
    },
    sys: {
      cts: { type: Date, default: Date.now },
      mts: { type: Date, default: Date.now },
      rev: { type: Number, default: 0 },
    },
  },
  {
    versionKey: false, // Disable the version key (__v)
  }
);

UserSchema.pre("save", async function (next) {
  if (this.passwordHash && this.isModified("passwordHash")) {
    const password = await bcrypt.hash(this.passwordHash, 12);
    this.passwordHash = password;
  }
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
