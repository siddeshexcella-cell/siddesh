export enum CategoryGroup {
  CONNECTED = 'CONNECTED',
  NON_CONNECTED = 'NON-CONNECTED',
}

export interface ReportItem {
  id: string;
  label: string;
  group: CategoryGroup;
  count: number;
  color?: string; // Optional specific background color for the row (like Excel)
}

export interface ReportState {
  items: ReportItem[];
  agentName: string;
  reportDate: string;
}
