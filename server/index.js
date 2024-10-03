const express = require('express');
const cors = require('cors');
const app = express();

const testNote1 = {
    title: "test.md",
    content: "the mitochondria is the powerhouse of the cell"
}

const testNote2 = {
    title: "math.md",
    content: "5 + 3 = 8"
}

let dummyNotes = [testNote1, testNote2];

app.use(cors());
app.use(express.json());

// Example route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to ScribeIQ backend!' });
});

app.get('/notes', (req, res) => {
    res.json({ notes: dummyNotes})
})

app.put('/notes/:noteId', (req, res) => {
    console.log(req.params.noteId);
    console.log(req.body)
    dummyNotes[req.params.noteId] = req.body;
    res.send('Note updated successfully!');
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));