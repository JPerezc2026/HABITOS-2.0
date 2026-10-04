import { Account, Transaction, Debt, TelemetryEntry, ENARMSpecialty, ENARMQuestion, ENARMTopic } from '../types';

const STORAGE_KEYS = {
  ACCOUNTS: 'nucleo_accounts_v4',
  TRANSACTIONS: 'nucleo_transactions_v4',
  DEBTS: 'nucleo_debts_v4',
  TELEMETRY: 'nucleo_telemetry_v4',
  TOPICS: 'nucleo_topics_v4',
  GUARD_MODE: 'nucleo_guard_mode_v4',
  XP: 'nucleo_user_xp_v4',
};

// Initial Tactical Seed Data
export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc_1',
    name: 'BBVA Nómina Táctica',
    type: 'banco',
    balance: 18450,
    currency: 'MXN',
    institution: 'BBVA',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_2',
    name: 'Nu Cajita Líquida (13.5% Rendimiento)',
    type: 'inversion',
    balance: 38200,
    currency: 'MXN',
    institution: 'Nu México',
    apy: 13.5,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_3',
    name: 'Hey Banco Fondo Cetes 28d',
    type: 'inversion',
    balance: 15000,
    currency: 'MXN',
    institution: 'Hey Banco',
    apy: 11.2,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_4',
    name: 'Efectivo Operativo Hospital',
    type: 'efectivo',
    balance: 2850,
    currency: 'MXN',
    institution: 'Billetera Táctica',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_5',
    name: 'Fondo Blindaje Emergencias',
    type: 'emergencia',
    balance: 45000,
    currency: 'MXN',
    institution: 'GBM+ Smart Cash',
    apy: 9.0,
    lastUpdated: new Date().toISOString(),
  },
];

export const INITIAL_DEBTS: Debt[] = [
  {
    id: 'debt_1',
    name: 'Tarjeta Banorte Platinum',
    balance: 24800,
    interestRate: 68.4, // CAT alto -> Primer objetivo avalancha
    minPayment: 1450,
    dueDate: '2026-10-18',
    creditLimit: 60000,
  },
  {
    id: 'debt_2',
    name: 'Tarjeta BBVA Oro Médica',
    balance: 13600,
    interestRate: 54.2,
    minPayment: 890,
    dueDate: '2026-10-24',
    creditLimit: 35000,
  },
  {
    id: 'debt_3',
    name: 'Crédito Personal Equipamiento',
    balance: 48000,
    interestRate: 22.5,
    minPayment: 2150,
    dueDate: '2026-10-30',
    creditLimit: 50000,
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    amount: 185,
    type: 'gasto',
    category: 'Alimentación Guardia',
    concept: 'Cena cafetería médica + café espresso',
    date: '2026-10-04T12:30:00',
    accountId: 'acc_4',
  },
  {
    id: 'tx_2',
    amount: 350,
    type: 'gasto',
    category: 'Transporte',
    concept: 'Uber nocturno regreso de turno',
    date: '2026-10-03T21:15:00',
    accountId: 'acc_1',
  },
  {
    id: 'tx_3',
    amount: 1200,
    type: 'gasto',
    category: 'Material ENARM',
    concept: 'Banco simulacros Pro-ENARM 2026',
    date: '2026-10-02T10:00:00',
    accountId: 'acc_1',
  },
  {
    id: 'tx_4',
    amount: 850,
    type: 'gasto',
    category: 'Farmacia / Salud',
    concept: 'Metilfenidato 20mg liberacion prolongada',
    date: '2026-10-01T16:20:00',
    accountId: 'acc_1',
  },
  {
    id: 'tx_5',
    amount: 16500,
    type: 'ingreso',
    category: 'Honorarios / Residencia',
    concept: 'Depósito quincenal plaza hospitalaria',
    date: '2026-09-30T09:00:00',
    accountId: 'acc_1',
  },
];

