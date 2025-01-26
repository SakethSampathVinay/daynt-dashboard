import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  dob: { type: Date, require: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
export default Dashboard;
