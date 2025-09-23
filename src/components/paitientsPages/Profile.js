import React, { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";
import { getChildrenByParent } from '../../services/apiService';
import './Profile.css';

const Profile = () => {
  const { user, child, setChild } = useUser();
  const [activeSection, setActiveSection] = useState('parent');
  const [childrenList, setChildrenList] = useState([]);

 useEffect(() => {
  if (user && user.role === 'PARENT') {
    getChildrenByParent(user.userId).then(children => {
      console.log('Children data:', children); // Add this line
      setChildrenList(children);
      if (children.length > 0 && !child) {
        setChild(children[0]);
      }
    }).catch(err => console.error("Error fetching children:", err));
  }
}, [user, child, setChild]);

  if (!user) return <p>Loading profile...</p>;

  const sections = [
    {
      id: 'parent',
      title: '👤 Parent Information',
      content: (
        <div className="profile-content">
          <p><strong>Name:</strong> {user.name} {user.surname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.number}</p>
        </div>
      )
    },
    {
      id: 'child',
      title: '👶 Child Information',
      content: child ? (
        <div className="profile-content">
     <h2>Child Information</h2>
      {/* Check which properties actually exist in your child object */}
      {child.identityNumber && <p><strong>Identity Number:</strong> {child.identityNumber}</p>}
      <p><strong>Name:</strong> {child.name}</p>
      {child.surname && <p><strong>Surname:</strong> {child.surname}</p>}
      <p><strong>Age:</strong> {child.age}</p>
      <p><strong>Gender:</strong> {child.gender}</p>
      <p><strong>Date of Birth:</strong> {child.dateOfBirth}</p>
    </div>
      ) : (
        <p>No child information available</p>
      )
    },
    {
      id: 'medical',
      title: '🏥 Medical Record',
      content: child && child.medicalRecord ? (
        <div className="profile-content">
          <p><strong>Allergies:</strong> {child.medicalRecord.allergies || 'None'}</p>
          <p><strong>Medications:</strong> {child.medicalRecord.medications || 'None'}</p>
          <p><strong>Vaccinations:</strong> {child.medicalRecord.vaccinations || 'None'}</p>
        </div>
      ) : (
        <p>No medical record available.</p>
      )
    },
    {
      id: 'children',
      title: '👨‍👩‍👧‍👦 My Children',
      content: (
        <div className="profile-content">
          {childrenList.length > 0 ? (
            <div className="children-list">
              {childrenList.map(kid => (
                <div key={kid.childId} className="child-item">
                  <h4>{kid.name}</h4>
                  <p>Age: {kid.age} • {kid.gender}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No children registered</p>
          )}
          <button className="add-child-btn">Add Another Child</button>
        </div>
      )
    }
  ];

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      
      <div className="profile-grid">
        {sections.map(section => (
          <div 
            key={section.id}
            className={`profile-card ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
          >
            <div className="card-header">
              <h2>{section.title}</h2>
              <span className="collapse-icon">
                {activeSection === section.id ? '−' : '+'}
              </span>
            </div>
            
            {activeSection === section.id && (
              <div className="card-content">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;