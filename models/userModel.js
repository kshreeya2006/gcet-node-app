import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
// const user = mongoose.model("User", userSchema);

export default mongoose.model("User", userSchema);