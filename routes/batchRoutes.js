import express from 'express';
import { createBatch, deleteBatch, getAllBatches, getBatchById, updateBatch } from '../controller/batchController.js';

const batchroutes =express.Router()

batchroutes.post('/createBatch',createBatch)
batchroutes.get('/getAllBatch',getAllBatches)
batchroutes.get('/getAllBatchById',getBatchById)
batchroutes.patch('/updateBatch',updateBatch)
batchroutes.delete('/deleteBatch',deleteBatch)
