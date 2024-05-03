"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        next(new Error('Unauthenticated User'));
    }
    else {
        next();
    }
}
exports.default = requireAuth;
