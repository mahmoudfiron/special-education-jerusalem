import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './HomePage.css';
import whoAreWe from '../assets/photo8.jpg';

const images = [
  require('../assets/photo1.png'),
  require('../assets/photo2.png'),
  require('../assets/photo3.png'),
  require('../assets/photo4.png'),
  require('../assets/photo5.png'),
  require('../assets/photo6.png'),
  require('../assets/photo7.png'),
  require('../assets/photo8.jpg'),
  require('../assets/photo9.jpg'),
  require('../assets/photo10.jpg'),
];

const HomePage = ({ scrollToContact }) => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (scrollToContact) {
      document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToContact]);

  return (
    <div className="home-page">
      {userRole === 'admin' && (
        <div className="admin-button-container">
          <button className="admin-button" onClick={() => navigate('/admin')}>ניהול הרשאות</button>
        </div>
      )}

      <div className="introduction">
        <h1 className="intro-text">אנחנו כאן בשביל לעזור לכם בלימודים</h1>
        <p className="intro-par">
          מערך ההדרכה של החינוך המיוחד במחוזות ירושלים והעיר ירושלים כולל כ 50 מדריכים בתחומי דעת וסוגי אוכלוסיות מגוונים בהתאם לצרכי השדה. החומרים באתר זה נאספים ומאורגנים על ידי צוות המדריכים
        </p>
      </div>

      <div className="whoAreWe">
        <div className="whoAreWe-content" dir="rtl">
          <h1>מי אנחנו</h1>
          <p className='whoarewe-para'>
            מערך ההדרכה של החינוך מיוחד מיועד לשיפור הפדגוגיה עבור תלמידים עם צרכים מיוחדים בירושלים ובסביבה.
            אנו מחויבים להכלה ונגישות, ושואפים להעצים צוותי חינוך ואת התלמידים עם תוכניות חינוכיות מותאמות ושירותי תמיכה הנותנים מענה לדרישות הלמידה הייחודיות שלהם.
            באמצעות מאמצים משותפים עם מחנכים, משפחות ושותפים בקהילה, צוות מדריכי המערך מטפחים סביבה בה כל תלמיד יכול לשגשג בלמידה, בחברה ובמיומנויות חיים.
            המשימה שלנו היא הפדגוגיה ןבהשפעותיה על שוויון הזדמנויות ושילוב חברתי עבור אנשים עם מוגבלות, ובכך לקדם קהילה מכילה ותומכת יותר בירושלים ובסביבה.
          </p>
        </div>
        <img src={whoAreWe} alt="Who Are We" className="whoAreWe-image" />
      </div>

      <div className="container grid">
        <div id="gallery">
          <div className="container" id="container">
            <div className="pictures" id="pictures">
              {images.map((image, index) => (
                <div key={index} className="box">
                  <img src={image} alt={`Gallery ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