export const INITIAL_TELEMETRY: TelemetryEntry[] = [
  {
    id: 'tel_1',
    date: '2026-10-04',
    sleepHours: 7.2,
    energyLevel: 8,
    focusLevel: 9,
    methylphenidateMg: 20,
    intakeTime: '07:30',
    isGuardDay: false,
    notes: 'Sueño reparador, sesión matutina de preguntas ENARM completada sin fatiga.',
  },
  {
    id: 'tel_2',
    date: '2026-10-03',
    sleepHours: 4.8,
    energyLevel: 5,
    focusLevel: 6,
    methylphenidateMg: 10,
    intakeTime: '08:00',
    isGuardDay: true,
    notes: 'Guardia pesada en urgencias. 3 ingresos de choque séptico.',
  },
  {
    id: 'tel_3',
    date: '2026-10-02',
    sleepHours: 6.5,
    energyLevel: 7,
    focusLevel: 8,
    methylphenidateMg: 20,
    intakeTime: '07:45',
    isGuardDay: false,
    notes: 'Buen rendimiento en repaso de cardiología.',
  },
  {
    id: 'tel_4',
    date: '2026-10-01',
    sleepHours: 8.0,
    energyLevel: 9,
    focusLevel: 9,
    methylphenidateMg: 20,
    intakeTime: '08:00',
    isGuardDay: false,
    notes: 'Descanso total post-guardia. Concentración óptima.',
  },
  {
    id: 'tel_5',
    date: '2026-09-30',
    sleepHours: 5.0,
    energyLevel: 6,
    focusLevel: 7,
    methylphenidateMg: 10,
    intakeTime: '07:15',
    isGuardDay: true,
    notes: 'Jornada nocturna activa. Repaso de temas en ratos muertos.',
  },
  {
    id: 'tel_6',
    date: '2026-09-29',
    sleepHours: 7.0,
    energyLevel: 8,
    focusLevel: 8,
    methylphenidateMg: 20,
    intakeTime: '07:30',
    isGuardDay: false,
    notes: 'Simulacro de pediatría con 84% de aciertos.',
  },
];

export const ENARM_SPECIALTIES: ENARMSpecialty[] = [
  { id: 'med_int', name: 'Medicina Interna', weight: 32, color: '#36d7d0', topicsTotal: 48, topicsMastered: 36 },
  { id: 'cirugia', name: 'Cirugía General', weight: 22, color: '#f1b84b', topicsTotal: 34, topicsMastered: 24 },
  { id: 'pediatria', name: 'Pediatría', weight: 24, color: '#65d9a5', topicsTotal: 38, topicsMastered: 29 },
  { id: 'gineco', name: 'Ginecología y Obstetricia', weight: 22, color: '#ef7085', topicsTotal: 32, topicsMastered: 23 },
];

