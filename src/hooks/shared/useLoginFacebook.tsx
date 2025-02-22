import { useCallback, useEffect } from 'react';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { useFacebookLogin } from '@kazion/react-facebook-login';
import { Capacitor } from '@capacitor/core';
import { configEnv } from '@utils/environment/config_variables';

const isNative = Capacitor.isNativePlatform();

const useLoginFacebook = () => {
  const loginWeb = useFacebookLogin({
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (error) => console.error('ERROR', error),
  });

  const initilizeFacebook = useCallback(async () => {
    if (isNative) {
      await SocialLogin.initialize({
        facebook: {
          appId: configEnv.VITE_FACEBOOK_APP_ID,
          clientToken: configEnv.VITE_FACEBOOK_CLIENT_TOKEN,
        },
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        initilizeFacebook();
      } catch (error) {
        console.log('Error initializing Facebook ', error);
      }
    })();
  }, []);

  const loginFacebook = async () => {
    let response = null;
    if (isNative) {
      try {
        const { result = {} } = await SocialLogin.login({
          provider: 'facebook',
          options: {
            permissions: ['email', 'public_profile'],
          },
        });

        const token = result?.accessToken?.token;
        const profile = result?.profile;

        response = { token, profile };
        console.log('Token: ', token, profile);
      } catch (error) {
        console.error('Error login Facebook: ', error);
      }
    } else {
      response = loginWeb();
    }

    console.log('LOGGING FACEBOOK: ', response, JSON.stringify(response));
  };

  return { loginFacebook };
};

export default useLoginFacebook;
