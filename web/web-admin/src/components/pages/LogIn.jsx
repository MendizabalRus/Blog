// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Style
import style from "../../style/pages/LogIn.module.css"

// Files
import Button from '../../../../shared/utils/Button.jsx';
import EmailInput from '../../../../shared/utils/EmailInput.jsx';
import PasswordInput from '../../../../shared/utils/PasswordInput.jsx';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    const data = new FormData(e.target);
    const loginData = Object.fromEntries(data);

    try {
      const response = await fetch(
        'http://localhost:8080/api/auth/admin/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loginData }),
        },
      );

      const result = await response.json();
      console.log(result)
      
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
