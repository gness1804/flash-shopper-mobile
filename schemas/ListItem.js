import Realm from 'realm';

class ListItem {}
ListItem.schema = {
  name: 'ListItem',
  properties: {
    name: 'string',
    aisle: 'int',
    note: 'string',
    quantity: 'string',
  },
}