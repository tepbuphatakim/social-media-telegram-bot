import User from '../models/User.js';

export function saveUser(user) {
  return User.createOrUpdate(user, {
    id_telegram: user.id_telegram,
  });
}

export function getUser(id_telegram) {
  return User.findOne({
    where: {
      id_telegram,
    },
  });
}

export function getUserById(id_user) {
  return User.findByPk(id_user);
}
