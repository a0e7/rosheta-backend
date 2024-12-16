const jwt = require("jsonwebtoken");
const Role = require("../models/roles");
const Permission = require("../models/permissions");
require("dotenv").config();

module.exports = checkPermissions = () => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing!" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing!" });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      // const userRole = await Role.findById(req.user.role).populate(
      //   "permissions"
      // );

      // if (!userRole) {
      //   return res.status(404).json({ error: "Role not found" });
      // }

      // const userPermissions = userRole.permissions.map((p) => p.name);

      // const hasPermission = requiredPermissions.every((permission) =>
      //   userPermissions.includes(permission)
      // );

      // if (!hasPermission) {
      //   return res
      //     .status(403)
      //     .json({ error: "Access denied: insufficient permissions" });
      // }

      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
