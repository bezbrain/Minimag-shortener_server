const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      trim: true,
      minlength: [3, "Username characters cannot be less than 3"],
      maxlength: [15, "Username character cannot be more than 15"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Please provide email"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password character cannot be less than 6"],
      validate: {
        validator: function (password) {
          // Password must contain at least one number, one special character, and one uppercase letter
          return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/.test(password);
        },
        message:
          "Password must contain at least one number, one special character, and one uppercase letter",
      },
    },

    retypePassword: {
      type: String,
      required: [true, "Please provide retype password"],
      // minlength: [6, "Password character cannot be less than 6"],
    },
  },
  { timestamps: true }
);

// Check if password and retype password are the same
UserSchema.path("retypePassword").validate(function (value) {
  return this.password === value;
}, "Passwords do not match");

// Hash the password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Hash the retypePassword
UserSchema.pre("save", async function () {
  this.retypePassword = this.password;
});

// Generate secret (Used this to generate the one time jwt secret)
function generateJwtSecret(length = 64) {
  const jwtSecret = crypto.randomBytes(length).toString("hex");
  // console.log(jwtSecret);
  return jwtSecret;
}

// Sign a user using JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Compare password
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
