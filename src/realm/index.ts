import Realm from 'realm';
import {News} from './models/NewsSchema';

export const realmConfig = {
  schema: [News],
};

export const realm = new Realm({schema: [News]});
