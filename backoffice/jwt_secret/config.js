module.exports = {
  // Em producao, definir JWT_SECRET no ambiente.
  secret: process.env.JWT_SECRET || "development-only-change-me",
};
