import HomeTour from '@components/home/HomeTour';
import { TourProvider } from '@reactour/tour';
import { useMemo } from 'react';
import { useGetAccount } from '@hooks/queries/user/useProfileQuery';
import { userUpdateProfileMutation } from '@hooks/mutations/user/userUpdateProfileMutation';

const TourController = () => {
  const { data: userProfile } = useGetAccount();
  const updateProfileMutation = userUpdateProfileMutation();

  const steps = useMemo(() => [
    {
      selector: '[data-tour="create-strategy"]',
      content: 'Here you can create a new strategy to manage your posts.',
    },
    {
      selector: '[data-tour="strategies-overview"]',
      content: 'This section provides an overview of your existing strategies.',
    },
    {
      selector: '[data-tour="calendar-view"]',
      content: 'View your scheduled posts and strategies on a calendar.',
    },
  ], []);

  const handleTourClose = async () => {
    if (!userProfile?.user?.did_tutorial) {
      console.log('Tour closed, updating tutorial status');
      try {
        await updateProfileMutation.mutateAsync({ did_tutorial: true });
        console.log('Tutorial status updated successfully');
      } catch (error) {
        console.error('Failed to update tutorial status:', error);
      }
    }
  };

  return (
    <TourProvider
      steps={steps}
      disableInteraction={true}
      onClickClose={(clickProps) => { clickProps.setIsOpen(false); handleTourClose()}}
      onClickMask={(clickProps) => { clickProps.setIsOpen(false); handleTourClose()}}
    >
      <HomeTour />
    </TourProvider>
  );
};

const Home = () => {
  return <TourController />;
};

export default Home;
