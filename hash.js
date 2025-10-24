const bcrypt = require('bcryptjs');

(async () => {
  const password = 'NewSuperAdminPass123';
  const hashed = await bcrypt.hash(password, 12);
  console.log('Hashed password:', hashed);
})();