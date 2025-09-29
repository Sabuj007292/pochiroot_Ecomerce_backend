// import User from "../../models/User.js"; // adjust path if needed

// // @desc    Get user profile
// // @route   GET /api/profile
// // @access  Private
// export const getProfile = async (req, res) => {
//   console.log("🔍 GET /api/profile hit");
//   console.log("👤 Authenticated user ID:", req.user?._id);

//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) {
//       console.log("❌ User not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("✅ User found:", user);
//     res.json(user);
//   } catch (err) {
//     console.error("💥 Error in getProfile:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/profile
// // @access  Private
// export const updateProfile = async (req, res) => {
//   console.log("✏️ PUT /api/profile hit");
//   console.log("📦 Request body:", req.body);

//   try {
//     const { name, email, address, phone } = req.body;

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       console.log("❌ User not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;

//     const updatedUser = await user.save();
//     console.log("✅ User updated:", updatedUser);

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email
//     });
//   } catch (err) {
//     console.error("💥 Error in updateProfile:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// controllers/profileController/profileController.js
export const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};

export const updateProfile = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email} = req.body;

  req.user.name = name || req.user.name;
  req.user.email = email || req.user.email;

  req.user
    .save()
    .then((updatedUser) => {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    })
    .catch((err) => {
      console.error("💥 Error in updateProfile:", err.message);
      res.status(500).json({ message: "Server error" });
    });
};