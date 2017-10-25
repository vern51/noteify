import { Class } from 'meteor/jagi:astronomy';

import Entry from './Entry.js';
import Entries from '../collections/users.js';
import EntryType from './EntryType.js';

const Task = Entry.inherit({
  name: 'Task',
  collection: Entries,
  fields: {
    entry: Entry,
    entryType: EntryType.TASK,
    description: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      },
        type: 'maxLength',
        param: 1280 //TODO: research good bounds...
      }]
    },
    difficulty: {
      type: int,
      validators: [{
        type: 'min',
        param: 1}
      ,{
        type: 'maxLength',
        param: 10
      }]
    },
    priority: {
      type: int,
      validators: [{
        type: 'min',
        param: 1}
      ,{
        type: 'maxLength',
        param: 10
      }]
    },
    /* Any other fields you want to be published to the client */
  }
});
