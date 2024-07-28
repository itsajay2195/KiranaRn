import {realm} from './index';

export const useRealmOperations = () => {
  const saveHeadlines = (headlines: any) => {
    if (realm && !realm.isClosed) {
      realm.write(() => {
        headlines.forEach((headline: any) => {
          realm.create('News', headline); // Use 'modified' if needed
        });
      });
    } else {
      console.error('Realm instance is closed or invalid.');
    }
  };

  const clearHeadlines = () => {
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
      });
    } else {
      console.error('Realm instance is closed or invalid.');
    }
  };

  return {
    saveHeadlines,
    clearHeadlines,
  };
};
