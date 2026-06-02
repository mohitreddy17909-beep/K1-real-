/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Metric } from './types';

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: '100% Transparent Marketing',
    description: 'We believe in outright clarity. Every cost component, development schedule, and layout document is fully accessible upfront without hidden charges or commissions.',
    iconName: 'Eye',
    benefits: ['Zero Hidden Charges & Costs', 'Direct Developer Pricing', 'Upfront Plot Boundary Allotment']
  },
  {
    id: 'srv-2',
    title: 'Comprehensive Legal Clearance',
    description: 'Every plot or villa marked on the K1 portal passes through a thorough search check. We index complete title flow records, link documents, and DTCP/CRDA approvals.',
    iconName: 'ShieldCheck',
    benefits: ['100% Litigation-Free Guarantee', 'CRDA & DTCP Verification', 'Title-Search Certificates']
  },
  {
    id: 'srv-3',
    title: 'Strategic Digital Ad Campaigns',
    description: 'Our proprietary marketing engine launches interactive campaigns that laser-target NRI families and premium investors, multiplying views cleanly and efficiently.',
    iconName: 'Megaphone',
    benefits: ['NRI Targeting Pipelines', 'Hyper-Local Targeting', 'Interactive Digital Pushes']
  },
  {
    id: 'srv-4',
    title: 'Direct Physical Site Inspections',
    description: 'We facilitate comfortable, chauffeured guided tours of layouts so you can examine plot alignments and real ground progress first-hand.',
    iconName: 'Car',
    benefits: ['Chauffeured Site Drives', 'On-Field Physical Spot Markers', 'Detailed Layout Handouts']
  }
];

export const METRICS: Metric[] = [
  {
    id: 'met-1',
    label: 'Premium Landed Plots',
    value: '150+',
    iconName: 'LayoutGrid',
    description: 'Pridely vetted residential layouts and premium villa landholdings.',
    offsetY: 'translate-y-0 hover:-translate-y-4'
  },
  {
    id: 'met-2',
    label: 'Clear Title Deeds',
    value: '100%',
    iconName: 'CheckCircle2',
    description: 'Rigorous title audits. Zero property listing carries litigation risk.',
    offsetY: 'translate-y-4 hover:-translate-y-1'
  },
  {
    id: 'met-3',
    label: 'Transparent Dealings',
    value: '100%',
    iconName: 'Eye',
    description: 'Bypassing intermediaries for pure, uninflated developer prices.',
    offsetY: 'translate-y-12 hover:translate-y-7'
  }
];
