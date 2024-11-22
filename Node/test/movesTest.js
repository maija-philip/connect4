var assert = require("assert");

const { move } = require("../BusinessLogic/moves");

describe("Game Moves", async function () {
  
  const Error = require("./../BusinessLogic/public/errors");
  const error = new Error();

  const Database = require("./../DataAccess/queries.js");
  const db = new Database();

  const gameId = 1000;

  describe("validatingMove", async function () {
    it("db can not find game", async function () {

        // create fake game
      const result = await move(gameId, 1);

      assert.equal(result, { error: error.gameDNE });
      // clean up game
    });
  });

  describe("checkIfWinner", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
