import { useState } from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function Login() {
  const [message, setMessage] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setPassword] = useState('');

  async function doLogin(event: any): Promise<void> {
    event.preventDefault();

    let obj = { login: loginName, password: loginPassword };
    let js = JSON.stringify(obj);

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}/api/login`,
        { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      let res = JSON.parse(await response.text());

      if (res.error) {
        setMessage(res.error);
      }
      else {
        let user = { token: res.token, userId: res.userId, username: res.username, email: res.email}
        localStorage.setItem('userData', JSON.stringify(user));

        setMessage('');
        window.location.href = '/';
      }
    }
    catch (error: any) {
      alert(error.toString());
      return;
    }
  };

  function handleSetLoginName(e: any): void {
    setLoginName(e.target.value);
  }

  function handleSetPassword(e: any): void {
    setPassword(e.target.value);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Overcastly</CardTitle>
        <CardDescription>Please enter your email (or username) and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Login</Label>
            <Input id="loginName" type="email" placeholder="name@example.com" required onChange={handleSetLoginName}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="loginPassword" type="password" required onChange={handleSetPassword}/>
          </div>
          <div className='flex gap-3'>
            
            <Button type="submit" className="w-full" onClick={doLogin}>
              Login
            </Button>
            
            <Link to="/register">
              <Button type="submit" variant="secondary" className="w-full">
                Register
              </Button>                
            </Link>
            
          </div>
        </div>
      </CardContent>
      <CardFooter className='justify-center align-middle'>
      {message}
      </CardFooter>
    </Card>
  );
};

export default Login;
