import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
//import '../ui/layouts/body.js';
//import '../ui/components/entries.js';
import '../ui/layouts/body.html'
import '../ui/components/entries.html';
//import '../../client/components/entries.html';
//import '../ui/pages/root_redirector.js';

FlowRouter.route('/entries', {
  name: 'Entries.show',
  action() {
    console.log("routing to entries...");
    BlazeLayout.render('Body', { main: "entries" });
  },
});

FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('Body', { main: "entries" });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Body', { main: "entries" });
  },
};
