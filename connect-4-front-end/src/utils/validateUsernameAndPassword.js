export function validateUsernameAndPassword(username, password) {
  if (username.length < 4 || username.length > 60) {
    return {error: "Username must be between 4 and 60 characters"};
  }
  if (password.length < 4 || password.length > 60) {
    return {error: "Password must be between 4 and 60 characters"};
  }

  return {error: false};
}
