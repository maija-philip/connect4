const connect4server =
  "https://connect4service-281256585027.us-central1.run.app/";

/**
 * return the data received form the api specified
 *
 * @param {string} endpoint - the part of api you wish to access, ex: 'user/'
 * @return api data
 */
export async function getAPIData(endpoint, method, payload) {
  let details = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  };
  if (method !== API_METHODS.get) {
    details["body"] = JSON.stringify(payload);
  }

  let link = `${connect4server}${endpoint}`;
  console.log(link)

  return fetch(link, details)
    .then((res) => res.json())
    .catch((err) => {
      console.log("err:", err);
    });
}

export const API_METHODS = {
  get: "GET",
  post: "POST",
};
