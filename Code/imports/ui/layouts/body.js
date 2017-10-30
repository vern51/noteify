import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../api/entries.js';

import '../components/entries.js';
//import { Entries } from '../../client/components/entries.js';

import '../components/entry.js';
//import '../../client/components/entry.js';

import '../components/entries.js';
//import '../../client/components/entries.js';

import '../components/entries.html';
//import '../../client/components/entries.html';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});
