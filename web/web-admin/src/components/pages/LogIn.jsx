// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Style
import style from '../../style/pages/LogIn.module.css';

// Files
import Button from '../../../../shared/utils/Button.jsx';
import EmailInput from '../../../../shared/utils/EmailInput.jsx';
import PasswordInput from '../../../../shared/utils/PasswordInput.jsx';

import { useAuth } from '../../../../shared/context/authContext.jsx';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { adminLogin } = useAuth();

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await adminLogin({ email, password });

      console.log(response);

      navigate('/dashboard');
    } catch (err) {
      console.error(err || 'Something went wrong...');
    }
  };

  return (
    <div className={style.logIn}>
      <h1>Mendizabal's Blog</h1>
      <form onSubmit={handleLogIn}>
        <EmailInput
          label="E-mail address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail address"
        />
        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit" value="Log in" />
      </form>
    </div>
  );
};
export default LogIn;
