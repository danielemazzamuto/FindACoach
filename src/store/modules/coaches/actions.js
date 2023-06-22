export default {
  async registerCoach(context, data) {
    // we get the userId from the root index.js store
    const userId = context.rootGetters.userId;
    // create a new obj and passing the form data in it
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;
    // passing the token as param to make the request working on firebase as we enable the authentication - see realtime DB Rules on firebase
    const res = await fetch(
      `https://vue-http-a4bed-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    //const resData = await res.json();

    if (!res.ok) {
      //error..
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context, payload) {
    //update only if 60 secs have passed
    if (!payload.forceRefresh && !context.getters.shouldUpdate) return;

    const res = await fetch(
      `https://vue-http-a4bed-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in resData) {
      const coach = {
        id: key,
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
