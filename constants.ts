import { CategoryGroup, ReportItem } from './types';

export const DEFAULT_AGENT_NAME = "Siddesh Hingad";

// Helper to format today's date like "21st November"
export const getFormattedDate = (): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  
  const suffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  return `${day}${suffix(day)} ${month}`;
};

export const INITIAL_REPORT_ITEMS: ReportItem[] = [
  // Connected Items
  { id: 'callback', label: 'Call Back', group: CategoryGroup.CONNECTED, count: 0, color: 'bg-orange-100' },
  { id: 'site_visit_done', label: 'Site Visit Done', group: CategoryGroup.CONNECTED, count: 0, color: 'bg-yellow-100' },
  { id: 'site_visit_planned', label: 'Site Visit Planned', group: CategoryGroup.CONNECTED, count: 0, color: 'bg-green-100' },
  { id: 'follow_up', label: 'Follow-up', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'not_interested', label: 'Not Interested', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'plan_dropped', label: 'Plan Dropped/plan on hold', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'possession_issue', label: 'Possession Issue', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'budget_issue', label: 'Budget Issue', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'carpet_issue', label: 'Carpet Issue', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'marketing', label: 'Marketing', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'channel_partner', label: 'Channel Partner', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'not_looking', label: 'Not looking Property', group: CategoryGroup.CONNECTED, count: 0 },
  { id: 'location_mismatch', label: 'Location Mismatch', group: CategoryGroup.CONNECTED, count: 0 },
  
  // Non-Connected Items
  { id: 'ringing', label: 'Ringing', group: CategoryGroup.NON_CONNECTED, count: 0 },
  { id: 'switched_off', label: 'Switched Off', group: CategoryGroup.NON_CONNECTED, count: 0 },
  { id: 'not_reachable', label: 'Not Reachable', group: CategoryGroup.NON_CONNECTED, count: 0 },
  { id: 'invalid_no', label: 'Invalid No.', group: CategoryGroup.NON_CONNECTED, count: 0 },
  { id: 'out_of_service', label: 'Out Of Service', group: CategoryGroup.NON_CONNECTED, count: 0 },
];
