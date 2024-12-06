const jwt = require("jsonwebtoken");
const Role = require("../models/roles");
const Permission = require("../models/permissions");

module.exports = checkPermissions = (requiredPermissions) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const userRole = await Role.findById(req.user.role).populate(
        "permissions"
      );

      if (!userRole) {
        return res.status(404).json({ error: "Role not found" });
      }

      const userPermissions = userRole.permissions.map((p) => p.name);

      const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ error: "Access denied: insufficient permissions" });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
