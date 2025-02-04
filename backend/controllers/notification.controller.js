import Notification from "../models/notification.model.js";

export const getnotif = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });
    //iykyk just updated shiis
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    console.log("get Notif Controller Error", error.message);
    res.status(500).json({ error: "cant get notifications controller" });
  }
};
export const deletenotif = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    //no need to store what wont be used further
    res.status(200).json({
      message: "Notifications are gone yeaoi",
    });
    //ez one
  } catch (error) {
    console.log("delete Notif Controller Error", error.message);
    res.status(500).json({ error: "cant delete notifications controller" });
  }
};
