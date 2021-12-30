const express = require("express");
const PORT = 4000;
const app = express();
const cors = require("cors");
const { Router } = require("express");
const NoteBooks = require("./models").notebook;
const Notes = require("./models").note;

app.use(express.json());
// enable CORS (cross origin resource sharing)
app.use(cors());
const router = new Router();

//GET the artworks list
app.get("/notebooks", async (req, res) => {
  const list = await NoteBooks.findAll();
  return res.status(200).send(list);
});

app.get("/notes", async (req, res) => {
  const list = await Notes.findAll();
  return res.status(200).send(list);
});

// create new notebook
app.post("/notes", async (req, res) => {
  let { title, description } = req.body;

  if (!title || !description) {
    return res.status(403).send("missing title or description");
  }
  // create new notebook row in db
  const note = await Notes.create({ title, description });
  // send newly created note back to FE.
  return res.json(note);
});

// Delete a note
app.delete("/notes/:notesId", async (req, res, next) => {
  const notesId = parseInt(req.params.notesId);

  if (!notesId) {
    res.status(404).send("Note not found");
  }
  try {
    await Notes.destroy({
      where: {
        id: notesId,
      },
    });

    return res.status(200).send(`note with id: ${notesId} was deleted`);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
