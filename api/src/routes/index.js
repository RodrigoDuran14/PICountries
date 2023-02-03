const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Countries = require('./Countries');
const Activities = require('./Activities');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/activities', Activities);
router.use('/countries', Countries);

module.exports = router;