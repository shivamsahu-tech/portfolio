import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import sendMail from './sendEmail.js';
import { fetchGFG } from './fetcher/gfg.js';
import { fetchCodeChef } from './fetcher/codechef.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.post('/send-comment', async (req, res) => {
  try {
    const { email, comment } = req.body;
    if (!email || !comment) {
      return res.status(400).json({ message: 'Missing email or comment' });
    }

    await sendMail(email, comment)

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});


app.get("/fetch-codechef/:username", async (req, res) => {
  try {
    const data = await fetchCodeChef(req.params.username);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch CodeChef data" });
  }
});

app.get("/fetch-gfg/:username", async (req, res) => {
  try {
    const data = await fetchGFG(req.params.username);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch GFG data" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
