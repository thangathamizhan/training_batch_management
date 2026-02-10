import express from 'express'
import userRoutes from '../routes/userRoutes.js'
import { courseRoute } from '../routes/courseRoutes.js'
import { trainerRoutes } from '../routes/trainerRoutes.js'
import skilroute from '../routes/skillRoutes.js'

 export const centralRoute =express.Router()


centralRoute.use('/users',userRoutes)
centralRoute.use('/admin/course',courseRoute) 
centralRoute.use('/admin/trainer',trainerRoutes)
centralRoute.use('/admin/skill',skilroute)