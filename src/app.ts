import express from "express";

const app = express();

app.get('/', async(req,res) => {
    res.json({
        success: true,
        message: "running successfully"
    });
});

export default app;