import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const dropdownRefs = useRef({});
  const [currentTopic, setCurrentTopic] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDropdownToggle = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleMenuItemClick = (path, topic = '', buttonName = '') => {
    setDropdownOpen({});
    setCurrentTopic(topic);
    setActiveButton(buttonName);
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
      if (path === '/math') {
        navigate('/math-home');
      }
    } else if (path.startsWith('/english')) {
      setCurrentTopic('english');
    } else {
      setCurrentTopic('');
    }
  }, [location.pathname, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const mainButtons = (
    <>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['pedagogical-coordination'] = el)}>
        <button className={currentTopic === 'pedagogical-coordination' ? 'active' : ''} onClick={() => handleDropdownToggle('pedagogical-coordination')}>ריכוז פדגוגי</button>
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['populations'] = el)}>
        <button className={currentTopic === 'populations' ? 'active' : ''} onClick={() => handleDropdownToggle('populations')}>אוכלוסיות</button>
        {isDropdownOpen['populations'] && (
          <div className="dropdown-menu">
            <button className={activeButton === 'early-childhood' ? 'active' : ''} onClick={() => handleMenuItemClick('/early-childhood', '', 'early-childhood')}>גיל הרך</button>
            <button className={activeButton === 'challenging-behavior' ? 'active' : ''} onClick={() => handleMenuItemClick('/challenging-behavior', '', 'challenging-behavior')}>התנהגות מאתגרת</button>
            <button className={activeButton === 'ana' ? 'active' : ''} onClick={() => handleMenuItemClick('/ana', '', 'ana')}>אנ"ה</button>
            <button className={activeButton === 'teacher-as-beacon' ? 'active' : ''} onClick={() => handleMenuItemClick('/teacher-as-beacon', '', 'teacher-as-beacon')}>המורה כמגדלור</button>
            <button className={activeButton === 'cvi' ? 'active' : ''} onClick={() => handleMenuItemClick('/cvi', '', 'cvi')}>CVI</button>
          </div>
        )}
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['technopedagogy'] = el)}>
        <button className={currentTopic === 'technopedagogy' ? 'active' : ''} onClick={() => handleDropdownToggle('technopedagogy')}>טכנופדגוגיה</button>
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['youth-society'] = el)}>
        <button className={currentTopic === 'youth-society' ? 'active' : ''} onClick={() => handleDropdownToggle('youth-society')}>חברה ונוער</button>
        {isDropdownOpen['youth-society'] && (
          <div className="dropdown-menu">
            <button className={activeButton === 'social-educational-community' ? 'active' : ''} onClick={() => handleMenuItemClick('/social-educational-community', '', 'social-educational-community')}>חינוך חברת ערכי קהילתי</button>
            <button className={activeButton === 'shl' ? 'active' : ''} onClick={() => handleMenuItemClick('/shl', '', 'shl')}>של"ח</button>
          </div>
        )}
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['life-preparation'] = el)}>
        <button className={currentTopic === 'life-preparation' ? 'active' : ''} onClick={() => handleDropdownToggle('life-preparation')}>הכנה לחיים</button>
        {isDropdownOpen['life-preparation'] && (
          <div className="dropdown-menu">
            <button className={activeButton === 'transitions' ? 'active' : ''} onClick={() => handleMenuItemClick('/transitions', '', 'transitions')}>מעברים</button>
            <button className={activeButton === 'life-preparation-21' ? 'active' : ''} onClick={() => handleMenuItemClick('/life-preparation-21', '', 'life-preparation-21')}>הכנה לחיים - לב 21</button>
            <button className={activeButton === 'social-sexual-education' ? 'active' : ''} onClick={() => handleMenuItemClick('/social-sexual-education', '', 'social-sexual-education')}>חינוך מיני חברתי</button>
          </div>
        )}
      </div>
      <div className="dropdown" ref={(el) => (dropdownRefs.current['discipline-areas'] = el)}>
        <button className={currentTopic === 'discipline-areas' ? 'active' : ''} onClick={() => handleDropdownToggle('discipline-areas')}>תחומי דעת</button>
        {isDropdownOpen['discipline-areas'] && (
          <div className="dropdown-menu">
            <button className={activeButton === 'linguistic-education' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education', 'linguistic-education', 'linguistic-education')}>חינוך לשוני</button>
            <button className={activeButton === 'math-home' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-home', 'math', 'math-home')}>מתמטיקה</button>
            <button className={activeButton === 'science' ? 'active' : ''} onClick={() => handleMenuItemClick('/science', '', 'science')}>מדע וטכנולוגיה</button>
            <button className={activeButton === 'english' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-home', 'english', 'english-home')}>אנגלית</button>
            <button className={activeButton === 'art' ? 'active' : ''} onClick={() => handleMenuItemClick('/art', '', 'art')}>אמנות</button>
            <button className={activeButton === 'citizenship' ? 'active' : ''} onClick={() => handleMenuItemClick('/citizenship', '', 'citizenship')}>אזרחות</button>
            <button className={activeButton === 'bible' ? 'active' : ''} onClick={() => handleMenuItemClick('/bible', '', 'bible')}>תנ"ך</button>
          </div>
        )}
      </div>
    </>
  );

  const linguisticEducationButtons = (
    <>
      <button className={activeButton === 'linguistic-education-arabic' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-arabic', 'linguistic-education', 'linguistic-education-arabic')}>חינוך לשוני בערבית</button>
      <button className={activeButton === 'linguistic-education-assessment' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-assessment', 'linguistic-education', 'linguistic-education-assessment')}>הערכה</button>
      <button className={activeButton === 'linguistic-education-meta-linguistic-knowledge' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-meta-linguistic-knowledge', 'linguistic-education', 'linguistic-education-meta-linguistic-knowledge')}>ידע מטא לשוני</button>
      <button className={activeButton === 'linguistic-education-listening-speaking' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-listening-speaking', 'linguistic-education', 'linguistic-education-listening-speaking')}>האזנה ודיבור</button>
      <button className={activeButton === 'linguistic-education-writing' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-writing', 'linguistic-education', 'linguistic-education-writing')}>כתיבה</button>
      <button className={activeButton === 'linguistic-education-reading' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-reading', 'linguistic-education', 'linguistic-education-reading')}>קריאה</button>
      <button className={activeButton === 'linguistic-education-curriculum' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-curriculum', 'linguistic-education', 'linguistic-education-curriculum')}>תכניות לימודים</button>
      <button className={activeButton === 'linguistic-education-home' ? 'active' : ''} onClick={() => handleMenuItemClick('/linguistic-education-home', 'linguistic-education', 'linguistic-education-home')}>דף ראשי חינוך לשוני</button>
    </>
  );

  const mathButtons = (
    <>
      <button className={activeButton === 'math-teaching-strategies' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-teaching-strategies', 'math', 'math-teaching-strategies')}>אסטרטגיות להוראה מותאמת</button>
      <button className={activeButton === 'math-functional' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-functional', 'math', 'math-functional')}>חשבון פונקציונאלי</button>
      <button className={activeButton === 'math-activities' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-activities', 'math', 'math-activities')}>פעילויות במתמטיקה</button>
      <button className={activeButton === 'math-mapping-assessment' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-mapping-assessment', 'math', 'math-mapping-assessment')}>מיפוי והערכה</button>
      <button className={activeButton === 'math-curriculum' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-curriculum', 'math', 'math-curriculum')}>מתווים ותוכניות לימודים</button>
      <button className={activeButton === 'math-home' ? 'active' : ''} onClick={() => handleMenuItemClick('/math-home', 'math', 'math-home')}>דף ראשי מתמטיקה</button>
    </>
  );

  const englishButtons = (
    <>
      <button className={activeButton === 'english-exams' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-exams', 'english', 'english-exams')}>בגרויות</button>
      <button className={activeButton === 'english-assessments' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-assessments', 'english', 'english-assessments')}>מבדקים</button>
      <button className={activeButton === 'english-technology-tools' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-technology-tools', 'english', 'english-technology-tools')}>כלים טכנולוגיים</button>
      <button className={activeButton === 'english-teaching-tools' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-teaching-tools', 'english', 'english-teaching-tools')}>כלים להוראה מיטבית</button>
      <button className={activeButton === 'english-teaching-materials' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-teaching-materials', 'english', 'english-teaching-materials')}>חומרי הוראה</button>
      <button className={activeButton === 'english-curriculum' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-curriculum', 'english', 'english-curriculum')}>תכנית הלימודים</button>
      <button className={activeButton === 'english-home' ? 'active' : ''} onClick={() => handleMenuItemClick('/english-home', 'english', 'english-home')}>דף ראשי אנגלית</button>
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const showSearchBar = location.pathname === '/' || location.pathname === '/search';

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <div className="nav-buttons">
          {renderButtons()}
        </div>
        <div className="home-icon" onClick={() => handleMenuItemClick('/')}>
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div className="auth-button">
          {user ? (
            <button onClick={handleLogout}>התנתק</button>
          ) : (
            <button onClick={() => handleMenuItemClick('/login')}>התחברות</button>
          )}
        </div>
        {showSearchBar && (
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש..."
              dir='rtl'
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
