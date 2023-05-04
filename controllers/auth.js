import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/** REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(); // generate random salt to encrypt password
    const passwordHash = await bcrypt.hash(password, salt); // encrypt password

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save(); // save user to database
    res.status(201).json(savedUser); // send user back to client
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** LOGIN USER */
export const login = async (req, res) => {
  try {
    // take input from the req.body
    // create salt and hash the password
    // check if user exists
    // check if password is correct
    // create a token
    // send token to client

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // we wanna make sure that the password is not sent back to the client
    res.status(200).json({ user, token });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
