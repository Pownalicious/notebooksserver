const express = require("express");
const PORT = 4000;
const app = express();
const { Router } = require("express");
const NoteBooks = require("./models").notebook;
const Notes = require("./models").note;

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

app.get("/notebook/:id", async (req, res, next) => {
  try {
    const notebookId = parseInt(req.params.id);
    const noteBookWithNotes = await Notes.findByPk(notebookId, {
      include: [Notes],
    });
    if (noteBookWithNotes) {
      res.send(noteBookWithNotes);
    } else {
      res.status(404).send("Team not found");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
