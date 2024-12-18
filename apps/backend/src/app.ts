import express from 'express';
const app = express();
app.use(express.json());

app.post('/upload', async (req, res) => {
    res.status(200).send({ taskId: 'unique-task-id' });
});

app.get('/task/:id/status', async (req, res) => {
    res.status(200).send({ status: 'processing' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
