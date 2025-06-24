import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).send("Pong! Server is alive 🧠");
});

export default router;
