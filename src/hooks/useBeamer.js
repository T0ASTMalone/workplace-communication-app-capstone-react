import { useEffect } from 'react';

const useBeamer = (beamerId) => {
  useEffect(() => {
    const resourceUrl = 'https://app.getbeamer.com/js/beamer-embed.js';
    window.beamer_config = {
      product_id: beamerId,
      selector: 'whatsnew',
      // display: 'popup',
      button: false,
      // button_position: 'bottom-right',
      language: 'EN',
      filter: 'admin',
      lazy: false,
      alert: true,
      // callback : your_callback_function,
      // ---------------Visitor Information---------------
      // user_firstname : 'firstname',
      // user_lastname : 'lastname',
      // user_email : 'email',
    };
    const script = document.createElement('script');
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [beamerId]);
};
export default useBeamer;
