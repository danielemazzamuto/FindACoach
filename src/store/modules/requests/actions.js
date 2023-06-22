export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const res = await fetch(
      `https://vue-http-a4bed-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request');
      throw error;
    }

    const resData = await res.json();

    // add the id that was generated form firebase db
    newRequest.id = resData.name;
    // add the coach id only locally
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const res = await fetch(
      `https://vue-http-a4bed-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch requests');
      throw error;
    }
    console.log(resData);

    const requests = [];
    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message,
      };

      requests.push(request);
    }
    console.log(requests);
    context.commit('setRequests', requests);
  },
};
