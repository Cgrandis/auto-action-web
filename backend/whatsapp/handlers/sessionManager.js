const sessions = {};

function createSession(user) {
  sessions[user] = {
    step: 0,
    data: {},
    lastIntent: null,
  };
}

function getSession(user) {
  return sessions[user] || null;
}

function clearSession(user) {
  delete sessions[user];
}

function updateSession(user, update) {
  if (!sessions[user]) createSession(user);
  sessions[user] = {
    ...sessions[user],
    ...update,
  };
}

module.exports = {
  createSession,
  getSession,
  updateSession,
  clearSession,
};
