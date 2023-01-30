//import { useEffect } from 'react';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles'

const Authentication = () => {
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     fetchData();
    // }, []);
    // <button onClick={singInWithGoogleRedirect}>
    //             Sign in with Google Redirect
    //         </button>

    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
};

export default Authentication;