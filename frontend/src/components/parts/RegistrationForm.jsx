import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';

//TODO check layout after more work is done
//TODO check console.log if any left

const RegistrationForm = () => {
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birth_year: '',
    phone_number: '',
    email: '',
    password: '',
    media_name: ''
  });

  const validatePassword = (value) => {
    const errors = [];
    const minPasswordLength = 6;
    const maxPasswordLength = 20;
    if (value !== formData.password) {
      errors.push('Passwords do not match!');
    }
    if (value.length < minPasswordLength || value.length > maxPasswordLength) {
      errors.push(
        `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters.`
      );
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/\d/.test(value)) {
      errors.push('Password must contain at least one number.');
    }

    setPasswordError(errors.join(' '));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'phone_number') {
      validatePhone(value);
    }

    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      validatePassword(value);
    }
  };

  const validatePhone = (phone_number) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;

    if (!phoneRegex.test(phone_number)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const birthYear = new Date(formData.birth_year).getFullYear();
      const response = await axios.post('http://localhost:8080/api/v1/register', {
        ...formData,
        birth_year: birthYear
      });
      alert('Registration successufull');
      window.location.href = '/login';
    } catch (error) {
      if (error.response.status === 400) {
        setEmailError('Email already exists.');
      }
    }

    if (!passwordError) {
      return;
    } else {
      alert('Fill form correctly');
    }
  };

  const handleChangeActivity = (e) => {
    setSelectedActivity(e.target.value);
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
        <label htmlFor="name">Name*</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          required
          placeholder="Enter name"
        />
        <br />
        <label htmlFor="surname">Surname*</label>
        <br />
        <input
          type="text"
          name="surname"
          id="surname"
          required
          onChange={handleChange}
          placeholder="Enter surname"
        />
        <br />
        <label htmlFor="email">Email*</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="egzamle@egzample.com"
          autoComplete="email"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password*</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="new-password"
        />
        <br />
        <label htmlFor="password">Confirm Password*</label>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <br />
        <input
          type="password"
          name="confirmPassword"
          id="password"
          required
          onChange={handleChange}
          placeholder="Confirm password"
          autoComplete="new-password"
        />
        <br />
        <label htmlFor="birth_year">Birth Year*</label>
        <br />
        <input
          type="text"
          name="birth_year"
          pattern="\d{4}"
          id="birth_year"
          required
          onChange={handleChange}
          placeholder="e.g 1990"
        />
        <br />
        <label htmlFor="phone_number">Phone Number*</label>
        <br />
        <PhoneInput
          international
          id="phone_number"
          defaultCountry="LT"
          required
          value={formData.phone_number}
          onChange={(value) => {
            setFormData((prevData) => ({ ...prevData, phone_number: value }));
            validatePhone(value);
          }}
        />
        <br />
        <label htmlFor="activity">State of work </label>
        <br />

        <select
          name="activity"
          id="activity"
          size={1}
          value={selectedActivity}
          onChange={handleChangeActivity}
        >
          <option value="fworker">freelancer</option>
          <option value="mworker">media worker</option>
        </select>
        <br />
        {selectedActivity === 'mworker' && (
          <>
            <label htmlFor="media_name">Who do you work for?</label>
            <br />
            <textarea
              name="media_name"
              cols="30"
              id="media_name"
              rows="3"
              required
              onChange={handleChange}
            ></textarea>
          </>
        )}
        <br />
        <input type="checkbox" id="Uagreement" name="Uagreement" required />
        <label htmlFor="Uagreement">User agreement</label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
