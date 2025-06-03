import { CompanySocialStatusResponseUpdated, AdaptedCompanySocialStatus, AdaptedSocialNetworkEntry, SocialNetworkProviders } from '@models/social.model'; // Assuming CompanySocialStatusResponseUpdated is also in social.model or adjust import

export const createCompanySocialStatusAdapter = (
  apiResponse: CompanySocialStatusResponseUpdated | null | undefined
): AdaptedCompanySocialStatus => {
  if (!apiResponse || !apiResponse.social_networks) {
    return { networks: [] }; // Return empty array if no data
  }

  const socialNetworksData = apiResponse.social_networks as SocialNetworkProviders;
  const adaptedNetworks: AdaptedSocialNetworkEntry[] = Object.entries(socialNetworksData)
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the network name
      hasCredentials: value.has_credentials,
      // key: key, // Optionally include the original key
    }));

  return {
    networks: adaptedNetworks,
  };
};
