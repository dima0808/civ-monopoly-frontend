import './Profile.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Header from '../../components/header/Header.jsx';
import React, { useEffect, useState } from 'react';
import ProfileImage from '../../components/profile/ProfileImage';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileCredentials from '../../components/profile/ProfileCredentials';
import Achievements from '../../components/profile/Achievements';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../../http/requests/user.js';
import { DisplayError, DisplayLoading } from '../../utils/component.jsx';

const Profile = () => {
  const { username } = useParams();
  const { user } = useSelector((state) => state.auth);

  const isYourProfile = user?.username === username;

  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserByUsername(username)
      .then((data) => setUserProfile(data))
      .catch((e) => setError(e.message));
  }, [username]);

  const displayProfile = () => {
    return (
      <div className="section profile-grid">
        <ProfileImage user={userProfile} />
        <ProfileStats user={userProfile} />
        {isYourProfile && <ProfileCredentials user={userProfile} />}
        <Achievements user={userProfile} />
      </div>
    );
  };

  return (
    <Scrollbars style={{ height: '100vh' }}>
      <Header />
      <main>
        <div className={`profile ${isYourProfile ? 'your-profile' : ''}`}>
          {userProfile == null && !error && <DisplayLoading />}
          {error && <DisplayError error={error} />}

          {userProfile && displayProfile()}
        </div>
      </main>
    </Scrollbars>
  );
};

export default Profile;
