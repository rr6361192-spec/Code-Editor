// All the events

const ACTIONS = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  CODE_CHANGE: "code-change",   // ✅ make sure this matches — was "conde-change" before
  SYNC_CODE: "sync-code",
  LEAVE: "leave",
};

module.exports = ACTIONS;       // ✅ backend uses module.exports, NOT export const