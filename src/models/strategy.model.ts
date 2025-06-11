export interface StrategyValues {
  description: string;
  fromSchedule: string;
  toSchedule: string;
}

export interface StrategyEndpoint {
  description: string;
  from_schedule: string | null;
  to_schedule: string | null;
}

export interface StatusDisplay {
  name: string;
  color: string;
}

export interface Pagination {
  page: number;
  per_page: number;
  pages: number;
  count: number;
}

export interface StrategiesResponse {
  status: {
    code: number;
    message: string;
  };
  strategies: FetchedStrategy[];
  pagination: Pagination;
}

export interface StrategyResponse {
  status: {
    code: number;
    message: string;
  };
  strategy: FetchedStrategy;
}

// Represents the raw strategy data fetched from the API
export interface FetchedStrategy {
  id: number;
  description: string;
  status: number;
  status_display: StatusDisplay;
  from_schedule: string | null;
  to_schedule: string | null;
  posts_count?: number;
  posts?: { id: number }[];
  created_at: string;
  updated_at: string;
}

// Represents the strategy data adapted for UI use
export interface Strategy extends FetchedStrategy {}

// Strategy status constants
export const STRATEGY_STATUS = {
  PENDING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  FAILED: 3
} as const;

export const STRATEGY_STATUS_DISPLAY = {
  [STRATEGY_STATUS.PENDING]: {
    name: 'Pending',
    color: '#FFA500' // Orange
  },
  [STRATEGY_STATUS.IN_PROGRESS]: {
    name: 'In Progress',
    color: '#ADD8E6' // Light Blue
  },
  [STRATEGY_STATUS.COMPLETED]: {
    name: 'Completed',
    color: '#90EE90' // Light Green
  },
  [STRATEGY_STATUS.FAILED]: {
    name: 'Failed',
    color: '#F08080' // Light Coral
  }
} as const;
