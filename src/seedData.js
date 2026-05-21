import seedComplaints from './data/seedComplaints.json';
import seedUsers from './data/seedUsers.json';
import { getComplaints, getUsers, saveComplaints, saveUsers, simpleHash } from './storage';

export const initializeSeedData = async () => {
  const users = getUsers();
  const preparedSeedUsers = await Promise.all(
    seedUsers.map(async ({ password, ...user }) => ({
      ...user,
      passwordHash: await simpleHash(password),
    })),
  );
  const seedUsersById = new Map(preparedSeedUsers.map((user) => [user.id, user]));
  const mergedUsers = users.map((user) => seedUsersById.get(user.id) || user);
  const existingIds = new Set(mergedUsers.map((user) => user.id));
  const missingSeedUsers = preparedSeedUsers.filter((user) => !existingIds.has(user.id));

  if (missingSeedUsers.length) {
    saveUsers([...mergedUsers, ...missingSeedUsers]);
  } else if (users.some((user, index) => user.phone !== mergedUsers[index]?.phone)) {
    saveUsers(mergedUsers);
  }

  if (!getComplaints().length) {
    saveComplaints(seedComplaints);
  }
};
