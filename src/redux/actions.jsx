export const authenticated = (username, id, login) => ({
  type: "authenticated",
  payload: { username, id, login },
});

export const notAuthenticated = () => ({
  type: "notAuthenticated",
});
