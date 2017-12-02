import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

// Import to load these templates
//import '../ui/layouts/body.js';
//import '../ui/components/entries.js';
//import '../ui/layouts/body.html'
import '../ui/layouts/MainLayout.html';
import '../ui/layouts/HomeLayouts.html';
import '../ui/components/entries.html';
import '../ui/components/partials/Header.html';
import '../ui/components/partials/SideNav.html';
import '../ui/components/forms/newEntry.html';
import '../ui/components/forms/newNote.html';

//import '../../client/components/entries.html';
//import '../ui/pages/root_redirector.js';

/*FlowRouter.route('/entries', {
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
};*/

//login redirecting
Accounts.onLogin(function(){
  FlowRouter.go('entries');
});

//logout redirecting
Accounts.onLogout(function(){
  FlowRouter.go('home');
});

//if user is not login, then direct them to home page
FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()){
    FlowRouter.go('home');
  }
}]);

//if user is login, then direct them to the landing page
FlowRouter.route('/',{
  name: 'home',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('entries');
    }
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/entries', {
  name: 'Entries',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Entries'});
  }
});

FlowRouter.route('/entries/newEntry/note', {
  name: 'newNote',
  action() {
    GAnalytics.pageview();
    console.log("Routing to new note...");
    BlazeLayout.render('MainLayout', {main: 'newNote'});
  }
});

FlowRouter.route('/entries/newEntry/task', {
  name: 'newTask',
  action() {
    GAnalytics.pageview();
    console.log("Routing to new task...");
    BlazeLayout.render('MainLayout', {main: 'newTask'});
  }
});

FlowRouter.route('/entries/newEntry/event', {
  name: 'newEvent',
  action() {
    GAnalytics.pageview();
    console.log("Routing to new event...");
    BlazeLayout.render('MainLayout', {main: 'newEvent'});
  }
});

FlowRouter.route('/entry/:id',{
  name: 'entry',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'EntrySingle'});
  }
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Menu'});
  }
});

FlowRouter.route('/shopping-list', {
  name: 'shopping-list',
  action() {
    BlazeLayout.render('MainLayout', {main: 'ShoppingList'});
  }
});
