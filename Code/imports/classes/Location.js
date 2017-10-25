import { Class } from 'meteor/jagi:astronomy';

const Location = Class.create({
  name: 'Location',
  collection: Locations,
  fields: {
    address: string,
    city: string,
    zip: string,
    country: string, //predefined enum with list?


    // some api to pull this automatically from device and store in predefined structure?
  }
});
