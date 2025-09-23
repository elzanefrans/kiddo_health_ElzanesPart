import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBaby, 
  faExclamationTriangle, 
  faHeart, 
  faHospital,
  faUser, 
  faSearch, 
  faClock, 
  faPlay, 
  faCheckCircle, 
  faThermometerFull,
  faEye,
  faStethoscope,
  faPhone,
  faCalendarAlt,
  faShieldAlt,
  faBookOpen,
  faStar,
  faAward,
  faChartLine,
  faRunning
} from '@fortawesome/free-solid-svg-icons';
import './HealthTips.css';
function HealthTips() {
  const [selectedAge, setSelectedAge] = useState('newborn');
  const [activeTab, setActiveTab] = useState('emergency');

  const emergencyTips = [
    {
      id: 1,
      category: 'Critical',
      title: 'High Fever in Newborns',
      description: 'Temperature above 100.4°F (38°C) in babies under 3 months requires immediate medical attention.',
      urgent: true
    },
    {
      id: 2,
      category: 'Breathing',
      title: 'Difficulty Breathing',
      description: 'Blue lips, rapid breathing, or wheezing requires emergency care.',
      urgent: true
    },
    {
      id: 3,
      category: 'Neurological',
      title: 'Seizures or Unconsciousness',
      description: 'Any loss of consciousness or seizure activity needs immediate medical intervention.',
      urgent: true
    }
  ];

  const developmentMilestones = {
    newborn: [
      { age: '0-3 months', milestone: 'Responds to sounds and voices', icon: <FontAwesomeIcon icon={faRunning} /> },
      { age: '0-3 months', milestone: 'Follows objects with eyes', icon: <FontAwesomeIcon icon={faEye} /> },
      { age: '0-3 months', milestone: 'Smiles socially', icon: <FontAwesomeIcon icon={faHeart} /> }
    ],
    infant: [
      { age: '6-12 months', milestone: 'Sits without support', icon: <FontAwesomeIcon icon={faChartLine} /> },
      { age: '6-12 months', milestone: 'Says first words', icon: <FontAwesomeIcon icon={faBookOpen} /> },
      { age: '6-12 months', milestone: 'Crawls and explores', icon: <FontAwesomeIcon icon={faRunning} /> }
    ],
    toddler: [
      { age: '12-24 months', milestone: 'Walks independently', icon: <FontAwesomeIcon icon={faChartLine} /> },
      { age: '12-24 months', milestone: 'Uses 2-word phrases', icon: <FontAwesomeIcon icon={faBookOpen} /> },
      { age: '12-24 months', milestone: 'Shows independence', icon: <FontAwesomeIcon icon={faStar} /> }
    ]
  };

  return (
    <div className="health-tips-container">
      {/* Hero Section */}
      <div className="health-tips-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-icons">
              <FontAwesomeIcon icon={faBaby} className="hero-icon" />
              <h1>Essential Health Guide</h1>
              <FontAwesomeIcon icon={faHeart} className="hero-icon" />
            </div>
            <p>Expert advice and essential tips to keep your child healthy, safe, and thriving at every stage</p>
            <div className="hero-badges">
              <span>
                <FontAwesomeIcon icon={faAward} />
                Pediatrician Approved
              </span>
              <span>
                <FontAwesomeIcon icon={faShieldAlt} />
                Evidence-Based
              </span>
              <span>
                <FontAwesomeIcon icon={faCheckCircle} />
                Updated 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Emergency Alert */}
      <div className="emergency-alert">
        <div className="alert-content">
          <FontAwesomeIcon icon={faPhone} className="alert-icon" />
          <div>
            <h3>Emergency? Call 911 Immediately</h3>
            <p>For life-threatening situations, don't wait. Seek immediate medical attention.</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          {[
            { id: 'emergency', label: 'Emergency Signs', icon: <FontAwesomeIcon icon={faExclamationTriangle} /> },
            { id: 'newborn', label: 'Newborn Care', icon: <FontAwesomeIcon icon={faBaby} /> },
            { id: 'development', label: 'Development', icon: <FontAwesomeIcon icon={faChartLine} /> },
            { id: 'common', label: 'Common Issues', icon: <FontAwesomeIcon icon={faStethoscope} /> },
            { id: 'nutrition', label: 'Nutrition', icon: <FontAwesomeIcon icon={faHeart} /> },
            { id: 'sleep', label: 'Sleep', icon: <FontAwesomeIcon icon={faClock} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Emergency Signs Section */}
        {activeTab === 'emergency' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>When to Seek Immediate Medical Help</h2>
              <p>Recognize these critical warning signs that require immediate medical attention</p>
            </div>

            <div className="emergency-grid">
              {emergencyTips.map((tip) => (
                <div key={tip.id} className="emergency-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <span className="card-category">{tip.category}</span>
                  </div>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              ))}
            </div>

            {/* Additional Emergency Signs */}
            <div className="additional-warning">
              <h3>
                <FontAwesomeIcon icon={faThermometerFull} />
                Additional Warning Signs
              </h3>
              <div className="warning-grid">
                <div className="warning-column">
                  <div className="warning-item">
                    <div className="warning-bullet"></div>
                    <div>
                      <h4>Severe Dehydration</h4>
                      <p>No tears, sunken eyes, no wet diapers for 8+ hours</p>
                    </div>
                  </div>
                  <div className="warning-item">
                    <div className="warning-bullet"></div>
                    <div>
                      <h4>Jaundice</h4>
                      <p>Yellow skin or eyes, especially in newborns</p>
                    </div>
                  </div>
                </div>
                <div className="warning-column">
                  <div className="warning-item">
                    <div className="warning-bullet"></div>
                    <div>
                      <h4>Severe Vomiting</h4>
                      <p>Persistent vomiting, especially with blood</p>
                    </div>
                  </div>
                  <div className="warning-item">
                    <div className="warning-bullet"></div>
                    <div>
                      <h4>Lethargy</h4>
                      <p>Extreme sleepiness or difficulty waking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newborn Care Section */}
        {activeTab === 'newborn' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Newborn Care Essentials</h2>
              <p>Everything you need to know for caring for your newborn in the first few months</p>
            </div>

            <div className="newborn-grid">
              {/* Feeding Guide */}
              <div className="newborn-card feeding">
                <div className="card-header">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faBaby} />
                  </div>
                  <h3>Feeding Schedule</h3>
                </div>
                <div className="card-content">
                  <div className="feeding-item">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                      <p className="feeding-title">Every 2-3 hours</p>
                      <p className="feeding-desc">8-12 feedings per day</p>
                    </div>
                  </div>
                  <div className="feeding-item">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <div>
                      <p className="feeding-title">6-8 wet diapers daily</p>
                      <p className="feeding-desc">Sign of adequate hydration</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sleep Safety */}
              <div className="newborn-card sleep">
                <div className="card-header">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faShieldAlt} />
                  </div>
                  <h3>Safe Sleep</h3>
                </div>
                <div className="card-content">
                  <div className="sleep-item">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <div>
                      <p className="sleep-title">Back to sleep</p>
                      <p className="sleep-desc">Always place baby on back to prevent SIDS</p>
                    </div>
                  </div>
                  <div className="sleep-item">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <div>
                      <p className="sleep-title">Firm mattress</p>
                      <p className="sleep-desc">No loose bedding, toys, or bumpers</p>
                    </div>
                  </div>
                  <div className="sleep-item">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <div>
                      <p className="sleep-title">Room sharing</p>
                      <p className="sleep-desc">Keep baby's sleep area in your room</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="video-section">
              <div className="section-header">
                <div className="section-icon">
                  <FontAwesomeIcon icon={faPlay} />
                </div>
                <h3>Educational Resources</h3>
              </div>
              <div className="video-grid">
                <div className="video-card">
                  <h4>Newborn Care Basics</h4>
                  <p>Learn proper techniques for bathing, feeding, and comforting your newborn.</p>
                  <button>
                    <FontAwesomeIcon icon={faPlay} />
                    Watch Video Guide
                  </button>
                </div>
                <div className="video-card">
                  <h4>Diaper Changing 101</h4>
                  <p>Step-by-step guide to safe and hygienic diaper changing.</p>
                  <button>
                    <FontAwesomeIcon icon={faBookOpen} />
                    Read Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Development Section */}
        {activeTab === 'development' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Developmental Milestones</h2>
              <p>Track your child's growth and development with these important milestones</p>
            </div>

            {/* Age Selector */}
            <div className="age-selector">
              {[
                { id: 'newborn', label: 'Newborn (0-6m)', icon: <FontAwesomeIcon icon={faBaby} /> },
                { id: 'infant', label: 'Infant (6-12m)', icon: <FontAwesomeIcon icon={faUser} /> },
                { id: 'toddler', label: 'Toddler (1-2y)', icon: <FontAwesomeIcon icon={faChartLine} /> }
              ].map((age) => (
                <button
                  key={age.id}
                  onClick={() => setSelectedAge(age.id)}
                  className={`age-button ${selectedAge === age.id ? 'active' : ''}`}
                >
                  {age.icon}
                  {age.label}
                </button>
              ))}
            </div>

            {/* Milestones Grid */}
            <div className="milestones-grid">
              {developmentMilestones[selectedAge].map((milestone, index) => (
                <div key={index} className="milestone-card">
                  <div className="milestone-header">
                    <div className="milestone-icon">
                      {milestone.icon}
                    </div>
                    <span className="milestone-age">{milestone.age}</span>
                  </div>
                  <p>{milestone.milestone}</p>
                </div>
              ))}
            </div>

            <div className="development-note">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <div>
                <h3>Important Note</h3>
                <p>
                  Every child develops at their own pace. Consult your pediatrician if you have concerns about 
                  your child's development or if milestones are significantly delayed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <div className="resources-section">
          <div className="section-header">
            <h3>Additional Resources</h3>
            <p>Trusted sources for more parenting and health information</p>
          </div>
          
          <div className="resources-grid">
            {[
              { name: 'American Academy of Pediatrics', url: 'https://www.healthychildren.org', desc: 'Expert pediatric advice' },
              { name: 'CDC Parenting Resources', url: 'https://www.cdc.gov/parents', desc: 'Evidence-based guidance' },
              { name: 'Zero to Three', url: 'https://www.zerotothree.org', desc: 'Early development support' },
              { name: 'La Leche League', url: 'https://www.llli.org', desc: 'Breastfeeding support' }
            ].map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-header">
                  <FontAwesomeIcon icon={faBookOpen} />
                  <h4>{resource.name}</h4>
                </div>
                <p>{resource.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthTips;