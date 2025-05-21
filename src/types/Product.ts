// src/types/Product.ts

export interface Dimension {
  depth: number;
  height: number;
  width: number;
}

export interface Meta {
  barcode: string;
  createdAt: string; // ISO date string
  qrCode: string;
  updatedAt: string; // ISO date string
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  warrantyInformation: string;
  returnPolicy: string;
  shippingInformation: string;
  sku: string;
  weight: number;
  dimensions: Dimension;
  meta: Meta;
  images: string[];
  thumbnail: string;
  tags: string[];
  reviews: Review[];
}
