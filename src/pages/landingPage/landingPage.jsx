import React from 'react';
import styles from './landingPage.module.css';
import Lottie from 'react-lottie';
import animation1 from '../../assets/animation1.json'
const LandingPage = () => {
    const readingLottieAnimationOption = {
        loop: true,
        autoplay: true,
        animationData: animation1,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>WorkElite</h1>
                <nav className={styles.navigation}>
                <a href="#about" className={styles.navLink}>About</a>
                <a href="#contact" className={styles.navLink}>Contact</a>
                <a href='/register' className={styles.navLink}>register</a>
                <a href='/register' className={styles.navLink}>login</a>
                </nav>
            </header>

            <section className={styles.hero}>
            <Lottie 
                  options={readingLottieAnimationOption}
                    height={400}
                    width={400}
                />
                <h2 className={styles.heroTitle}>Empower Your Team Collaboration</h2>
                <p className={styles.heroSubtitle}>Connect, collaborate, and manage your projects with ease.</p>
                <a href="/register" className={styles.ctaButton}>Get Started</a>
            </section>

            <section id="features" className={styles.features}>
                <div className={styles.feature}>
                <h3 className={styles.featureTitle}>Video Calls</h3>
                <p className={styles.featureDescription}>Seamless video conferencing for effective team meetings.</p>
                </div>
                <div className={styles.feature}>
                <h3 className={styles.featureTitle}>Chat</h3>
                <p className={styles.featureDescription}>Instant messaging to keep everyone on the same page.</p>
                </div>
                <div className={styles.feature}>
                <h3 className={styles.featureTitle}>Project Management</h3>
                <p className={styles.featureDescription}>Tools to plan, track, and deliver your work with clarity.</p>
                </div>
            </section>

            <section id="about" className={styles.about}>
                <h2 className={styles.aboutTitle}>About WorkElite</h2>
                <p className={styles.aboutDescription}>WorkElite is an all-in-one online platform designed to boost IT startups. In a world where efficiency and fluid communication are the key to success, WorkElite presents itself as the ultimate solution for transforming daily challenges into growth opportunities.</p>
            </section>

            <footer id="contact" className={styles.footer}>
                <h2 className={styles.footerTitle}>Get in Touch</h2>
                <p className={styles.footerDescription}>Ready to start? Contact us to learn more about how WorkElite can transform your team's workflow.</p>
                <p>&copy; {new Date().getFullYear()} WorkElite. All rights reserved.</p>
            </footer>
        </div>
  );
};

export default LandingPage;