import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import styled from 'styled-components';

import UsersContext from '../../context/UsersContext';
import { UsersContextTypes, LoginValues } from '../../types';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100vh;
`;

const Card = styled.div`
  width: 350px;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  padding: 20px 26px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #ffffff;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding-top: 10px;
`;

const LogoImage = styled.img`
  height: 48px;
`;

const Title = styled.h2`
  /* font-size: 21px; */
  font-weight: 400;
  margin-bottom: 18px;
  color: black;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
  color: black;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 8px;
  font-size: 13px;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  margin-bottom: 6px;
`;

const Assistance = styled.a`
  display: block;
  text-align: right;
  font-size: 12px;
  color: #007185;
  text-decoration: none;
  margin-top: -10px;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const SignInButton = styled.button`
  background-color: #e7c266;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 9px 0;
  font-weight: bold;
  font-size: 13px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e2b33c;
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 16px;
  color: black;
`;

const Checkbox = styled(Field)`
  margin-right: 6px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 8px;
`;

const Login = () => {
  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    username: '', // This will represent email now
    password: '',
    stayLoggedIn: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    const foundUser = users.find(
      (user) =>
        user.email === values.username && bcrypt.compareSync(values.password, user.password)
    );

    if (foundUser) {
      if (values.stayLoggedIn) {
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      }
      setLoggedInUser(foundUser);
      navigate('/');
    } else {
      setError('Incorrect email or password.');
    }

    setSubmitting(false);
  };

  return (
    <Page>
        <LogoWrapper>
          <LogoImage
            src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
            alt="IMDb logo"
          />
        </LogoWrapper>
      <Card>
        <Title>Sign in</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="username">Email address</Label>
              <StyledField type="email" name="username" />
              <ErrorMessage name="username" component={ErrorText} />

              <Label htmlFor="password">Password</Label>
              <StyledField type="password" name="password" />
              <ErrorMessage name="password" component={ErrorText} />
              <Assistance href="#">Password assistance</Assistance>


              <SignInButton type="submit" disabled={isSubmitting}>
                Sign in
              </SignInButton>

              <CheckboxRow>
                <Checkbox type="checkbox" name="stayLoggedIn" />
                <label htmlFor="stayLoggedIn">Keep me signed in. Details ▼</label>
              </CheckboxRow>

              {error && <ErrorText>{error}</ErrorText>}
            </Form>
          )}
        </Formik>
      </Card>
    </Page>
  );
};

export default Login;
