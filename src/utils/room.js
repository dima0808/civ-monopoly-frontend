export const isUserLeaderCookies = (members, user) => {
  if (members?.length === 0) {
    return false;
  }
  return user?.username === members[0]?.username;
};

export const isUserInRoom = (members, user) => {
  if (members?.length === 0) {
    return false;
  }
  return members?.some((member) => member.username === user?.username);
};