export const ENARM_QUESTIONS: ENARMQuestion[] = [
  {
    id: 'q_1',
    specialtyId: 'med_int',
    specialtyName: 'Medicina Interna',
    clinicalCase:
      'Masculino de 54 años con DM2 de 12 años de evolución, acude a urgencias con polidipsia severa, vómito y respiración de Kussmaul. Laboratorios: Glucosa 480 mg/dL, pH arterial 7.18, HCO3 11 mEq/L, Anion Gap 21 mEq/L, Cetonas en suero positivas 4+, K+ sérico de 3.2 mEq/L.',
    question: 'De acuerdo con la GPC CENETEC para Cetoacidosis Diabética, ¿cuál es la conducta terapéutica INMEDIATA?',
    options: [
      'Iniciar infusión de Insulina rápida IV a 0.1 UI/kg/h inmediatamente',
      'Administrar Bicarbonato de Sodio 100 mEq IV para corregir el pH severo',
      'Suspender o diferir insulina y reponer Potasio IV hasta alcanzar > 3.3 mEq/L con hidratación agresiva',
      'Administrar bolo de Insulina Glargina SC de 20 UI y Solución Fisiológica al 0.45%',
    ],
    correctIndex: 2,
    gpcCitation: 'GPC IMSS-238-09 / CENETEC: Diagnóstico y Tratamiento de la Cetoacidosis Diabética en Adultos',
    highYieldPearl:
      '¡REGLA DE ORO ENARM! Si el potasio sérico es < 3.3 mEq/L, NUNCA iniciar insulina porque la insulina traslada el potasio al intracelular provocando arritmias letales y paro cardiaco. Primero reponer K+ a > 3.3 mEq/L junto con fluidoterapia isotónica.',
  },
  {
    id: 'q_2',
    specialtyId: 'gineco',
    specialtyName: 'Ginecología y Obstetricia',
    clinicalCase:
      'Primigesta de 32 semanas de gestación es traída a urgencias por cefalea intensa persistente, fosfenos y dolor en hipocondrio derecho. TA: 165/110 mmHg tomada en dos ocasiones. Proteinuria en tira reactiva +++. Reflejos osteotendinosos exaltados (clonus 2 batidas).',
    question: '¿Cuál es el fármaco de elección para la profilaxis de crisis convulsivas según la GPC CENETEC y su dosis de impregnación?',
    options: [
      'Diazepam 10 mg IV en bolo lento',
      'Sulfato de Magnesio 4 g IV en infusión durante 20 minutos (Esquema Zuspan)',
      'Difenilhidantoína 15-18 mg/kg IV en infusión lenta',
      'Labetalol 20 mg IV en bolo directo',
    ],
    correctIndex: 1,
    gpcCitation: 'GPC IMSS-058-08 / CENETEC: Prevención, Diagnóstico y Manejo de la Preeclampsia/Eclampsia',
    highYieldPearl:
      'El Sulfato de Magnesio es el neuroprotector y anticonvulsivante de elección absoluta en Preeclampsia con Criterios de Severidad. Esquema Zuspan: Impregnación 4g IV en 20 min, seguido de mantenimiento 1 g/h. Antídoto ante intoxicación: Gluconato de Calcio al 10% 1g IV.',
  },
  {
    id: 'q_3',
    specialtyId: 'cirugia',
    specialtyName: 'Cirugía General',
    clinicalCase:
      'Femenina de 24 años acude con dolor periumbilical de 14 horas que migró a fosa ilíaca derecha. Presenta náusea, anorexia, fiebre de 38.2°C, signo de McBurney (+), Blumberg (+) y signo del Psoas (+). Leucocitosis de 15,200/mm3 con 85% de neutrófilos.',
    question: 'Con base en la Escala de Alvarado modificada y la GPC CENETEC para Apendicitis Aguda, ¿cuál es la conducta más adecuada?',
    options: [
      'Realizar Tomografía Computarizada abdominal con doble contraste antes de cualquier decisión',
      'Puntaje de Alvarado >= 7: Indicar valoración e intervención quirúrgica inmediata (Apendicectomía)',
      'Tratamiento médico exclusivo con Ceftriaxona y Metronidazol ambulatorio',
      'Realizar Ecografía pélvica seriada cada 6 horas y alta si no hay líquido libre',
    ],
    correctIndex: 1,
    gpcCitation: 'GPC SS-031-08 / CENETEC: Diagnóstico y Tratamiento Quirúrgico de la Apendicitis Aguda',
    highYieldPearl:
      'En adultos jóvenes con cuadro clínico clásico y Alvarado >= 7 (dolor migratorio, anorexia, náusea, rebote, fiebre, leucocitosis, desviación a la izquierda), la conducta es QUIRÚRGICA DIRECTA. Los estudios de imagen se reservan para casos atípicos o dudosos (Alvarado 4-6).',
  },
  {
    id: 'q_4',
    specialtyId: 'pediatria',
    specialtyName: 'Pediatría',
    clinicalCase:
      'Lactante de 14 meses es llevado por cuadro de 3 días de tos seca, rinorrea y febrícula, que en las últimas horas progresa a estridor laríngeo inspiratorio audible en reposo, tos traqueal ("perruna") y tiraje intercostal leve. No presenta cianosis ni sialorrea.',
    question: 'Según la GPC CENETEC para Laringotraqueítis (Crup), ¿cuál es el tratamiento farmacológico pilar de primera línea?',
    options: [
      'Amoxicilina con Ácido Clavulánico 90 mg/kg/día por 10 días',
      'Dexametasona dosis única oral/IM (0.6 mg/kg) + Nebulización con Adrenalina racémica o L-adrenalina',
      'Salbutamol en aerosol con cámara espaciadora cada 4 horas',
      'Intubación orotraqueal inmediata bajo sedación profunda',
    ],
    correctIndex: 1,
    gpcCitation: 'GPC IMSS-090-08 / CENETEC: Diagnóstico y Manejo de la Laringotraqueítis Aguda en Niños',
    highYieldPearl:
      'El tratamiento angular de todo Crup (leve, moderado o grave) es el corticoide sistémico (Dexametasona 0.6 mg/kg VO o IM dosis única). Si hay estridor en reposo (moderado a grave), se añade nebulización con Adrenalina (L-adrenalina 1:1000 0.5 ml/kg o 4 ml directos). Observar 2 horas por efecto rebote.',
  },
  {
    id: 'q_5',
    specialtyId: 'med_int',
    specialtyName: 'Medicina Interna',
    clinicalCase:
      'Hombre de 61 años acude por dolor torácico retroesternal opresivo de 45 minutos de evolución, irradiado a mandíbula y brazo izquierdo, diaforesis profusa. ECG a los 7 minutos muestra elevación del segmento ST de 3 mm en derivaciones V1 a V4.',
    question: 'Se encuentra en un hospital comunitario donde el tiempo estimado de traslado a sala de hemodinamia es de 140 minutos. Según la GPC CENETEC de IAM CEST, ¿cuál es la conducta?',
    options: [
      'Esperar y trasladar para realizar Angioplastia Coronaria Primaria independientemente del tiempo',
      'Iniciar Fibrinólisis intravenosa inmediata (tiempo puerta-aguja < 30 min) con Tenecteplasa o Alteplasa',
      'Administrar únicamente Heparina de bajo peso molecular y nitroglicerina sublingual',
      'Realizar prueba de esfuerzo antes de trombolizar',
    ],
    correctIndex: 1,
    gpcCitation: 'GPC IMSS-357-10 / CENETEC: Diagnóstico y Tratamiento del Infarto Agudo de Miocardio con Elevación del ST',
    highYieldPearl:
      'Si el tiempo previsto desde el primer contacto médico hasta el inflado del balón (tiempo puerta-balón) es > 120 minutos, la recomendación estricta es FIBRINÓLISIS INMEDIATA con agente fibrinoespecífico (Tenecteplasa bolo único o Alteplasa) dentro de los primeros 30 minutos (puerta-aguja < 30 min).',
  },
];

