import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import login from "./container/User"


const RequireAuth = (Component) => (props) => withAuthenticator(Component, {
    components: {
      Header: login.Header,
      SignIn: {
        Header: login.SignInHeader,
        Footer: login.SignInFooter
      },
      Footer: login.Footer
    }
  })({...props});

export default RequireAuth;