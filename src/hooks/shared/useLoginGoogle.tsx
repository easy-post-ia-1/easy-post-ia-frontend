import { useCallback, useEffect } from 'react';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { useGoogleLogin } from '@react-oauth/google';
import { Capacitor } from '@capacitor/core';
import { configEnv } from '@utils/environment/config_variables';

const isNative = Capacitor.isNativePlatform();

const useLoginGoogle = () => {
  const loginWeb = useGoogleLogin({
    onSuccess: (codeResponse) => console.log('CODE RESPONSE', codeResponse),
    onError: (error) => console.error('ERROR', error),
  });

  const initilizeGoogle = useCallback(async () => {
    if (isNative) {
      await SocialLogin.initialize({
        google: {
          webClientId: configEnv.VITE_GOOGLE_WEB_CLIENT_ID,
        },
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        initilizeGoogle();
      } catch (error) {
        console.error('Error initializing Google: ', error);
      }
    })();
  }, []);

  const loginGoogle = async () => {
    try {
      let response = null;
      if (isNative) {
        response = await SocialLogin.login({
          provider: 'google',
          options: {},
        });
      } else {
        // access_token
        // bearer_token
        //
        response = loginWeb();
      }

      console.log('LOGGING GOOGLE: ', response, JSON.stringify(response));
    } catch (error) {
      console.error('Error login Google: ', error);
    }
  };

  return { loginGoogle };
};

export default useLoginGoogle;
