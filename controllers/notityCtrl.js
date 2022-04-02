const Notifies = require("../models/notifyModel");

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      const notify = await new Notifies({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });
      await notify.save();
      return res.json({ notify });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });
      return res.json({ notify });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = notifyCtrl;
