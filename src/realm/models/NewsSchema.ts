export const NewsSchema = {
  name: 'News',
  properties: {
    source: {id: 'string', name: 'string'},
    author: 'string',
    url: 'string',
    title: 'string',
    description: 'string',
    publishedAt: 'string',
  },
  primaryKey: 'id',
};
