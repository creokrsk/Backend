const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');
// console.log(notesPath);

async function addNote(title) {
  // const notes = require('./db.json');

  // const buffer = await fs.readFile(notesPath);
  // const notes = Buffer.from(buffer).toString('utf8');
  // const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse('note was added'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlueBright('List of notes: '));
  notes.forEach((element) => {
    console.log(chalk.greenBright('id: ', element.id, ' title: ', element.title));
  });
}

async function removeNote(id) {
  // console.log(id);
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  const notesArr = Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
  if (notesArr.find((el) => el.id === id) !== undefined) {
    const filterArr = notesArr.filter((el) => el.id !== id);

    await fs.writeFile(notesPath, JSON.stringify(filterArr));
    console.log(chalk.red.inverse('note was removed, note id:', id));
  } else {
    console.log(chalk.yellow.inverse('note with this id donf find'));
  }
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
