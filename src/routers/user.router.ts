
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({test:"GET /users"});
});

router.post("/", (req, res) => {
    res.json({test:"POST /users"});
});

// router.put("/", (req, res) => {
//     res.json({test:"PUT /users"});
// });

export default router;