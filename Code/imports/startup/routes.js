import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../ui/layouts/body.js';
import '../ui/components/entries.js'
import '../ui/pages/root_redirector.js';

// Import to override accounts templates
//import '../../ui/accounts/accounts-templates.js';

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
    BlazeLayout.render('Body', { main: "app_root_redirector" });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Body', { main: "app_root_redirector" });
  },
};
