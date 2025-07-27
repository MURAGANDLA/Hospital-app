import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import '../styles/global.css';
import healthImage from '../assets/Hospital-Management-System.jpg';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    country: '',
    state: '',
    street: '',
    city: '',
    zip: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries.map(c => ({ label: c.name, value: c.isoCode })));
  }, []);

  useEffect(() => {
    if (formData.country) {
      const allStates = State.getStatesOfCountry(formData.country);
      setStates(allStates.map(s => ({ label: s.name, value: s.isoCode })));
    } else {
      setStates([]);
    }
  }, [formData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      country: selected?.value || '',
      state: ''
    }));
  };

  const handleStateChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      state: selected?.value || ''
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const validateForm = () => {
    const {
      firstName, lastName, email, password,
      phone, gender, country, state, street, city, zip
    } = formData;

    if (!firstName.trim()) return 'First Name is required';
    if (!lastName.trim()) return 'Last Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return 'Valid email required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!phone) return 'Phone number is required';
    if (!gender) return 'Gender is required';
    if (!country) return 'Country is required';
    if (!state) return 'State is required';
    if (!street.trim()) return 'Street is required';
    if (!city.trim()) return 'City is required';
    if (!zip.trim()) return 'ZIP is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setApiResponse(response.data);
      alert('Signup successful! You will be redirected to login.');
      setTimeout(() => navigate('/'), 6000); 
    } catch (err) {
      alert('Signup failed!');
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <img src={healthImage} alt="health" className="auth-image" />
      </div>

      <div className="auth-right">
        <div className="auth-box scrollable-box">
          <h2>Create Account</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-row">
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
              <input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleInputChange} />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
            </div>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            <PhoneInput country={'us'} value={formData.phone} onChange={handlePhoneChange} inputStyle={{ width: '100%' }} />
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />

            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <Select
              options={countries}
              value={countries.find(c => c.value === formData.country)}
              onChange={handleCountryChange}
              placeholder="Select Country"
              isClearable
            />

            <Select
              options={states}
              value={states.find(s => s.value === formData.state)}
              onChange={handleStateChange}
              placeholder="Select State"
              isClearable
            />

            <input name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} />
            <div className="auth-row">
              <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
              <input name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleInputChange} />
            </div>

            <button type="submit">Sign Up</button>
            <p>Already have an account? <Link to="/">Login</Link></p>
          </form>

          
          {apiResponse && (
            <div className="api-response">
              <h3>Dummy API Response:</h3>
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
