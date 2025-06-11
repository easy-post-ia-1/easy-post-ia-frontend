import { StatusSuccess } from './api.model'; // Assuming StatusSuccess is already defined

export interface TwitterStatus {
  has_credentials: boolean;
}

export interface SocialNetworks {
  twitter: TwitterStatus;
  // Add other social networks here if they become available in the API
  // e.g., facebook?: FacebookStatus;
}

export interface CompanySocialStatusResponse {
  status: StatusSuccess;
  social_networks: SocialNetworks;
}

// It might also be useful to have a more generic type for individual social network status
export interface SocialNetworkCredentialStatus {
  has_credentials: boolean;
}

// And a type for the social_networks object that can be indexed by string
export interface SocialNetworkProviders {
  [key: string]: SocialNetworkCredentialStatus;
}

// Update CompanySocialStatusResponse to use SocialNetworkProviders
export interface CompanySocialStatusResponseUpdated {
  status: StatusSuccess;
  social_networks: SocialNetworkProviders;
}

// New interfaces for adapted data
export interface AdaptedSocialNetworkEntry {
  name: string; // e.g., "Twitter"
  hasCredentials: boolean;
  // key: string; // keep original key for reference if needed e.g. for test ids
}

export interface AdaptedCompanySocialStatus {
  networks: AdaptedSocialNetworkEntry[];
  // Add other top-level properties here if the adapter introduces them
}

export interface SocialNetworkStatus {
  has_credentials: boolean;
}

export interface CompanySocialStatus {
  social_networks: {
    [key: string]: SocialNetworkStatus;
  };
}

export interface SocialNetwork {
  name: string;
  hasCredentials: boolean;
}

export interface AdaptedCompanySocialStatus {
  networks: SocialNetwork[];
}
