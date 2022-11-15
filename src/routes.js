import { Router } from 'express'

const router = Router()

// AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// MY | PROFILE
router.get('/api/my/profile', (await import('./controllers/api/my/profile/show.js')).default)
router.put('/api/my/profile', (await import('./controllers/api/my/profile/update.js')).default)

// MY | WEIGHT
router.get('/api/my/weight', (await import('./controllers/api/my/weight/index.js')).default)
router.post('/api/my/weight', (await import('./controllers/api/my/weight/create.js')).default)

// MY | WORKOUT
router.get('/api/my/workout', (await import('./controllers/api/my/workout/index.js')).default)
router.post('/api/my/workout', (await import('./controllers/api/my/workout/create.js')).default)
router.put('/api/my/workout/:id', (await import('./controllers/api/my/workout/update.js')).default)
router.delete('/api/my/workout/:id', (await import('./controllers/api/my/workout/delete.js')).default)

router.use((req, res) => res.status(404).json({ message: 'Page Not Found' }))

export default router
