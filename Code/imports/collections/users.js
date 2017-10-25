import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Users = Meteor.users;

if (Meteor.isServer) {
  // Only runs publish on server
  Meteor.publish('users', function usersPublication() {
      return Users.find({
        $or: [
          { private: { $ne: true } },
          { owner: this.userId },
        ],
      });
  });
}

Meteor.methods({
  'users.insert'(text) {
    check(text, String);

    // Ensure user is logged in before inserting entry
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Users.insert({
      // handle insertion of other data
      createdAt: new Date(),
    });
  },
  'users.remove'(userId) {
    // Remove user account
    check(userId, String);

    const user = Users.findOne(userId);
    // Check if user has proper authority
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.remove(userId);
    // logout necessary too, or is this automatic?
  },
  // Commented out below is template for adding method to collection
  //    that allows for similar functionality to an update statement in
  //    a traditional SQL database
/*  'users.updateInfo'(userId, varToChange) {
    // check input data
    check(userId, String);
    check(varToChange, varType);

    // find user
    const user = Entries.findOne(entryId);

    // Ensure only user can alter their own data
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(userId, { $set: { private: setToPrivate} });
  },*/
});

export default Users;
