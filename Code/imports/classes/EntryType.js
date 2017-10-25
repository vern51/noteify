import { Enum } from 'meteor/jagi:astronomy';

const EntryType = Enum.create({
  name: 'EntryType',
  identifiers: ['TASK', 'NOTE', 'EVENT']
});
