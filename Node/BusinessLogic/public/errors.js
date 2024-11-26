/*
    Maija Philip
    Connect 4
*/

// export to api request
module.exports = function () {
    
    this.noError = "no error"
    this.somethingWentWrong = "Something went wrong, please try again"
    this.noUserInLobby = "This user does not exist or is not in the lobby"
    this.invalidLogin = "Username or password is incorrect"
    this.invalidNewUserInformation = "Password and username must be less than 60 characters and unique"
    this.invalidToken = "Token is invalid"
    this.messageTooLong = "Message needs to be 200 characters or less"
    this.usernameDNE = "This username is not valid or doesn't exist"
    this.gameDNE = "This game is not valid or doesn't exist"
    this.columnFull = "This column is full, you can not move here"
    this.notYourGame = "You can not make a edit a game you are not a member of"
    this.noTurnAfterWinner = "Once the game is won, you can not play more turns"
    this.canNotDeleteInProgressGame = "Can not delete a game that is in progress"
}