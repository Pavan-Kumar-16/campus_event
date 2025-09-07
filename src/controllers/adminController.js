import db from "../config/db.js";

// Event popularity (sorted by registrations)
export const eventPopularity = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.id, e.title, COUNT(r.id) AS registrations
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      GROUP BY e.id
      ORDER BY registrations DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student participation report
export const studentParticipation = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.name, COUNT(r.id) AS eventsAttended
      FROM students s
      LEFT JOIN registrations r ON s.id = r.student_id AND r.status = 'attended'
      GROUP BY s.id
      ORDER BY eventsAttended DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Top 3 most active students
export const topActiveStudents = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.name, COUNT(r.id) AS eventsAttended
      FROM students s
      LEFT JOIN registrations r ON s.id = r.student_id AND r.status = 'attended'
      GROUP BY s.id
      ORDER BY eventsAttended DESC
      LIMIT 3
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
