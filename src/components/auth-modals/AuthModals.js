import React, { useContext, useState } from 'react';
import Modal from '../modal/Modal';
import { getData, postData } from '../../helpers/data-helper';
import { Context } from '../../context/Context';

function AuthModals() {
    const context = useContext(Context);
    const [signInErr, setSignInErr] = useState(null);
    const [signUpErr, setSignUpErr] = useState(null);
    const [signInValues, setSignInValues] = useState({ email: '', password: '' });
    const [signUpValues, setSignUpValues] = useState({ email: '', name: '', phone: '', password: '', repeatPass: '' });

    async function signIn() {
      const { data } = await getData('users', { email: signInValues.email, password: signInValues.password }).catch();

      if (!data || !data.length) {
        setSignInErr('Wrong username or password');
        return false;
      }
      context.dispatch({ type: 'login', payload: data[0] });
      resetSignInState();
      return true;
    }

    function resetSignInState() {
        setSignInErr(null);
        setSignInValues({ email: '', password: '' });
    }

    async function signUp() {
        if (Object.keys(signUpValues).some(key => !signUpValues[key])) {
            setSignUpErr('All fields are required');
            return false;
        } else if ( signUpValues.password !== signUpValues.repeatPass) {
            setSignUpErr('Passwords don\'t match');
            return false;
        } 

        const { data } = await getData('users', { email: signUpValues.email }).catch();
        if (data && data.length) {
            setSignUpErr('Account already exists');
            return false;
        } 

        const body = { ...signUpValues, isAdmin: false };
        delete body.repeatPass;
        const res =  await postData('users', body);
        context.dispatch({ type: 'login', payload: res.data });
        resetSignUpState();
        return true;
    }

    function resetSignUpState() {
        setSignUpErr(null);
        setSignUpValues({ name: '', phone: '', email: '', password: '', repeatPass: '' });
    }

    return (
        <div>
            <Modal id="sign-in" title="Sign in" btnProps={{ text: 'Sign in', cb: signIn }} onClose={resetSignInState}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="col-form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={signInValues.email} onChange={({ target: { value: email } }) => setSignInValues({ ...signInValues, email }) }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="col-form-label">Password:</label>
                        <input type="password" className="form-control" id="password" value={signInValues.password} onChange={({ target: { value: password } }) => setSignInValues({ ...signInValues, password })}/>
                    </div>
                    <p className='text-danger'>{ signInErr }</p>
                </form>
            </Modal>

            <Modal id="sign-up" title="Sign up" btnProps={{ text: 'Sign up', cb: signUp }} onClose={resetSignUpState}>
                <form>                  
                    <div className="mb-3">
                        <label htmlFor="full-name" className="col-form-label">Full Name:</label>
                        <input type="text" className="form-control" id="full-name" value={signUpValues.name} onChange={({ target: { value: name } }) => setSignUpValues({ ...signUpValues, name }) }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="col-form-label">Phone number:</label>
                        <input type="text" className="form-control" id="phone" value={signUpValues.phone} onChange={({ target: { value: phone } }) => setSignUpValues({ ...signUpValues, phone }) }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sign-up-email" className="col-form-label">Email:</label>
                        <input type="email" className="form-control" id="sign-up-email" value={signUpValues.email} onChange={({ target: { value: email } }) => setSignUpValues({ ...signUpValues, email }) }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sign-up-password" className="col-form-label">Password:</label>
                        <input type="password" className="form-control" id="sign-up-password" value={signUpValues.password} onChange={({ target: { value: password } }) => setSignUpValues({ ...signUpValues, password }) }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repeat-password" className="col-form-label">Repeat Password:</label>
                        <input type="password" className="form-control" id="repeat-password" value={signUpValues.repeatPass} onChange={({ target: { value: repeatPass } }) => setSignUpValues({ ...signUpValues, repeatPass }) }/>
                    </div>
                    <p className='text-danger'>{ signUpErr }</p>
                </form>
            </Modal>
        </div>
    )
}

export default AuthModals
