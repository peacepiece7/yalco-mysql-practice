const express = require('express');
const sql = require('../database/sql');
const router = express.Router();

const sectionIcons = ['π', 'πΏ', 'π', 'π£', 'π₯©', 'β', 'π°'];

const statusKorMap = {
  OPN: 'μμμ€',
  CLS: 'νμ',
  VCT: 'ν΄κ°μ€',
  RMD: 'λ¦¬λͺ¨λΈλ§',
};

router.get('/', async function (req, res, next) {
  const sections = await sql.getSections();
  sections.map((item) => {
    item.icon = sectionIcons[item.section_id - 1];
  });
  res.render('sections', {
    title: 'μΉμ λͺ©λ‘',
    sections,
  });
});

router.get('/biz-simple', async function (req, res, next) {
  const businesses = await sql.getBusinessesJoined(req.query);
  businesses.map((item) => {
    item.status_kor = statusKorMap[item.status];
    return item;
  });
  businesses.map((item) => {
    item.status_kor = statusKorMap[item.status];
    return item;
  });
  res.render('biz-simple', {
    title: 'λ¨μ μλΉ λͺ©λ‘',
    businesses,
  });
});

router.get('/biz-adv', async function (req, res, next) {
  const businesses = await sql.getBusinessesJoined(req.query);
  businesses.map((item) => {
    item.status_kor = statusKorMap[item.status];
    return item;
  });
  res.render('biz-adv', {
    title: 'κ³ κΈ μλΉ λͺ©λ‘',
    q: req.query,
    businesses,
  });
});

module.exports = router;
