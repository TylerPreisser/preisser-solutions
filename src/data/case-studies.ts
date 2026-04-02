export interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  quote?: string;
}

export const caseStudies: CaseStudy[] = [
  // TODO: Populate from Tyler's content prompt
  // Previous site had: John C Cassidy HVAC, HG Oil Holdings
];
