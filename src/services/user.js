import User from '../models/User.js';

export function saveUser(user) {
  try {
    return User.upsert(user, {
      id_telegram: user.id_telegram,
    });
  } catch (error) {
    throw error;
  }
}
