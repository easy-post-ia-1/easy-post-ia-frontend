import { CompanySocialStatus, AdaptedCompanySocialStatus } from '@models/social.model';

export const createCompanySocialStatusAdapter = (data: CompanySocialStatus): AdaptedCompanySocialStatus => {
  if (!data || !data.social_networks) {
    return {
      networks: []
    };
  }

  const networks = Object.entries(data.social_networks).map(([name, status]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
    hasCredentials: status.has_credentials
  }));

  return {
    networks
  };
};
