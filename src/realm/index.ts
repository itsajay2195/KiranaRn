import Realm from 'realm';
import {NewsSchema} from './models/NewsSchema';

const realmConfig = {
  schema: [NewsSchema],
};

export const realm = new Realm(realmConfig);
