/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  type: 'Plot' | 'Villa' | 'Apartment';
  sqft: string;
  price: string;
  location: string;
  description: string;
  imageUrl: string;
  tags: string[];
  verified: boolean;
  highlight: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  iconName: string;
  description: string;
  offsetY: string; // for isometric grid offsets
}

export interface InquiryFormInput {
  fullName: string;
  phoneNumber: string;
  email: string;
  propertyType: 'Plot' | 'Villa' | 'Apartment' | 'General';
  message: string;
}
