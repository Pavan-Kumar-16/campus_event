import db from "../config/db.js";

// 1. List upcoming events
export const listEvents = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, type, event_date FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Register student for event
export const registerForEvent = async (req, res) => {
  const { studentId } = req.body;
  const { id: eventId } = req.params;

  try {
    await db.query(
      "INSERT INTO registrations (event_id, student_id, status) VALUES (?, ?, 'registered')",
      [eventId, studentId]
    );
    res.json({ message: "✅ Registration successful" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Already registered for this event" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// 3. Submit feedback
export const submitFeedback = async (req, res) => {
  const { studentId, rating } = req.body;
  const { id: eventId } = req.params;

  try {
    await db.query(
      "INSERT INTO feedback (event_id, student_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating)",
      [eventId, studentId, rating]
    );
    res.json({ message: "✅ Feedback submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Event report (registrations, attendance, feedback)
export const getEventReport = async (req, res) => {
  const { id: eventId } = req.params;

  try {
    const [[registrationStats]] = await db.query(
      "SELECT COUNT(*) AS totalRegistrations FROM registrations WHERE event_id = ?",
      [eventId]
    );

    const [[attendanceStats]] = await db.query(
      "SELECT COUNT(*) AS totalAttendance FROM registrations WHERE event_id = ? AND status = 'attended'",
      [eventId]
    );

    const [[feedbackStats]] = await db.query(
      "SELECT AVG(rating) AS avgFeedback FROM feedback WHERE event_id = ?",
      [eventId]
    );

    res.json({
      totalRegistrations: registrationStats.totalRegistrations,
      totalAttendance: attendanceStats.totalAttendance,
      avgFeedback: feedbackStats.avgFeedback || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
