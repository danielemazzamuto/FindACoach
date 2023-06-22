export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    // get all coaches from the getter above
    const coaches = getters.coaches;
    // get all the coaches userId from the root store
    const userId = rootGetters.userId;
    // check if a coach is registered - return true
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    // if older than 60secs return true to update loadCoaches
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
