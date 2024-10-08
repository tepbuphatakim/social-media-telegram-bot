import User from '../models/User.js';
import UserFriend from '../models/UserFriend.js';
import { FRIEND_STATUS } from '../constants/index.js';
import { paginate } from '../utils/paginate.js';

const { PENDING, CONFIRMED } = FRIEND_STATUS;

export function getAllUsers({ page, limit }) {
  return User.findAndCountAll({
    ...paginate({ page, limit }),
  });
}

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

export async function deleteUser(idUser) {
  const user = await User.findByPk(idUser);
  if (!user) throw new Error('Cannot find user with specified id.');

  return user.destroy();
}

export function getAllFriends({ id_user, page, limit }) {
  return UserFriend.findAndCountAll({
    where: { ...(id_user && { id_user }), status: CONFIRMED },
    include: [
      {
        association: 'friend',
      },
    ],
    ...paginate({ page, limit }),
  });
}

export async function addFriend(id_user, id_friend) {
  return UserFriend.findOrCreate({
    where: { id_user, id_friend },
  });
}

export function getFriends(id_user) {
  return UserFriend.findAll({
    where: { id_user, status: CONFIRMED },
    include: [
      {
        association: 'friend',
      },
    ],
  });
}

export function getFriendsRequest(id_friend) {
  return UserFriend.findAll({
    where: { id_friend, status: PENDING },
    include: [
      {
        association: 'user',
      },
    ],
  });
}

export async function acceptFriendRequest(id_user_friend) {
  const userFriend = await UserFriend.findByPk(id_user_friend);
  if (!userFriend) throw new Error('Cannot user friend with specified id.');

  // If 'A' friend with 'B', 'B' also friend with 'A'
  const { id_friend, id_user } = userFriend;
  await UserFriend.findOrCreate({
    where: { id_user: id_friend, id_friend: id_user, status: CONFIRMED },
  });
  return UserFriend.update(
    { status: CONFIRMED },
    {
      where: {
        id_user_friend,
      },
    }
  );
}
