export interface Account {
  id: string;
  name: string;
  type: 'banco' | 'inversion' | 'efectivo' | 'emergencia';
  balance: number;
  currency: string;
  institution: string;
  apy?: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'gasto' | 'ingreso';
  category: string;
  concept: string;
  date: string;
  accountId: string;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // CAT anual (%)
  minPayment: number;
  dueDate: string;
  creditLimit: number;
}

export interface TelemetryEntry {
  id: string;
  date: string;
  sleepHours: number;
  energyLevel: number; // 1-10
  focusLevel: number; // 1-10
  methylphenidateMg: number; // 0, 10, 20, 30, etc.
  intakeTime?: string;
  isGuardDay: boolean;
  notes?: string;
}

export interface ENARMSpecialty {
  id: string;
  name: string;
  weight: number; // % en ENARM
  color: string;
  topicsTotal: number;
  topicsMastered: number;
}

export interface ENARMQuestion {
  id: string;
  specialtyId: string;
  specialtyName: string;
  clinicalCase: string;
  question: string;
  options: string[];
  correctIndex: number;
  gpcCitation: string;
  highYieldPearl: string;
}

export interface ENARMTopic {
  id: string;
  specialtyId: string;
  specialtyName: string;
  title: string;
  priority: 'critica' | 'alta' | 'media';
  status: 'dominado' | 'repaso' | 'critico';
  lastReviewed: string;
  nextReview: string;
  gpcRef: string;
}

export type ViewType =
  | 'dashboard'
  | 'telemetria'
  | 'finanzas-cuentas'
  | 'finanzas-gastos'
  | 'finanzas-avalancha'
  | 'enarm-ruleta'
  | 'enarm-temas'
  | 'ia-gemini'
  | 'hub-apis';
