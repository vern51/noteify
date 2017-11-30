// Entries COLLECTION
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Index, MongoDBEngine } from 'meteor/easy:search'
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.debug = true;

export const Entries = new Mongo.Collection('entries');

/*const EntriesIndex = new Index({
  collection: Entries,
  fields: ['title'],
  engine: new MongoDBEngine({
    sort: () => { dateCreated: -1 },
  }),
})*/

Schema = {};

Schema.Tag = new SimpleSchema({
  title: {
    type: String,
    label: "title",
    autoform: {
         type: 'textarea',
         max: 1000
    },
  }
});



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
    type: Object,
    optional: true,
    blackbox: true
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
  tags: {
    type: Schema.Tag,
    blackbox: true,
    optional: true,
    autoform: {
      type: 'selectize'
    }
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
      "title": doc.title,
      "entryType": doc.entryType,
      "userId": this.userId,
      "tags": doc.tags,
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

if ( Meteor.isServer ) {
  //Define which entry data members may be searched on
  //  not necessary, but decreases search time
  Entries._ensureIndex( { userId: 1, title: 1, entryType: 1  } );

  Meteor.publish( 'entries', function (search) {
    console.log("querying entries...search: " + search);

    //check( search, Match.OneOf( String, null, undefined ) );

    console.log("userId: " + this.userId);
    let query      = {},
        projection = { limit: 10, sort: { dateCreated: -1 } };

    if ( search ) {
      let regex = new RegExp( search, 'i' );
      console.log("setting up query...");
      query = {
        $or: [
          { userId: this.userId },
          { title: regex },
          { entryType: regex },
          { dateCreated: regex },
        ]
      };

      projection.limit = 100;
    }
    try {
      //throw new Meteor.Error('Publication error', 'api/entries.js')
      console.log("finding entries...");
      return Entries.find( query, projection );
    } catch (e) {
      console.log("Publication error in api/entries.js", e)
      //this.error(e)
    }

  });
}
