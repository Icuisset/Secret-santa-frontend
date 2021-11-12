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
}

const santaApi = new SantaApi({
  baseUrl: "http://localhost:5000/members",
});

export default santaApi;
