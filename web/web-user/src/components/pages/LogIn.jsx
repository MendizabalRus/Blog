// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Style
import style from '../../style/pages/LogIn.module.css';

// Files
import Button from '../../../../shared/utils/Button.jsx';
import EmailInput from '../../../../shared/utils/EmailInput.jsx';
import PasswordInput from '../../../../shared/utils/PasswordInput.jsx';
import { useAuth } from "../../../../shared/context/authContext.jsx";

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log("web submit")

    try {
        const response = await login({email, password});
        console.log(response);
        navigate("/");
    
    } catch (err) {
        console.error(err || "Something went wrong... {catch}")
    }
  }

  return (
    <form onSubmit={handleLogIn} className={style.LogIn}>
      <EmailInput
        label="E-mail address"
        placeholder="E-mail address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" value="Log In" />
    </form>
  );
};
export default LogIn;
