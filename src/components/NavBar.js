import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const dropdownRefs = useRef({});
  const [currentTopic, setCurrentTopic] = useState('');

  const handleDropdownToggle = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleMenuItemClick = (path, topic = '') => {
    setDropdownOpen({});
    if (currentTopic !== topic) {
      setCurrentTopic(topic);
      if (topic === 'math') {
        navigate('/math-home');
        return;
      } else if (topic === 'linguistic-education') {
        navigate('/linguistic-education-home');
        return;
      } else if (topic === 'english') {
        navigate('/english-home');
        return;
      }
    }
    navigate(path);
  };

  const handleClickOutside = (event) => {
    Object.keys(dropdownRefs.current).forEach((menu) => {
      if (dropdownRefs.current[menu] && !dropdownRefs.current[menu].contains(event.target)) {
        setDropdownOpen((prevState) => ({
          ...prevState,
          [menu]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/linguistic-education')) {
      setCurrentTopic('linguistic-education');
    } else if (path.startsWith('/math')) {
      setCurrentTopic('math');
    } else if (path.startsWith('/english')) {
      setCurrentTopic('english');
    } else {
      setCurrentTopic('');
    }
  }, [location.pathname]);

  const mainButtons = (
    <>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['pedagogical-coordination'] = el)}>
        <button onClick={() => handleDropdownToggle('pedagogical-coordination')}>ריכוז פדגוגי</button>
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['populations'] = el)}>
        <button onClick={() => handleDropdownToggle('populations')}>אוכלוסיות</button>
        {isDropdownOpen['populations'] && (
          <div className="dropdown-menu">
            <button onClick={() => handleMenuItemClick('/early-childhood')}>גיל הרך</button>
            <button onClick={() => handleMenuItemClick('/challenging-behavior')}>התנהגות מאתגרת</button>
            <button onClick={() => handleMenuItemClick('/ana')}>אנ"ה</button>
            <button onClick={() => handleMenuItemClick('/teacher-as-beacon')}>המורה כמגדלור</button>
            <button onClick={() => handleMenuItemClick('/cvi')}>CVI</button>
          </div>
        )}
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['technopedagogy'] = el)}>
        <button onClick={() => handleDropdownToggle('technopedagogy')}>טכנופדגוגיה</button>
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['youth-society'] = el)}>
        <button onClick={() => handleDropdownToggle('youth-society')}>חברה ונוער</button>
        {isDropdownOpen['youth-society'] && (
          <div className="dropdown-menu">
            <button onClick={() => handleMenuItemClick('/social-educational-community')}>חינוך חברת ערכי קהילתי</button>
            <button onClick={() => handleMenuItemClick('/shl')}>של"ח</button>
          </div>
        )}
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['life-preparation'] = el)}>
        <button onClick={() => handleDropdownToggle('life-preparation')}>הכנה לחיים</button>
        {isDropdownOpen['life-preparation'] && (
          <div className="dropdown-menu">
            <button onClick={() => handleMenuItemClick('/transitions')}>מעברים</button>
            <button onClick={() => handleMenuItemClick('/life-preparation-21')}>הכנה לחיים - לב 21</button>
            <button onClick={() => handleMenuItemClick('/social-sexual-education')}>חינוך מיני חברתי</button>
          </div>
        )}
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['discipline-areas'] = el)}>
        <button onClick={() => handleDropdownToggle('discipline-areas')}>תחומי דעת</button>
        {isDropdownOpen['discipline-areas'] && (
          <div className="dropdown-menu">
            <button onClick={() => handleMenuItemClick('/linguistic-education', 'linguistic-education')}>חינוך לשוני</button>
            <button onClick={() => handleMenuItemClick('/math', 'math')}>מתמטיקה</button>
            <button onClick={() => handleMenuItemClick('/science')}>מדע וטכנולוגיה</button>
            <button onClick={() => handleMenuItemClick('/english', 'english')}>אנגלית</button>
            <button onClick={() => handleMenuItemClick('/art')}>אמנות</button>
            <button onClick={() => handleMenuItemClick('/citizenship')}>אזרחות</button>
            <button onClick={() => handleMenuItemClick('/bible')}>תנ"ך</button>
          </div>
        )}
      </div>
    </>
  );

  const linguisticEducationButtons = (
    <>
      <button onClick={() => handleMenuItemClick('/arabic-linguistic-education', 'linguistic-education')}>חינוך לשוני בערבית</button>
      <button onClick={() => handleMenuItemClick('/assessment', 'linguistic-education')}>הערכה</button>
      <button onClick={() => handleMenuItemClick('/meta-linguistic-knowledge', 'linguistic-education')}>ידע מטא לשוני</button>
      <button onClick={() => handleMenuItemClick('/listening-speaking', 'linguistic-education')}>האזנה ודיבור</button>
      <button onClick={() => handleMenuItemClick('/writing', 'linguistic-education')}>כתיבה</button>
      <button onClick={() => handleMenuItemClick('/reading', 'linguistic-education')}>קריאה</button>
      <button onClick={() => handleMenuItemClick('/curriculum', 'linguistic-education')}>תכניות לימודים</button>
      <button onClick={() => handleMenuItemClick('/linguistic-education-home', 'linguistic-education')}>דף ראשי חינוך לשוני</button>
    </>
  );

  const mathButtons = (
    <>
      <button onClick={() => handleMenuItemClick('/math-teaching-strategies', 'math')}>אסטרטגיות להוראה מותאמת</button>
      <button onClick={() => handleMenuItemClick('/math-functional', 'math')}>חשבון פונקציונאלי</button>
      <button onClick={() => handleMenuItemClick('/math-activities', 'math')}>פעילויות במתמטיקה</button>
      <button onClick={() => handleMenuItemClick('/math-mapping-assessment', 'math')}>מיפוי והערכה</button>
      <button onClick={() => handleMenuItemClick('/math-curriculum', 'math')}>מתווים ותוכניות לימודים</button>
      <button onClick={() => handleMenuItemClick('/math-home', 'math')}>דף ראשי מתמטיקה</button>
    </>
  );

  const englishButtons = (
    <>
      <button onClick={() => handleMenuItemClick('/exams', 'english')}>בגרויות</button>
      <button onClick={() => handleMenuItemClick('/assessments', 'english')}>מבדקים</button>
      <button onClick={() => handleMenuItemClick('/technology-tools', 'english')}>כלים טכנולוגיים</button>
      <button onClick={() => handleMenuItemClick('/teaching-tools', 'english')}>כלים להוראה מיטבית</button>
      <button onClick={() => handleMenuItemClick('/teaching-materials', 'english')}>חומרי הוראה</button>
      <button onClick={() => handleMenuItemClick('/english-curriculum', 'english')}>תכנית הלימודים</button>
      <button onClick={() => handleMenuItemClick('/english-home', 'english')}>דף ראשי אנגלית</button>
    </>
  );

  const renderButtons = () => {
    switch (currentTopic) {
      case 'linguistic-education':
        return linguisticEducationButtons;
      case 'math':
        return mathButtons;
      case 'english':
        return englishButtons;
      default:
        return mainButtons;
    }
  };

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <div className="icon-label" onClick={() => navigate('/feedback')}>
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div className="nav-buttons">
          {renderButtons()}
        </div>
        <div className="home-icon" onClick={() => handleMenuItemClick('/')}>
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div className="text-label" onClick={() => navigate('/feedback')}>
          דרגו אותנו
        </div>
        <div className="sign-in-icon" onClick={() => handleMenuItemClick('/login')}>
          <FontAwesomeIcon icon={faSignInAlt} />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;