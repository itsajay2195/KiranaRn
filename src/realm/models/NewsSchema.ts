import Realm from 'realm';

export class News extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'News',
    properties: {
      id: 'string',
      source: 'mixed',
      author: 'string',
      url: 'string',
      urlToImage: 'string?',
      title: 'string',
      description: 'string',
      publishedAt: 'string',
      textBgColor: 'string',
      isDeleted: {type: 'bool', default: false},
    },
    primaryKey: 'id',
  };
}
