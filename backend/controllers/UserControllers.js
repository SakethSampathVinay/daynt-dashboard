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

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(token);

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
    console.log(error);
  }
};

const getDashboard = async (req, res) => {
  try {
    const records = await UserDashboard.find({ userId: req.userId });
    res.status(200).json({ success: true, records });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard records",
      error: error.message,
    });
  }
};

const addDashboardRecords = async (req, res) => {
  try {
    const { name, dob } = req.body;

    if (!dob) {
      return res
        .status(400)
        .json({ success: false, message: "Date of birth (dob) is required" });
    }

    const birthDate = new Date(dob);
    if (isNaN(birthDate)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format for dob" });
    }

    const currentYear = new Date().getFullYear();
    const birthYear = birthDate.getFullYear();
    const age = currentYear - birthYear;

    if (isNaN(age) || age < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid age calculated" });
    }

    const record = await UserDashboard.create({
      userId: req.userId,
      name,
      dob,
      age,
    });
    res
      .status(201)
      .json({ success: true, message: "Record added successfully", record });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding dashboard record",
      error: error.message,
    });
  }
};

const updateDashboardRecords = async (req, res) => {
  const { id } = req.params;
  const { name, dob } = req.body;

  const birthDate = new Date(dob);
  if (isNaN(birthDate)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid date format for dob" });
  }

  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const age = currentYear - birthYear;

  try {
    const updatedRecord = await UserDashboard.findOneAndUpdate(
      { _id: id, userId: req.userId }, // Ensure the record belongs to the user
      { name, dob, age },
      { new: true }
    );
    if (!updatedRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating record",
      error: error.message,
    });
  }
};

const deleteDashboardRecords = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecord = await UserDashboard.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!deletedRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting record",
      error: error.message,
    });
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
