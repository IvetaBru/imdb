import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import styled from 'styled-components';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import UsersContext from '../../contexts/UsersContext';
import { UsersContextTypes, LoginValues } from '../../types';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 100vh;
`;

const Card = styled.div`
  width: 320px;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  padding: 20px 25px;
  color: black;
`;

const LogoWrapper = styled.div`
  margin-bottom: 10px;
`;

const LogoImage = styled.img`
  height: 48px;
  margin-top: 15px;
`;

const Title = styled.h2`
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  margin-bottom: 8px;
`;

const Assistance = styled.a`
  font-size: 12px;
  color: #2162a1;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
    color: #2162a1;
  }
`;

const SignInButton = styled.button`
  background-color: #ffd814;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 7px 0;
  font-size: 12px;
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

  label {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const Checkbox = styled(Field)`
  margin-right: 6px;
`;

const DetailsLink = styled.a`
  color: #2162a1;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 8px;
`;

const PasswordRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0 12px;
  font-size: 11px;
  color: #666;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #ccc;
    margin: 0 8px;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 7px 0;
  font-size: 12px;
  color: black;
  background-color: white;
  border: 1px solid #a6a6a6;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const FooterDivider = styled.hr`
  width: 98%;
  border: none;
  border-top: 1px solid #ddd;
  margin: 24px 0 12px;
`;

const Footer = styled.div`
  text-align: center;
  font-size: 11px;
  color: #555;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 4px;

  a {
    color: #2162a1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Copyright = styled.div`
  color: #888;
  font-size: 10px;
`;

const Login = () => {
  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    email: '',
    password: '',
    stayLoggedIn: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    const foundUser = users.find(
      (user) =>
        user.email === values.email && bcrypt.compareSync(values.password, user.password)
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
        <Link to="/">
          <LogoImage
            src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
            alt="IMDb logo"
          />
        </Link>
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
              <div>
                <Label htmlFor="email">Email or mobile phone number</Label>
                <StyledField type="email" name="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </div>

              <div>
                <PasswordRow>
                  <Label htmlFor="password">Password</Label>
                  <Assistance href="#">Password assistance</Assistance>
                </PasswordRow>
                <StyledField type="password" name="password" />
                <ErrorMessage name="password" component={ErrorText} />
              </div>

              <SignInButton type="submit" disabled={isSubmitting}>
                Sign in
              </SignInButton>

              <CheckboxRow>
                <Checkbox type="checkbox" name="stayLoggedIn" />
                <label htmlFor="stayLoggedIn">
                  Keep me signed in. <DetailsLink href="#">Details</DetailsLink> <KeyboardArrowDownIcon fontSize="small" />
                </label>
              </CheckboxRow>

              {error && <ErrorText>{error}</ErrorText>}

              <OrDivider>
                <span>New to IMDb?</span>
              </OrDivider>

              <CreateButton type="button" onClick={() => navigate('/register')}>
                Create your IMDb account
              </CreateButton>
            </Form>
          )}
        </Formik>
      </Card>

      <FooterDivider />

      <Footer>
        <FooterLinks>
          <a href="#">Help</a>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
        </FooterLinks>
        <Copyright>
          © 1996–2025, Amazon.com, Inc. or its affiliates
        </Copyright>
      </Footer>
    </Page>
  );
};

export default Login;
