import React, { useState, useEffect } from 'react';
import './HomePage.css';
import whoAreWe from '../assets/whoarewe.jpeg'


const images = [
  require('../assets/photo1.png'),
  require('../assets/photo2.png'),
  require('../assets/photo3.png'),
  require('../assets/photo4.png'),
  require('../assets/photo5.png'),
  require('../assets/photo6.png'),
  require('../assets/photo7.png'),
  // require('../assets/my-background.webp')
];

const HomePage = ({ scrollToContact }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 1000); // Transition duration
    }, 5000); // 10 seconds interval for each image
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollToContact) {
      document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToContact]);

  

  return (
    <div className="home-page">
      


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
            
          מערך ההדרכה של החינוך מיוחד מיועד  לשיפור הפדגוגיה עבור תלמידים עם צרכים מיוחדים בירושלים ובסביבה.
       
          <br />
                                 
         אנו מחויבים להכלה ונגישות, ושואפים להעצים צוותי חינוך ואת התלמידים עם תוכניות חינוכיות מותאמות ושירותי תמיכה הנותנים מענה לדרישות הלמידה הייחודיות שלהם.
          
          <br />

          באמצעות מאמצים משותפים עם מחנכים, משפחות ושותפים בקהילה, צוות מדריכי המערך מטפחים סביבה בה כל תלמיד יכול לשגשג בלמידה, בחברה ובמיומנויות חיים.
          
          <br />

          המשימה שלנו היא הפדגוגיה ןבהשפעותיה  על שוויון הזדמנויות ושילוב חברתי עבור אנשים עם מוגבלות, ובכך לקדם קהילה מכילה ותומכת יותר בירושלים ובסביבה.
          
          </p>
          
        </div>
        <img src={whoAreWe} alt="Who Are We" className="whoAreWe-image" />
        </div>
      
        <div className={`background ${fade ? 'fade-in' : 'fade-out'}`}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}  >
        {/* Background image div */}
        </div>



      </div>
  );
};

export default HomePage;
