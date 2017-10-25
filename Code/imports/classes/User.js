import { Class } from 'meteor/jagi:astronomy';

import Users from '../collections/users.js';

const UserProfile = Class.create({
  name: 'UserProfile',
  fields: {
    username: String,
    firstname: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      }, {
        type: 'maxLength',
        param: 40
      }]
    },
    lastName: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      }, {
        type: 'maxLength',
        param: 40
      }]
    }
    /* Any other fields you want to be published to the client */
  }
});

const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    createdAt: Date,
    emails: {
      type: [Object],
      default: function() {
        return [];
      }
    },
    profile: {
      type: UserProfile,
      default: function() {
        return {};
      }
    }
  },
  secured: false,
  helpers: {
    fullName() {
      return '${this.firstName} ${this.lastName}';
    }
  }
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: Object
    }
  });
}
