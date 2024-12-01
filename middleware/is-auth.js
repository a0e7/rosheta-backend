const jwt = require("jsonwebtoken");
const Role = require("../models/roles");
const Permission = require("../models/permissions");

module.exports = checkPermissions = (requiredPermissions) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from the header

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    try {
      // Verify JWT token and extract user data
      const decoded = await jwt.verify(token, "your-secret-key");
      req.user = decoded; // Attach decoded token info (role, userId) to request

      // Fetch the user's role and its associated permissions
      const userRole = await Role.findById(req.user.role).populate(
        "permissions"
      );

      if (!userRole) {
        return res.status(404).json({ error: "Role not found" });
      }

      const userPermissions = userRole.permissions.map((p) => p.name);

      // Check if the user has all the required permissions
      const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ error: "Access denied: insufficient permissions" });
      }

      next(); // User is authorized, proceed to the route handler
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

// Example of protecting a route based on permissions
// app.post(
//   "/create-prescription",
//   checkPermissions(["create prescription"]),
//   (req, res) => {
//     res.json({ message: "Prescription created" });
//   }
// );
