const USERS_KEY = 'gramsewa_users';
const COMPLAINTS_KEY = 'gramsewa_complaints';
const SESSION_KEY = 'gramsewa_current_user';

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const simpleHash = async (value) => {
  const text = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', text);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

export const getUsers = () => readJson(USERS_KEY, []);
export const saveUsers = (users) => writeJson(USERS_KEY, users);

export const getComplaints = () => readJson(COMPLAINTS_KEY, []);
export const saveComplaints = (complaints) => writeJson(COMPLAINTS_KEY, complaints);

export const getSession = () => readJson(SESSION_KEY, null);
export const setSession = (user) => writeJson(SESSION_KEY, user);
export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export const registerUser = async ({ name, phone, password, role }) => {
  const users = getUsers();
  if (users.some((user) => user.phone === phone)) {
    throw new Error('This phone number is already registered.');
  }

  const user = {
    id: `USR-${Date.now()}`,
    name: name.trim(),
    phone: phone.trim(),
    role,
    passwordHash: await simpleHash(password),
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);
  const sessionUser = sanitizeUser(user);
  setSession(sessionUser);
  return sessionUser;
};

export const loginUser = async ({ phone, password }) => {
  const passwordHash = await simpleHash(password);
  const user = getUsers().find((item) => item.phone === phone.trim() && item.passwordHash === passwordHash);

  if (!user) {
    throw new Error('Invalid phone number or password.');
  }

  const sessionUser = sanitizeUser(user);
  setSession(sessionUser);
  return sessionUser;
};

export const sanitizeUser = ({ passwordHash, ...user }) => user;

export const upsertComplaint = (complaint) => {
  const complaints = getComplaints();
  const exists = complaints.some((item) => item.id === complaint.id);
  const nextComplaints = exists
    ? complaints.map((item) => (item.id === complaint.id ? complaint : item))
    : [complaint, ...complaints];

  saveComplaints(nextComplaints);
  return nextComplaints;
};