export const INITIAL_TOPICS: ENARMTopic[] = [
  { id: 'top_1', specialtyId: 'med_int', specialtyName: 'Medicina Interna', title: 'Cetoacidosis Diabética y EHH', priority: 'critica', status: 'dominado', lastReviewed: '2026-10-02', nextReview: '2026-10-09', gpcRef: 'IMSS-238-09' },
  { id: 'top_2', specialtyId: 'med_int', specialtyName: 'Medicina Interna', title: 'Síndrome Coronario Agudo (IAM CEST/SEST)', priority: 'critica', status: 'dominado', lastReviewed: '2026-10-01', nextReview: '2026-10-08', gpcRef: 'IMSS-357-10' },
  { id: 'top_3', specialtyId: 'med_int', specialtyName: 'Medicina Interna', title: 'Choque Séptico y Resucitación Hemodinámica', priority: 'critica', status: 'repaso', lastReviewed: '2026-09-28', nextReview: '2026-10-05', gpcRef: 'IMSS-466-11' },
  { id: 'top_4', specialtyId: 'med_int', specialtyName: 'Medicina Interna', title: 'Enfermedad Vascular Cerebral Isquémica', priority: 'alta', status: 'repaso', lastReviewed: '2026-09-25', nextReview: '2026-10-06', gpcRef: 'IMSS-170-09' },
  { id: 'top_5', specialtyId: 'gineco', specialtyName: 'Ginecología y Obstetricia', title: 'Preeclampsia con Criterios de Severidad', priority: 'critica', status: 'dominado', lastReviewed: '2026-10-03', nextReview: '2026-10-10', gpcRef: 'IMSS-058-08' },
  { id: 'top_6', specialtyId: 'gineco', specialtyName: 'Ginecología y Obstetricia', title: 'Hemorragia Posparto (Código Mater)', priority: 'critica', status: 'repaso', lastReviewed: '2026-09-27', nextReview: '2026-10-05', gpcRef: 'IMSS-162-09' },
  { id: 'top_7', specialtyId: 'cirugia', specialtyName: 'Cirugía General', title: 'Apendicitis Aguda y Escalas Diagnósticas', priority: 'critica', status: 'dominado', lastReviewed: '2026-10-02', nextReview: '2026-10-12', gpcRef: 'SS-031-08' },
  { id: 'top_8', specialtyId: 'cirugia', specialtyName: 'Cirugía General', title: 'Colecistitis y Colangitis Aguda (Tokio 2018)', priority: 'alta', status: 'critico', lastReviewed: '2026-09-20', nextReview: '2026-10-04', gpcRef: 'IMSS-237-09' },
  { id: 'top_9', specialtyId: 'cirugia', specialtyName: 'Cirugía General', title: 'Trauma de Tórax: Neumotórax a Tensión', priority: 'critica', status: 'dominado', lastReviewed: '2026-09-29', nextReview: '2026-10-07', gpcRef: 'IMSS-624-13' },
  { id: 'top_10', specialtyId: 'pediatria', specialtyName: 'Pediatría', title: 'Laringotraqueítis (Crup) y Bronquiolitis', priority: 'alta', status: 'dominado', lastReviewed: '2026-10-01', nextReview: '2026-10-11', gpcRef: 'IMSS-090-08' },
  { id: 'top_11', specialtyId: 'pediatria', specialtyName: 'Pediatría', title: 'Sepsis Neonatal Temprana y Tardía', priority: 'critica', status: 'repaso', lastReviewed: '2026-09-26', nextReview: '2026-10-05', gpcRef: 'IMSS-288-10' },
  { id: 'top_12', specialtyId: 'pediatria', specialtyName: 'Pediatría', title: 'Deshidratación y Terapia de Rehidratación Oral (Planes A, B, C)', priority: 'critica', status: 'dominado', lastReviewed: '2026-09-30', nextReview: '2026-10-14', gpcRef: 'IMSS-156-08' },
];

