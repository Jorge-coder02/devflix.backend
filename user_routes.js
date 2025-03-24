const express = require("express");
const router = express.Router();
const User = require("./User.js");
const jwt = require("jsonwebtoken");

// Rutas
router.get("/", (_, res) => {
  res.send("Devflix backend working 🚀");
});

// 👤 Registro
router.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  // ❌ Validar campos vacíos
  if (name === "") {
    return res.status(400).json({ message: "Name is required" });
  } else if (email === "") {
    return res.status(400).json({ message: "Email is required" });
  } else if (password === "") {
    return res.status(400).json({ message: "Password is required" });
  } else if (age === "") {
    return res.status(400).json({ message: "Age is required" });
  }

  // 👤❌ Validar si el usuario ya existe
  const user = await User.findOne({ email }).catch((error) =>
    res
      .status(400)
      .json({ err: "Internal server error", message: error.message })
  );

  if (user) {
    return res.status(400).json({ err: "User already exists" });
  }

  // ✅ Crear un nuevo usuario
  try {
    const newUser = new User({
      nombre: name,
      email: email,
      password: password,
      age: age,
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ err: "Internal server error", message: error.message });
  }
});

// 👤 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // ❌ Validar email y password
  if (email === "") {
    return res.status(400).json({ message: "Email is required" });
  } else if (password === "") {
    return res.status(400).json({ message: "Password is required" });
  }

  // ✅ Comparar email y password con la base de datos
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    if (user.password === password) {
      // // Generar el JWT (token de autenticación)
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(400).json({ err: "Incorrect password" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ err: "Internal server error", message: error.message });
  }
});

module.exports = router;
