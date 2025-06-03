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

// Represents the raw strategy data fetched from the API
export interface FetchedStrategy {
  id: string | number; // Assuming ID can be number or string from API
  name: string;
  description: string;
  // Add other properties that come from the API
}

// Represents the strategy data adapted for UI use
export interface Strategy extends FetchedStrategy {
  id: string; // Ensure id is always a string for UI consistency (e.g. keys in React)
  color: string; // Added color property
}
