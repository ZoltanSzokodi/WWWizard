import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };

      for (const key in profile) {
        if (key in profileData && profile[key] !== null)
          profileData[key] = profile[key];
      }

      for (const key in profile.social) {
        if (key in profileData && profile.social[key] !== null)
          profileData[key] = profile.social[key];
      }

      if (Array.isArray(profileData.skills)) {
        profileData.skills = profileData.skills.join(', ');
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const filteredFormData = { ...formData };

    // if a field is empty remove it from the body so it doesn't get validated by mongoose
    // this is also checked in the createProfile controller (backend) just in case
    // for (let prop in filteredFormData) {
    //   if (filteredFormData[prop] === '') {
    //     delete filteredFormData[prop];
    //   }
    // }

    createProfile(formData, history, profile ? true : false);
  };

  const handleToggleSocialInputs = () =>
    toggleSocialInputs(!displaySocialInputs);

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Add some changes to your profile
      </p>

      <small>* = required field</small>

      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <select name='status' value={status} onChange={handleChange}>
            <option value=''>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={handleChange}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={handleChange}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={handleChange}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className='form-group'>
          <input
            // required
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={handleChange}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={handleChange}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={handleChange}></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={handleToggleSocialInputs}
            type='button'
            className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={handleChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={handleChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={handleChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={handleChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={handleChange}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(ProfileForm)
);
