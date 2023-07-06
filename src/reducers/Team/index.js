const teamReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TEAM_DATA':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default teamReducer;