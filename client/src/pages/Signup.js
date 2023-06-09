import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ewokcute from '../assets/img/ewokcute.png';
import ewokcute1 from '../assets/img/ewokcute.png';

import jedi from '../assets/img/jedi.jpg';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

  };



  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div class="box">
          <div class="center">
            <div class="dialog-1">Not sure what your Jedi name is?
            <br></br>
            Try this for your first name!
            <br></br>
            1. You must take the first 3 letters of your last name.
            2. Then you must take the first 2 letters of your first name.
              <div class="left-point"></div>
            </div>
            <div class="dialog-2">  
            Try this for your last name!
            <br></br>
            You must take the first 3 letters of your mother's maiden name.
              <div class="right-point"></div>
            </div>
          </div>
        </div>
        <div className='theEwoks'>
        <img src={ewokcute} alt="" className="ewokRight" />
        <img src={ewokcute1} alt="" className="ewokLeft" />
        </div>
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">We would be honored if you would join us.</h4>
          <div className="card-body">

            {data ? (
              <p>
                Success! {' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Enter Your Jedi Name"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Enter Your Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='pics'>
        <img src={jedi} alt="" className="jedi" />
      </div>
    </main>
  )
};


export default Signup;
