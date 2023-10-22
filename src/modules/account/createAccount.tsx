import { useContext } from 'react';
import CreateAccountForm from '../account/createAccountForm';
import { SignupContext, Step } from '../context/signupContext';

const CreateAccount = () => {
  const { step, name } = useContext(SignupContext);

  const CreateAccountCongratulations = () => (
    <div>
      <h2 className="text-3xl">Welcome to Twitter,
        <br />
        <b>{name}</b>
      </h2>
      <p className='my-5 font-thin'>
        We have sent you an email, please click on the verification link inside the email.
      </p>
    </div>
  )

  return step === Step.step2 ? <CreateAccountForm /> : <CreateAccountCongratulations />;
};

export default CreateAccount;