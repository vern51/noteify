import { Class } from 'meteor/jagi:astronomy';
import { User } from '../classes/User.js';
import { Entries } from '../collections/entries.js';
import { EntryType } from './EntryType.js';

const Entry = Class.create({
  name: 'Entry',
  collection: Entries,
  fields: {
    userId: {
      type: Number
    },
    //entryType: EntryType,
    title: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      }, {
        type: 'maxLength',
        param: 40
      }]
    },
    //tags: [Tags],
    //CreatedAt: Location,
    /* Any other fields you want to be published to the client */
  },
  events: {
    afterInit(e) {

    }
  },
  helpers: {

  },
  meteorMethods: {
    create() {
      // Uncomment below code for storing geolocation (needs testing)
      /*var latLng = Geolocation.latlng();
      Location.Latitude = latLng.lat;
      Location.Longitude = latLng.ln;*/
      return this.save();
    },
    changeTitle(title) {
      check(title, String);
      this.title = title;
      return this.save();
    }
  }/*,
  behaviors: {
    timestamp: {} // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
  }*/
});
