const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs')

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
    testSaveToFile();
});

app.get('/notes', (req, res) => {
    const note_files = fs.readdirSync(`${__dirname}/notes`);

    notes = []

    note_files.forEach((file) => {
        let title = file;
        let content = fs.readFileSync(`${__dirname}/notes/${file}`, { encoding: 'utf8'});

        notes.push({ title: title, content: content });
    })

    console.log(notes);

    res.json({ notes: notes})
})

app.put('/notes/:noteId', (req, res) => {
    console.log(req.params.noteId);
    console.log(req.body)
    dummyNotes[req.params.noteId] = req.body;

    fs.writeFileSync(`${__dirname}/notes/${req.body.title}`, req.body.content);

    res.send('Note updated successfully!');
})

function testSaveToFile() {
    fs.writeFileSync(`${__dirname}/notes/${dummyNotes[0].title}`, dummyNotes[0].content, 'utf8');
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));