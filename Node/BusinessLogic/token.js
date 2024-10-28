/*
    Maija Philip
    Connect 4
*/

const { MIN_5 } = require("../constants");

// export to api request
module.exports = function () {
  this.timeOutInMilliSeconds = MIN_5; // 5 minutes

  this.getRandomChar = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    return characters.charAt(Math.floor(Math.random() * charactersLength));
  };

  /*
  Create Token
  */
  this.createToken = (ip, browser) => {
    let token = "";

    let ipWithoutDots = ip.split(":").join("");
    let numIP = parseInt(ipWithoutDots);
    let hexIP = numIP.toString(16);

    let basicBrowser = browser.split("/")[0];

    let now = Date.now();
    let nowBase8 = now.toString(8);
    let expire = parseInt(now) + this.timeOutInMilliSeconds;
    let expireBase8 = expire.toString(8);

    // get longest length
    let lengths = [
      basicBrowser.length,
      hexIP.length,
      nowBase8.length,
      expireBase8.length,
    ];
    let tokenBuilders = [basicBrowser, hexIP, nowBase8, expireBase8];
    let maxLength = 0;
    lengths.forEach((length) => {
      if (length > maxLength) {
        maxLength = length;
      }
    });

    // interweave values with dots at the end
    for (let i = 0; i < maxLength; i++) {
      for (let j = 0; j < lengths.length; j++) {
        if (i < lengths[j]) {
          token += tokenBuilders[j].charAt(i);
        } else if (i == lengths[j]) {
          token += ".";
        } else {
          token += this.getRandomChar();
        }
      }
    }

    return token;
  };

  /*
  Undo Token back to username, ip, creation, and expiry
  */
  this.undoToken = (token) => {
    let result = {
      browser: "",
      ip: "",
      creation: "",
      expiry: "",
    };

    let encodedResults = ["", "", "", ""];

    let tokenLength = token.length;
    let count = 0;

    // separate out values
    while (count < tokenLength) {
      for (let i = 0; i < encodedResults.length; i++) {
        let character = token.charAt(count);
        count++;

        if (encodedResults[i].slice(-1) !== ".") {
          encodedResults[i] += character;
        }
      }
    }

    // remove . if present
    for (let i = 0; i < encodedResults.length; i++) {
      const item = encodedResults[i];
      if (item.slice(-1) === ".") {
        encodedResults[i] = item.slice(0, -1);
      }
    }

    result.browser = encodedResults[0];
    result.ip = parseInt(encodedResults[1], 16);
    result.creation = parseInt(encodedResults[2], 8);
    result.expiry = parseInt(encodedResults[3], 8);

    return result;
  };

  /*
  Validate Token
  - has it expired?
  - is it this user?
  */
  this.validateToken = (ip, browser, token) => {
    const undoneToken = this.undoToken(token);

    let ipWithoutDots = ip.split(":").join("");
    if (ipWithoutDots + "" !== undoneToken.ip + "") {
    //   console.log("ips not equal: ", ipWithoutDots, undoneToken.ip)
      return false;
    }

    let basicBrowser = browser.split("/")[0];
    if (basicBrowser !== undoneToken.browser) {
    //   console.log("usernames not equal: ", basicBrowser, undoneToken.browser)
      return false;
    }

    if (parseInt(undoneToken.expiry) <= parseInt(Date.now())) {
    //   console.log("has expired: ", parseInt(undoneToken.expiry), parseInt(Date.now()))
      return false;
    }

    return true;
  };
};
