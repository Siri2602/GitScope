const router = require('express').Router();
const {
  analyzeProfile,
  getAllProfiles,
  getProfile,
  getTopDevelopers,
  searchByLanguage,
} = require('../controllers/profileController');

router.post('/analyze/:username', analyzeProfile);
router.get('/profiles', getAllProfiles);
router.get('/profile/:username', getProfile);
router.get('/top-developers', getTopDevelopers);
router.get('/search', searchByLanguage);

module.exports = router;
