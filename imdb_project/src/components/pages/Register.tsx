import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcryptjs';
import styled from 'styled-components';

import UsersContext from '../../context/UsersContext';
import { UsersContextTypes, User } from '../../types';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 100vh;
`;

const LogoWrapper = styled.div`
  margin-bottom: 10px;
`;

const LogoImage = styled.img`
  height: 48px;
  margin-top: 15px;
`;

const Card = styled.div`
  width: 320px;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  padding: 20px 25px;
  color: black;
`;

const Title = styled.h2`
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 20px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 4px;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: #007185;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #d5d9d9;
  margin: 20px 0;
`;

const SubmitButton = styled.button`
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

const BottomText = styled.p`
  font-size: 12px;
  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  color: #2162a1;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
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

const Register = () => {
  const navigate = useNavigate();
  const { users, dispatch } = useContext(UsersContext) as UsersContextTypes;

  const initialValues: InitValues = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: 'customer'
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(5, 'Username too short.')
      .max(20, 'Username too long.')
      .required('This field is required.'),
    email: Yup.string()
      .email('Enter a valid email.')
      .required('This field is required.'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
        'Password must include at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be 8–25 characters long.'
      )
      .required('This field is required.'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match.')
      .required('This field is required.'),
  });

  type InitValues = Omit<User, 'id' | 'passwordText'> & { passwordRepeat: string };

  const handleSubmit = (
    values: InitValues,
    { setErrors }: FormikHelpers<InitValues>
  ) => {
    const emailExists = users.some(user => user.email === values.email);
    const usernameExists = users.some(user => user.username === values.username);

    if (emailExists || usernameExists) {
      setErrors({
        ...(emailExists ? { email: 'This email already exists.' } : {}),
        ...(usernameExists ? { username: 'This username already exists.' } : {})
      });
      return;
    }

    const newUser: User = {
      id: generateID(),
      username: values.username,
      email: values.email,
      password: bcrypt.hashSync(values.password, 10),
      passwordText: values.password,
      role: 'customer'
    };

    dispatch({ type: 'addUser', newUser });
    navigate('/login');
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
        <Title>Create account</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FieldWrapper>
                <Label htmlFor="username">Your name</Label>
                <StyledField name="username" type="text" placeholder="First and last name" />
                <ErrorMessage name="username" component={ErrorText} />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="email">Email</Label>
                <StyledField name="email" type="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="password">Password</Label>
                <StyledField name="password" type="password" placeholder="at least 8 characters" />
                <ErrorMessage name="password" component={ErrorText} />
                <InfoText>Passwords must be at least 8 characters.</InfoText>
              </FieldWrapper>

              <FieldWrapper>
                <Label htmlFor="passwordRepeat">Re-enter password</Label>
                <StyledField name="passwordRepeat" type="password" />
                <ErrorMessage name="passwordRepeat" component={ErrorText} />
              </FieldWrapper>

              <SubmitButton type="submit">Create your IMDb account</SubmitButton>

              <Divider />

              <BottomText>
                Already have an account? <StyledLink to="/login">Sign in</StyledLink>
              </BottomText>
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

export default Register;
