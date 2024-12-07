import express from 'express';
import { provinces, districts, wards } from '../data/administrative';

const router = express.Router();

router.get('/provinces', (req, res) => {
  res.json(provinces);
});

router.get('/districts/:provinceCode', (req, res) => {
  const provinceDistricts = districts.filter(
    d => d.province_code === req.params.provinceCode
  );
  res.json(provinceDistricts);
});

router.get('/wards/:districtCode', (req, res) => {
  const districtWards = wards.filter(
    w => w.district_code === req.params.districtCode
  );
  res.json(districtWards);
});

export default router; 