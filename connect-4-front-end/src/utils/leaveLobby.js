import { API_METHODS, getAPIData } from "./callAPI";

window.addEventListener("onunload", function (e) {
    console.log("logout")
    getAPIData('session/logout', API_METHODS.post, {})
  });