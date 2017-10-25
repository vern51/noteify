import { Class } from 'meteor/jagi:astronomy';

import Entry from './Entry.js';
import Entries from '../collections/users.js';
import EntryType from './EntryType.js';

const Event = Entry.inherit({
  name: 'Event',
  collection: Entries,
  fields: {
    entry: Entry,
    entryType: EntryType.EVENT,
    time: Date,
    location: Location,

    /* Any other fields you want to be published to the client */
  }
});
