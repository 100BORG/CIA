import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUpload, FiCamera } from 'react-icons/fi';
import { defaultLogo } from '../assets/logoData';
import './ProfilePage.css';

const ProfilePage = () => {
  // Initialize state with data from localStorage or defaults
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'johndoe@example.com',
    position: localStorage.getItem('userPosition') || 'CEO',
    phone: localStorage.getItem('userPhone') || '',
    avatar: localStorage.getItem('userAvatar') || defaultLogo
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize avatar from user object if available
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.id === userId);
    
    if (currentUser && currentUser.avatar) {
      setFormData(prev => ({
        ...prev,
        avatar: currentUser.avatar
      }));
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Save user data to localStorage
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPosition', formData.position);
      localStorage.setItem('userPhone', formData.phone);
      localStorage.setItem('userAvatar', formData.avatar);
      
      // Update this user in the users array
      const userId = localStorage.getItem('userId');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          avatar: formData.avatar,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Dispatch event to notify other components about the user update
      window.dispatchEvent(new CustomEvent('userUpdated'));
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };
  
  return (
    <div className="profile-container">
      <Link to="/dashboard" className="profile-back-btn">
        <FiArrowLeft /> Back to Dashboard
      </Link>
      
      <div className="profile-header">
        <div 
          className="profile-avatar-container"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img src={formData.avatar} alt={formData.name} className="profile-avatar" />
          <label htmlFor="avatar-upload" className={`avatar-upload-overlay ${isHovering ? 'visible' : ''}`}>
            <FiCamera size={24} />
            <span>Change Photo</span>
          </label>
          <input 
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>
        <div>
          <h1 className="profile-name">{formData.name}</h1>
          <p className="profile-email">{formData.email}</p>
        </div>
      </div>
      
      <div className="profile-content">
        <form onSubmit={handleSubmit}>
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="position">Position/Title</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {saveSuccess && (
            <div className="success-message">
              Profile updated successfully!
            </div>
          )}
          
          <div className="profile-actions">
            <Link to="/dashboard" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;