export class NucleoStorage {
  static getAccounts(): Account[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS));
      return INITIAL_ACCOUNTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ACCOUNTS;
    }
  }

  static saveAccounts(accounts: Account[]) {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }

  static getTransactions(): Transaction[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  }

  static saveTransactions(transactions: Transaction[]) {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }

  static addTransaction(tx: Omit<Transaction, 'id'>): Transaction {
    const transactions = this.getTransactions();
    const newTx: Transaction = {
      ...tx,
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    const updated = [newTx, ...transactions];
    this.saveTransactions(updated);

    // Update account balance
    const accounts = this.getAccounts();
    const accountIndex = accounts.findIndex((a) => a.id === tx.accountId);
    if (accountIndex >= 0) {
      if (tx.type === 'gasto') {
        accounts[accountIndex].balance -= tx.amount;
      } else {
        accounts[accountIndex].balance += tx.amount;
      }
      accounts[accountIndex].lastUpdated = new Date().toISOString();
      this.saveAccounts(accounts);
    }

    return newTx;
  }

  static getDebts(): Debt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DEBTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DEBTS, JSON.stringify(INITIAL_DEBTS));
      return INITIAL_DEBTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_DEBTS;
    }
  }

  static saveDebts(debts: Debt[]) {
    localStorage.setItem(STORAGE_KEYS.DEBTS, JSON.stringify(debts));
  }

  static getTelemetry(): TelemetryEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TELEMETRY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(INITIAL_TELEMETRY));
      return INITIAL_TELEMETRY;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TELEMETRY;
    }
  }

  static saveTelemetry(telemetry: TelemetryEntry[]) {
    localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(telemetry));
  }

  static addOrUpdateTodayTelemetry(entry: Omit<TelemetryEntry, 'id'>): TelemetryEntry {
    const all = this.getTelemetry();
    const todayStr = entry.date;
    const existingIndex = all.findIndex((e) => e.date === todayStr);

    let resultEntry: TelemetryEntry;
    if (existingIndex >= 0) {
      resultEntry = { ...all[existingIndex], ...entry };
      all[existingIndex] = resultEntry;
    } else {
      resultEntry = {
        ...entry,
        id: `tel_${Date.now()}`,
      };
      all.unshift(resultEntry);
    }

    this.saveTelemetry(all);
    this.addXp(30);
    return resultEntry;
  }

  static getTopics(): ENARMTopic[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPICS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(INITIAL_TOPICS));
      return INITIAL_TOPICS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TOPICS;
    }
  }

  static saveTopics(topics: ENARMTopic[]) {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  }

  static getGuardMode(): boolean {
    return localStorage.getItem(STORAGE_KEYS.GUARD_MODE) === 'true';
  }

  static setGuardMode(enabled: boolean) {
    localStorage.setItem(STORAGE_KEYS.GUARD_MODE, enabled ? 'true' : 'false');
  }

  static getXp(): number {
    const val = localStorage.getItem(STORAGE_KEYS.XP);
    return val ? parseInt(val, 10) : 3450;
  }

  static addXp(amount: number): number {
    const current = this.getXp();
    const next = current + amount;
    localStorage.setItem(STORAGE_KEYS.XP, next.toString());
    return next;
  }

  // Financial Calculations
  static calculateFinancials() {
    const accounts = this.getAccounts();
    const debts = this.getDebts();
    const transactions = this.getTransactions();

    const totalLiquidity = accounts.reduce((acc, a) => acc + a.balance, 0);
    const immediateCash = accounts
      .filter((a) => a.type === 'banco' || a.type === 'efectivo')
      .reduce((acc, a) => acc + a.balance, 0);
    const totalDebt = debts.reduce((acc, d) => acc + d.balance, 0);
    const totalMinPayments = debts.reduce((acc, d) => acc + d.minPayment, 0);

    // Current month burn rate (expenses in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyBurn = transactions
      .filter((t) => t.type === 'gasto' && new Date(t.date) >= thirtyDaysAgo)
      .reduce((acc, t) => acc + t.amount, 0) || 12400; // sensible default if few txs

    // Dinero Libre = Immediate liquid cash - min debt commitments - committed weekly reserve
    const weeklyReserve = 4500;
    const freeMoney = Math.max(0, immediateCash - totalMinPayments - weeklyReserve);

    // Runway in days (Total liquidity / daily burn)
    const dailyBurn = monthlyBurn / 30;
    const runwayDays = dailyBurn > 0 ? Math.round(totalLiquidity / dailyBurn) : 180;

    return {
      totalLiquidity,
      immediateCash,
      totalDebt,
      totalMinPayments,
      monthlyBurn,
      freeMoney,
      runwayDays,
    };
  }

  // Avalanche Simulation
  static calculateDebtAvalanche(extraMonthlyPayment: number = 0) {
    const debts = this.getDebts();
    if (debts.length === 0) {
      return {
        avalancheMonths: 0,
        avalancheInterest: 0,
        snowballMonths: 0,
        snowballInterest: 0,
        baseMonths: 0,
        baseInterest: 0,
        interestSaved: 0,
        monthsSaved: 0,
        orderedDebts: [],
      };
    }

    // Mathematical Avalanche: Sort by highest interest rate (CAT) descending
    const avalancheSorted = [...debts].sort((a, b) => b.interestRate - a.interestRate);

    // Snowball: Sort by lowest balance ascending
    const snowballSorted = [...debts].sort((a, b) => a.balance - b.balance);

    const simulate = (list: Debt[], extra: number) => {
      let state = list.map((d) => ({
        id: d.id,
        name: d.name,
        balance: d.balance,
        rate: d.interestRate / 100 / 12, // monthly rate
        minPayment: d.minPayment,
      }));

      let months = 0;
      let totalInterest = 0;
      const maxMonths = 360;

      while (state.some((d) => d.balance > 0.01) && months < maxMonths) {
        months++;
        let availableExtra = extra;

        // Apply interest
        for (const d of state) {
          if (d.balance > 0) {
            const interest = d.balance * d.rate;
            totalInterest += interest;
            d.balance += interest;
          }
        }

        // Apply minimum payments
        for (const d of state) {
          if (d.balance > 0) {
            const pay = Math.min(d.balance, d.minPayment);
            d.balance -= pay;
          }
        }

        // Apply extra payment to first debt with positive balance
        for (const d of state) {
          if (d.balance > 0 && availableExtra > 0) {
            const pay = Math.min(d.balance, availableExtra);
            d.balance -= pay;
            availableExtra -= pay;
          }
        }
      }

      return { months, totalInterest: Math.round(totalInterest) };
    };

    const baseResult = simulate(avalancheSorted, 0);
    const extraResult = simulate(avalancheSorted, extraMonthlyPayment);
    const snowballResult = simulate(snowballSorted, extraMonthlyPayment);

    const interestSaved = Math.max(0, baseResult.totalInterest - extraResult.totalInterest);
    const monthsSaved = Math.max(0, baseResult.months - extraResult.months);

    return {
      avalancheMonths: extraResult.months,
      avalancheInterest: extraResult.totalInterest,
      snowballMonths: snowballResult.months,
      snowballInterest: snowballResult.totalInterest,
      baseMonths: baseResult.months,
      baseInterest: baseResult.totalInterest,
      interestSaved,
      monthsSaved,
      orderedDebts: avalancheSorted,
    };
  }
}
