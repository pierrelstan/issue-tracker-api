import { getTicketComment } from "../controllers/ticket.controller";
import express from "express";
import protect from "../middleware/auth.middleware";
import {
    createTicketComment,
    deleteTicket,
    getTicketById,
    getUserTickets,
    updateTicketById,
} from "../controllers/ticket.controller";

const router = express.Router();

router.get("/", protect, getUserTickets);
router.get("/:id", protect, getTicketById);
router.put("/:id", protect, updateTicketById);
router.delete("/:id", protect, deleteTicket);
router.post("/:id/comments", protect, createTicketComment);
router.get("/:id/comments/:commentId", protect, getTicketComment);

// module.exports = router
export = router;
