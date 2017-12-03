import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/accounts-config.js';
import '../imports/startup/routes.js';

//import '../imports/ui/layouts/body.js';
import '../imports/ui/layouts/MainLayout.html';
import '../imports/ui/layouts/HomeLayouts.html';

import '../imports/ui/components/forms/newNote.html';
import '../imports/ui/components/forms/newNote.js';
import '../imports/ui/components/forms/newTask.html';
import '../imports/ui/components/forms/newTask.js';
import '../imports/ui/components/forms/newEvent.html';
import '../imports/ui/components/forms/newEvent.js';

import '../imports/ui/components/entries.js';
import '../imports/ui/components/entries.html';
import '../imports/ui/components/entry.js';
import '../imports/ui/components/entry.html';

/*import 'select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';*/

import { Entries } from '../imports/api/entries.js';
import '../imports/api/entries.js';

AutoForm.debug();
