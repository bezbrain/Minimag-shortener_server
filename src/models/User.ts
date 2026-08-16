import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export interface IUser {
  username: string;
  email: string;
  password: string;
  retypePassword: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  createJWT(): string;
  comparePassword(userPassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
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
        validator: function (password: string) {
          return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/.test(password);
        },
        message:
          "Password must contain at least one number, one special character, and one uppercase letter",
      },
    },

    retypePassword: {
      type: String,
      required: [true, "Please provide retype password"],
    },
  },
  { timestamps: true }
);

UserSchema.path("retypePassword").validate(function (value: string) {
  return this.password === value;
}, "Passwords do not match");

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre("save", async function () {
  this.retypePassword = this.password;
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_LIFETIME as SignOptions["expiresIn"] }
  );
};

UserSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default model<IUser, UserModel>("User", UserSchema);
