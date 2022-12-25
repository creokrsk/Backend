const yargs = require('yargs');

const { addNote, printNotes, removeNote } = require('./notes.controller');

yargs.command({
  command: 'add',
  describe: 'add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    // console.log('add command: ', title);
    addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'print notes',
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'note id',
      demandOption: true,
    },
  },
  handler({ id }) {
    // console.log('add command: ', title);
    removeNote(id);
  },
});

yargs.parse();
