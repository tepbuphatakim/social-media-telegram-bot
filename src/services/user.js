import User from '../models/User.js';
import UserFriend from '../models/UserFriend.js';

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

export function addFriend(id_user, id_friend) {
  return UserFriend.findOrCreate({
    where: { id_user, id_friend },
  });
}
