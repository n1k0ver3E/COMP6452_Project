import { Document } from 'mongoose'

export interface addProduct {
    productName: string;
    productLocation: string;
    plantingDate: string;
    harvestDate: string;
}