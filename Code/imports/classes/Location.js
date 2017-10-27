import { Class } from 'meteor/jagi:astronomy';

const Location = Class.create({
  name: 'Location',
  collection: Locations,
  fields: {
    Latitude: String,
    Longitude: String,

    // some api to pull this automatically from device and store in predefined structure?
  }
});
