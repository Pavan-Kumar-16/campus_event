import db from "../config/db.js";

export const checkIn = async (req, res) => {
  const { studentId, eventId } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE registrations SET status = 'attended' WHERE event_id = ? AND student_id = ?",
      [eventId, studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Not registered for this event" });
    }

    res.json({ message: "✅ Attendance marked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
