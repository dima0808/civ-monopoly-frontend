export const isUserLeaderCookies = (members, user) => {
  if (members?.length === 0) {
    return false;
  }
  return user?.username === members[0]?.username;
};
