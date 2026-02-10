import express from 'express';
import { createBatch, deleteBatch, getAllBatches, getBatchById, updateBatch } from '../controller/batchController.js';
import { authorize } from '../middleware/role.js';
import { auth } from '../middleware/auth.js';

export const batchroutes =express.Router()

batchroutes.post('/createBatch',auth,authorize("ADMIN"),createBatch)
batchroutes.get('/getAllBatch',auth,authorize("ADMIN"),getAllBatches)
batchroutes.get('/getAllBatchById',auth,authorize("ADMIN"),getBatchById)
batchroutes.patch('/updateBatch',auth,authorize("ADMIN"),updateBatch)
batchroutes.delete('/deleteBatch',auth,authorize("ADMIN"),deleteBatch)
