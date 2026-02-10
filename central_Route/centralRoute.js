import express from 'express'
import userRoutes from '../routes/userRoutes.js'
import { trainerRoutes } from '../routes/trainerRoutes.js'
import skilroute from '../routes/skillRoutes.js'
import { courseRoutes } from '../routes/courseRoutes.js'

 export const centralRoute =express.Router()


centralRoute.use('/users',userRoutes)
centralRoute.use('/admin/course',courseRoutes) 
centralRoute.use('/admin/trainer',trainerRoutes)
centralRoute.use('/admin/skill',skilroute)