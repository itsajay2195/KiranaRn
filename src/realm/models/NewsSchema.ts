import Realm from 'realm';

export class News extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'News',
    properties: {
      id: 'string',
      source: 'mixed',
      author: 'string',
      url: 'string',
      title: 'string',
      description: 'string',
      publishedAt: 'string',
    },
    primaryKey: 'id',
  };
}
