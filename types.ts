
import React from 'react';

export type UserRole = 'superadmin' | 'merchant' | 'cs' | 'user';

export interface User {
  id: string;
  username: string;
  email?: string;
  password?: string; // Optional for forms
  role: UserRole;
  merchantConfig?: MerchantConfig;
  creatorId?: string;
  isVerified?: boolean;
}

export type ProductType = 'physical' | 'digital_static' | 'digital_license';

export interface Product {
  id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  image?: string;
  digitalContent?: string; // For static digital (link/text)
  weight?: number; // For physical
  stock?: number;
  isActive: boolean;
  soldCount?: number;
  rating?: number;
  reviewCount?: number;
  // For license UI handling
  tempLicenses?: string[]; 
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  trx_id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  deliveredContent?: string; // The license key or download link
  shippingAddress?: string;
  ratingGiven?: boolean;
  createdAt: string;
}

export interface MerchantConfig {
  merchantName: string;
  
  // Integration Mode
  integrationMode: 'native' | 'bridge';

  // Mode 1: Native (Direct Qiospay/Nobu)
  qrisString?: string;      // The static string
  merchantCode?: string;    // From Qiospay Dashboard
  qiospayApiKey?: string;   // From Qiospay Dashboard

  // Mode 2: Bridge (Connect to external QiosLink Host)
  bridgeUrl?: string;       // URL to target create_payment.php
  bridgeMerchantId?: string;// ID on target system
  bridgeApiKey?: string;    // Secret Key on target system

  branding?: {
    customDomain?: string;
    brandColor?: string;
    logoUrl?: string;
  };
  smtp?: any;
  bioPage?: any;
}

export interface Transaction {
  id: string;
  merchantId: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  createdAt: string;
  qrString: string;
  paymentUrl?: string; 
}

export type ViewState = 'landing' | 'dashboard' | 'store' | 'orders' | 'settings' | 'wallet' | 'users';

declare global {
  interface ImportMeta {
    env: {
      VITE_API_BASE_URL?: string;
      VITE_USE_DEMO_DATA?: string;
      [key: string]: any;
    };
  }
}
