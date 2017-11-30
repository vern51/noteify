import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Index, MongoDBEngine } from 'meteor/easy:search'
import './searchBox.html';

import { Entries } from '../../../api/entries.js';

/*Template.searchBox.helpers({
  entriesIndex() {
    return EntriesIndex;
  }
});*/
