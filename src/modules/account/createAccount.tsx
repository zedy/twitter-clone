// libs
import { useContext } from 'react';

// components
import CreateAccountFormStep1 from './createAccountFormStep1';
import CreateAccountFormStep2 from './createAccountFormPart2';
import { SignupContext, Step } from '../context/signupContext';

const CreateAccount = () => {
  const { state } = useContext(SignupContext);

  const CreateAccountCongratulations = () => (
    <div>
      <h2 className="text-3xl">Welcome to Twitter,
        <br />
        <b>{state.fields.name}</b>
      </h2>
      <p className='my-5 font-thin'>
        We have sent you an email, please click on the verification link inside the email.
      </p>
    </div>
  )

  return (
    <>
      {state.step === Step.step1 && <CreateAccountFormStep1 />}
      {state.step === Step.step2 && <CreateAccountFormStep2 />}
      {state.step === Step.step3 && <CreateAccountCongratulations />}
    </>
  );
};

export default CreateAccount;