import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if isAuthenticated === true
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// const mapDispatchToProps = dispatch => ({
//   setAlert: () => dispatch(setAlert),
//   register: () => dispatch(register),
// });

export default connect(mapStateToProps, { setAlert, register })(Register);

// =====================================================================================
// import React, { Fragment, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { setAlert } from '../../actions/alert';
// import { register } from '../../actions/auth';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     passwordConfirm: '',
//   });

//   const dispatch = useDispatch();

//   const { name, email, password, passwordConfirm } = formData;

//   const handleChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (password !== passwordConfirm) {
//       dispatch(setAlert('Passwords do not match', 'danger'));
//     } else {
//       dispatch(register({ name, email, password }));
//     }
//   };

//   return (
//     <Fragment>
//       <h1 className='large text-primary'>Sign Up</h1>
//       <p className='lead'>
//         <i className='fas fa-user'></i> Create Your Account
//       </p>
//       <form className='form' onSubmit={handleSubmit}>
//         <div className='form-group'>
//           <input
//             type='text'
//             placeholder='Name'
//             name='name'
//             value={name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='email'
//             placeholder='Email Address'
//             name='email'
//             value={email}
//             onChange={handleChange}
//           />
//           <small className='form-text'>
//             This site uses Gravatar so if you want a profile image, use a
//             Gravatar email
//           </small>
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             placeholder='Password'
//             name='password'
//             value={password}
//             onChange={handleChange}
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             placeholder='Confirm Password'
//             name='passwordConfirm'
//             value={passwordConfirm}
//             onChange={handleChange}
//           />
//         </div>
//         <input type='submit' className='btn btn-primary' value='Register' />
//       </form>
//       <p className='my-1'>
//         Already have an account? <Link to='/login'>Sign In</Link>
//       </p>
//     </Fragment>
//   );
// };

// export default Register;
