import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";


const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 200,
  },
  profession: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashing password before saving
userSchema.pre('save', async function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

//matching password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User


