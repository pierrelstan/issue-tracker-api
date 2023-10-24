import express from "express";
import protect from "../middleware/auth.middleware";
import {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    createTicket,
    inviteToProject,
    acceptInvite,
} from "../controllers/project.controller";

const router = express.Router();

router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);

router.post("/", protect, createProject);
router.post("/:id/tickets", protect, createTicket);

router.put("/:id", protect, updateProject);
router.put("/:id/invite", protect, inviteToProject);
router.put("/:id/accept-invite", protect, acceptInvite);

router.delete("/:id", protect, deleteProject);

// module.exports = router
export = router;
