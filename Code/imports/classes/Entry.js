import { Class } from 'meteor/jagi:astronomy';

import Entries from '../collections/users.js';
import EntryType from './EntryType.js';

const Entry = Class.create({
  name: 'Entry',
  collection: Entries,
  fields: {
    user: User,
    entryType: EntryType,
    title: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      }, {
        type: 'maxLength',
        param: 40
      }]
    },
    tags: [Tags],
    createdOn: Date,
    createdAt: Location,
    /* Any other fields you want to be published to the client */
  }
});
