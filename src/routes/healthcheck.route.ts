import express from "express";

const router = express.Router();

router.get("/check",(req, res, next) =>
res.status(200).json({ hello: 'world' })
);
export default router;
