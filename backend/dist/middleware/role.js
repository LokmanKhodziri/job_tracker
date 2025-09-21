"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: "Forbidden: You don't have enough permissions" });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=role.js.map