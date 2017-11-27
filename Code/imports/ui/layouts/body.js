import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../api/entries.js';

import '../components/entry.js';

import '../components/entries.js';

import '../components/entries.html';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});
