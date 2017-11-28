// Entries COLLECTION
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.debug = true;

export const Entries = new Mongo.Collection('entries');



Schema = {};

/*Schema.Address = new SimpleSchema({
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    //decimal: true
  },
  lng: {
    type: Number,
    //decimal: true
  },
  geometry: {
    type: Object,
    blackbox: true
  },
  placeId: {
    type: String
  },
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  },
  country: {
    type: String,
    blackbox: true
  }
});*/

/*Schema.Date = new SimpleSchema({
  date: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "datetimepicker",
      }
    }
  }
});*/

/*Template.autoformGoogleplaceBasic.helpers({
  optsGoogleplace: function() {
    return {
      // type: 'googleUI',
      // stopTimeoutOnKeyup: false,
      // googleOptions: {
      //   componentRestrictions: { country:'us' }
      // }
    }
  }
});*/

Schema.Note = new SimpleSchema({
  description: {
    type: String,
    label: "Description",
    autoform: {
         type: 'textarea',
         max: 1000
    },
  }
});

Schema.Task = new SimpleSchema({
  dueDate: {
    label: 'due date',
    type: Date,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker",
      }
    }
  },
  description: {
    type: String,
    autoform: {
         type: 'textarea',
         max: 500
    }
  }
});

Schema.Event = new SimpleSchema({
  date: {
    label: 'date',
    type: Date,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  location: {
    label: 'location',
    type: Object,//Schema.Address,
    optional: true,
    blackbox: true
    //type: String,
    /*type: 'Object',
    optional: true,
    autoform: {
      type: 'map',
      afFieldInput: {
        geolocation: true,
        searchBox: true,
        autolocate: true
      }
    }*/
  },
  description: {
    type: String,
    autoform: {
         type: 'textarea',
         max: 500
    }
  }
});

Entries.attachSchema(new SimpleSchema({
  _id: {
    type: String
  },
  title: {
    type: String,
    label: "Title",
    max: 100
  },
  entryType: {
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Note", value: "note"},
          {label: "Task", value: "task"},
          {label: "Event", value: "event"}
        ];
      }
    }
  },
  event: {
    type: Schema.Event,
    blackbox: true,
    optional: true,
  },
  note: {
    type: Schema.Note,
    blackbox: true,
    optional: true,
  },
  task: {
    type: Schema.Task,
    blackbox: true,
    optional: true,
  },
  userId: {
    type: String,
    autoValue: function() {
      if ( this.isInsert ) {
        return this.userId;
      }
    }
  },
  dateCreated: {
    type: Date,
    label: "Date Entry Added to System",
    optional: true,
    //denyUpdate: true,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
  updated: {
    type: Date,
    label: "Date Entry Updated in System",
    optional: true,
    autoValue: function() {
      if ( this.isUpdate || this.isInsert ) {
        return new Date();
      }
    }
  }/*,
  entryId: {
    type: String,

  },
  locationCreated: {

  },*/
}), { tracker: Tracker });

Meteor.methods({
  'entries.insert': function(doc) {
    console.log("inserting: ", doc.title);

    // Make sure user is logged in before inserting entry
    if (!this.userId) {
      console.log("Error: user not authorized to insert entry");
      throw new Meteor.Error('not-authorized');
    }

    var newEntry = {
      //"_id": random.id(),
      "title": doc.title,
      "entryType": doc.entryType,
      "userId": this.userId,
    };

    if (doc.entryType == 'note') {
      console.log("preparing note for insertion...");
      var newNote = {
        "description": doc.note.description
      }
      newEntry.note = newNote;
    }
    else if (doc.entryType == 'task') {
      console.log("preparing task for insertion...");
      var newTask = {
        "description": doc.task.description,
        "dueDate": doc.task.dueDate
      }
      newEntry.task = newTask;
    }
    else if (doc.entryType == 'event') {
      console.log("preparing event for insertion...");
      console.log("location: ", doc.event.location);
      var newEvent = {
        "description": doc.event.description,
        "date": doc.event.date,
        "location": doc.event.location
      }
      newEntry.event = newEvent;
    }
    else {
      "default to else...";
    }

    Entries.insert(newEntry);
    console.log("new entry inserted");
    return doc;
  },
  'entries.remove': function(entryId) {
    check(entryId, String);
    console.log("removing entry: ", entryId);
    const entry = Entries.findOne(entryId);
    if (entry.userId !== this.userId) {
      // Ensure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Entries.remove(entryId);
  },
  'entries.setChecked': function(entryId, setChecked) {
    check(entryId, String);
    check(setChecked, Boolean);

    const entry = Entries.findOne(entryId);
    if (entry.userId !== this.userId) {
      // Enure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Entries.update(entryId, { $set: { checked: setChecked } });
  }
});

Entries.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

export default Entries;

if (Meteor.isServer) {
  // Only runs on the server
  // Only publish tasks that belong to current user
  Meteor.publish('entries', function entriesPublication() {
    return Entries.find({
      $or: [
        { userId: this.userId },
      ],
    });
  });
}
