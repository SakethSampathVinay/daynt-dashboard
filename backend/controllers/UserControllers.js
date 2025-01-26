import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import UserDashboard from "../models/UserDashboard.js";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
    console.log(error);
  }
};

const getDashboard = async (req, res) => {
  try {
    const records = await UserDashboard.find({ userId: req.userId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard records",
      error: error.message,
    });
  }
};

const addDashboardRecords = async (req, res) => {
  const { name, dob } = req.body;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  try {
    const newRecord = await UserDashboard.create({
      userId: req.userId, // Use req.userId instead of req.body.userId
      name,
      dob,
      age,
    });

    res
      .status(201)
      .json({ message: "Record added successfully", record: newRecord });
  } catch (error) {
    console.error("Error adding dashboard record:", error.message);
    res
      .status(500)
      .json({ message: "Error adding record", error: error.message });
  }
};

const updateDashboardRecords = async (req, res) => {
  const { id } = req.params;
  const { name, dob } = req.body;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  try {
    const updatedRecord = await UserDashboard.findByIdAndUpdate(
      id,
      { name, dob, age },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Record updated successfully", record: updatedRecord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating record", error: error.message });
  }
};

const deleteDashboardRecords = async (req, res) => {
  const { id } = req.params;

  try {
    await UserDashboard.findByIdAndDelete(id);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting record", error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getDashboard,
  addDashboardRecords,
  updateDashboardRecords,
  deleteDashboardRecords,
};
