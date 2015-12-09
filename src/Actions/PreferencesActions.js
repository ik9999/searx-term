import fs from 'fs';
import alt from '../Alt.js';
import path from 'path';
import defaultPrefs from '../Constants/DefaultPreferences.js';

const configPath = path.join(__dirname, '..', 'prefs.json');

export default alt.createActions({
  loadPreferences() {
    return dispatch => {
      fs.readFile(configPath, (error, data) => {
        let handleError = () => {
          let data = defaultPrefs;
          fs.writeFile(configPath, JSON.stringify(data), () => {
            dispatch(data); //Can be error
          });
        };
        if (!error) {
          try {
            let parsedPrefs = JSON.parse(data);
            dispatch(parsedPrefs);
          } catch (error) {
            handleError();
          }
        } else {
          handleError();
        }
      });
    };
  }
});
