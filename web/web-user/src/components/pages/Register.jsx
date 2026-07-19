// Packages
import { useState } from 'react';

// Style
import style from '../../style/pages/Register.module.css';

// Files
import TextInput from '../../../../shared/utils/TextInput.jsx';
import EmailInput from '../../../../shared/utils/EmailInput.jsx';
import PasswordInput from '../../../../shared/utils/PasswordInput.jsx';
import Button from '../../../../shared/utils/Button.jsx';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(username, email, password, confirmPassword)

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:  username,
          email:  email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong... {try}")
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err || 'Something went wrong... {catch}');
    }
  };

  return (
    <form onSubmit={handleRegister} className={style.Register}>
      <TextInput
        label="Username"
        name="username"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <EmailInput
        label="E-mail address"
        name="email"
        value={email}
        placeholder="E-mail address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        label="Password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        confirmPassword={true}
      />
      <Button type="submit" value="Submit"></Button>
    </form>
  );
};
export default Register;
