/*
    Maija Philip
    Connect 4
*/

// export to api request
module.exports = function () {
  this.timeOutInMilliSeconds = 1800000; // 30 minutes

  this.createToken = (ip, username) => {
    let token = "";

    let ipWithoutDots = ip.split(":").join("");
    let numIP = parseInt(ipWithoutDots);
    let hexIP = numIP.toString(16); 

    let now = Date.now()
    let expire = parseInt(now) + this.timeOutInMilliSeconds;

    console.log("ip:", ip);
    console.log("ipWithoutDots:", ipWithoutDots);
    console.log("numIp:", numIP);
    console.log("hexIp:", hexIP);
    console.log("now:", now);
    console.log("expire:", expire);
    return token;
  };

  this.isTokenValid = (ip, username, token) => {
    return false;
  };

};

/*
integer to hex
var i = 10;
console.log( i.toString(16) );

hex to integer
var h = "a";
console.log( parseInt(h, 16) );

*/