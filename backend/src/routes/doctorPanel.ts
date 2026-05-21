import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

const router = Router();
const JWT_SECRET = process.env['JWT_SECRET'] ?? 'dev-secret-change-me';

function extractDoctorId(req: Request): string | null {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
    if (decoded.role !== 'DOCTOR') return null;
    return decoded.sub;
  } catch {
    return null;
  }
}

// GET /api/v1/doctor/patients
router.get('/patients', async (req: Request, res: Response) => {
  try {
    const doctorId = extractDoctorId(req);
    if (!doctorId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const assignments = await prisma.doctorPatient.findMany({
      where: { doctor_id: doctorId },
      include: { patient: { select: { id: true, name: true, email: true, role: true } } },
    });
    const patients = assignments.map((a) => ({
      id: a.patient.id,
      name: a.patient.name,
      email: a.patient.email,
      status: a.status,
      assigned_at: a.assigned_at,
    }));
    res.json({ data: patients });
  } catch (err) {
    console.error('Doctor patients error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/v1/doctor/patients/:id
router.get('/patients/:id', async (req: Request, res: Response) => {
  try {
    const doctorId = extractDoctorId(req);
    if (!doctorId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const assignment = await prisma.doctorPatient.findFirst({
      where: { doctor_id: doctorId, patient_id: req.params.id },
      include: { patient: { select: { id: true, name: true, email: true } } },
    });
    if (!assignment) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.json({ data: { ...assignment.patient, status: assignment.status, assigned_at: assignment.assigned_at } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const doctorPanelRoutes = router;
