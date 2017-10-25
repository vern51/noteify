import { Class } from 'meteor/jagi:astronomy';

import Entry from './Entry.js';
import Entries from '../collections/users.js';
import EntryType from './EntryType.js';

const Note = Entry.inherit({
  name: 'Note',
  collection: Entries,
  fields: {
    entry: Entry,
    entryType: EntryType.NOTE,
    contents: String,

    /* Any other fields you want to be published to the client */
  }
});
