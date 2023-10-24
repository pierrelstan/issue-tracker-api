import {
    logout,
    updateUser,
    validateUser,
} from "../controllers/user.controller";
import express from "express";
import {
    register,
    login,
    deleteUser,
    getUsers,
} from "../controllers/user.controller";
import protect from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getUsers);
router.post("/validate", protect, validateUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

router.post("/signup", register);
router.post("/signin", login);
router.post("/signout", logout);

// module.exports = router
export = router;
