// import User from "../models/User";
import User from "../models/User.js";

/** READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/** UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); // remove from me
      friend.friends = friend.friends.filter((id) => id !== id); // remove from friend
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    
    await Promise.all([user.save(), friend.save()]);
    // const updatedUser = await User.findOneAndUpdate(id, { friends: user.friends }); // same functionality as above

    const formattedFriend = friend.map(
      ({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          occupation,
          picturePath,
        };
      }
    );

    res
      .status(200)
      .json({ formattedFriend , message: "Friend added/removed successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
