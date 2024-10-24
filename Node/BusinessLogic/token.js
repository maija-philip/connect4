/*
    Maija Philip
    Connect 4
*/

// export to api request
module.exports = function () {
  this.timeOutInMilliSeconds = 1800000; // 30 minutes

  this.getRandomChar = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    return characters.charAt(Math.floor(Math.random() * charactersLength));
  };

  /*
  Create Token
  */
  this.createToken = (ip, username) => {
    let token = "";

    let ipWithoutDots = ip.split(":").join("");
    let numIP = parseInt(ipWithoutDots);
    let hexIP = numIP.toString(16);

    let now = Date.now();
    let nowBase8 = now.toString(8);
    let expire = parseInt(now) + this.timeOutInMilliSeconds;
    let expireBase8 = expire.toString(8);

    // get longest length
    let lengths = [
      username.length,
      hexIP.length,
      nowBase8.length,
      expireBase8.length,
    ];
    let tokenBuilders = [username, hexIP, nowBase8, expireBase8];
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

    console.log(token);
    console.log(this.undoToken(token));
    console.log(this.validateToken(ip, username, token));

    return token;
  };

  /*
  Undo Token back to username, ip, creation, and expiry
  */
  this.undoToken = (token) => {
    let result = {
      username: "",
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

    result.username = encodedResults[0];
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
  this.validateToken = (ip, username, token) => {
    const undoneToken = this.undoToken(token)
    
    let ipWithoutDots = ip.split(":").join("");
    if (ipWithoutDots !== undoneToken.ip ) {
        console.log("ips not equal: ", ipWithoutDots, undoneToken.ip)
        return false;
    }

    if (username !== undoneToken.username) {
        console.log("usernames not equal: ", username, undoneToken.username)
        return false;
    }

    if (undoneToken.expiry >= Date.now()) {
        console.log("has expired: ", undoneToken.expiry, Date.now())
        return false;
    }

    return true;
  };
};
