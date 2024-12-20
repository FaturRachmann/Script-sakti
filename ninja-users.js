const codingNinjasDbStr = 'test';
const codingNinjasRootUser = cat('/etc/k8-test/admin/NINJA_ROOT_USERNAME');
const codingNinjasRootPass = cat('/etc/k8-test/admin/NINJA_ROOT_PASSWORD');
const codingNinjasUsersStr = cat('/etc/k8-test/NINJA_USERS_LIST');

const adminDb = db.getSiblingDB('admin');
adminDb.auth(codingNinjasRootUser, codingNinjasRootPass);
print('Successfully authenticated!!');

const codingNinjasDb = db.getSiblingDB(codingNinjasDbStr);

const customRoles = adminDb
  .getRoles({ rolesInfo: 1, showBuiltinRoles: false })
  .map(role => role.role)
  .filter(Boolean);
codingNinjasUsersStr
  .trim()
  .split(';')
  .map(s => s.split(':'))
  .forEach(user => {
    const codingNinjasUsername = user[0];
    const rolesStr = user[1];
    const codingNinjasPassword = user[2];
    if (!rolesStr || !codingNinjasPassword) {
      return;
    }
    const roles = rolesStr.split(',');
    const userDoc = {
      user: codingNinjasUsername,
      pwd: codingNinjasPassword,
    };
    userDoc.roles = roles.map(role => {
      if (!~customRoles.indexOf(role)) {
        return role;
      }
      return { role: role, db: 'admin' };
    });
    try {
      codingNinjasDb.createUser(userDoc);
    } catch (err) {
      if (!~err.message.toLowerCase().indexOf('duplicate')) {
        throw err;
      }
    }
  });
