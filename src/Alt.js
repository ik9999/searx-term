import Alt from 'alt';
let alt = new Alt();
alt.storeTransforms.push(store => {
  store.publicMethods = {
    listenChange: function(select, onChange) {
      let currentState;
      this.listen(state => {
        let nextState = select(state);
        if (nextState !== currentState) {
          currentState = nextState;
          onChange(state);
        }
      });
    }
  };
  return store;
});

export default alt;
