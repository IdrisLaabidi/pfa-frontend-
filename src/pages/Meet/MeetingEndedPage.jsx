import React from 'react';
import styles from './MeetingEndedPage.module.css'; // Import CSS module
import Lottie from 'react-lottie';
import animation2 from '../../assets/animation2.json'
import { Link } from 'react-router-dom';
const MeetingEndedPage = () => {
  const readingLottieAnimationOption = {
    loop: true,
    autoplay: true,
    animationData: animation2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className={styles['meeting-ended-container']}>
      <h1>Meeting Ended</h1>
      <p>Thank you for joining the meeting.</p>
      <Lottie 
        options={readingLottieAnimationOption}
          height={300}
          width={300}
      />

      <h2>What's next?</h2>
      <Link to={'/projects'} className={styles.homeLink}>Go to Homepage</Link>
      <ul>
        <li>
          <strong>Feedback:</strong> We value your feedback! Please take a moment to fill out our survey to help us improve your experience.
        </li>
        <li>
          <strong>Next Meeting:</strong> Mark your calendar for the next meeting. <a href="#">Add to Calendar</a>
        </li>
        <li>
          <strong>Resources:</strong> Access additional resources related to the meeting topic. <a href="#">View Resources</a>
        </li>
        <li>
          <strong>Support:</strong> Need assistance? Contact our support team at <a href="#">support@example.com</a>
        </li>
      </ul>
    </div>
  );
};

export default MeetingEndedPage;
