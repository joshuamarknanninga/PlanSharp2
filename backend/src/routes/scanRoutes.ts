import { Router } from 'express';
import multer from 'multer';
import { searchScans, uploadScan } from '../controllers/scanController';
import { auth } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, upload.single('file'), uploadScan);
router.get('/search', auth, searchScans);

export default router;
