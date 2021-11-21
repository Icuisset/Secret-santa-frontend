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

  //GET http://localhost:5000/members
  getTeamMembers(teamid) {
    return fetch(this._baseUrl + "/members/team/" + teamid, {
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  //PATCH http://localhost:5000/members/giftee
  updateMemberGiftee(id, name) {
    return fetch(this._baseUrl + "/members/giftee", {
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
    return fetch(this._baseUrl + "/members/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //GET http://localhost:5000/teams/me
  getUserTeams(token) {
    return fetch(this._baseUrl + "/teams/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  //POST http://localhost:5000/teams
  createTeam(name, token) {
    return fetch(this._baseUrl + "/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //DELETE http://localhost:5000/teams/:teamID
  deleteTeam(id, token) {
    return fetch(this._baseUrl + "/teams/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }
}

const santaApi = new SantaApi({
  baseUrl: process.env.REACT_APP_API_URL,
});

export default santaApi;
