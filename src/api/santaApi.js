class SantaApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  //GET http://localhost:5000/members/teamid
  getTeamMembers() {
    return fetch(this._baseUrl, {
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  //PATCH http://localhost:5000/members/giftee
  updateMemberGiftee(id, name) {
    return fetch(this._baseUrl + "/giftee", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
        name: name,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //PATCH http://localhost:5000/members/availability
  updateMemberAvailability(id) {
    return fetch(this._baseUrl + "/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const santaApi = new SantaApi({
  baseUrl: process.env.REACT_APP_API_URL,
});

export default santaApi;
