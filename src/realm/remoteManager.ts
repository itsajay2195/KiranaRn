import {realm} from './index';

export const useRealmOperations = () => {
  const saveHeadlines = (headlines: any) => {
    if (realm && !realm.isClosed) {
      realm.write(() => {
        headlines.forEach((headline: any) => {
          realm.create('News', headline);
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

  const updateHeadlineStatusById = (id: string) => {
    if (realm && !realm.isClosed) {
      realm.write(() => {
        // Find the object by ID
        const objectToUpdate = realm.objectForPrimaryKey('News', id);

        if (objectToUpdate) {
          // Update the 'isDeleted' property to true
          objectToUpdate.isDeleted = true;
        } else {
          console.warn(`No object found with ID: ${id}`);
        }
      });
    } else {
      console.error('Realm instance is closed or invalid.');
    }
  };

  return {
    saveHeadlines,
    clearHeadlines,
    updateHeadlineStatusById,
  };
};
