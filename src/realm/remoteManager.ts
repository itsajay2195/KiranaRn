import {realm} from '.';

export const saveHeadlines = (headlines: any) => {
  realm.write(() => {
    headlines.forEach((headline: any) => {
      realm.create('News', headline); // Correct use of 'modified'
    });
  });
};

export const clearHeadlines = () => {
  realm.write(() => {
    realm.deleteAll();
  });
};
