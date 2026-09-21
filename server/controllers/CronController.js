const { sequelize } = require("../models");

class CronController {
  static async keepAlive(req, res, next) {
    try {
      // Vercel Cron otomatis kirim "Authorization: Bearer <CRON_SECRET>"
      if (!process.env.CRON_SECRET) {
        return res.status(500).json({ message: "Server misconfigured" });
      }

      if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        throw { name: "Unauthorized", message: "Unauthorized" };
      }

      // Query ringan biar Supabase dianggap aktif dan gak di-pause
      await sequelize.query("SELECT 1;");

      res.status(200).json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CronController;
