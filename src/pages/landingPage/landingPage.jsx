import React from 'react';
import styles from './landingPage.module.css';
import Lottie from 'react-lottie';
import animation1 from '../../assets/animation1.json'
import meetIcon from '../../assets/video-call-webcam-landingpage.svg'
import chatIcon from '../../assets/chat-profile-profiles-landingpage.svg'
import projectIcon from '../../assets/networking-collaboration-landingpage.svg'
import logoFST from '../../assets/logo-fst.png'
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
                <a href='/login' className={styles.navLink}>login</a>
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
                <img src={meetIcon} className={styles.image}/>
                <h3 className={styles.featureTitle}>Video Calls</h3>
                <p className={styles.featureDescription}>Experience seamless video conferencing with our Video Calls feature, ensuring effective team meetings.</p>
                </div>
                <div className={styles.feature}>
                <img src={chatIcon} className={styles.image}/>
                <h3 className={styles.featureTitle}>Chat</h3>
                <p className={styles.featureDescription}>Stay connected with instant messaging through our Chat feature, keeping everyone on the same page.</p>
                </div>
                <div className={styles.feature}>
                <img src={projectIcon} className={styles.image}/>
                <h3 className={styles.featureTitle}>Project Management</h3>
                <p className={styles.featureDescription}>Streamline your workflow with our Project Management tools, allowing you to plan, track, and deliver your work with clarity.</p>
                </div>
                
            </section>
            <div>
    <p>Découvrez les fonctionnalités de notre application à travers cette vidéo démo</p>
    <iframe src="https://www.youtube.com/embed/AAB6ijquQ9c" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
            <section id="about" className={styles.about}>
                <h2 className={styles.aboutTitle}>About WorkElite</h2>
                <p className={styles.aboutDescription}>Discover WorkElite: your all-in-one online platform tailored to elevate IT startups. In today's fast-paced world, where efficiency and seamless communication are paramount, WorkElite stands out as the ultimate solution for turning daily challenges into growth opportunities.</p>
                <div className={styles.aboutdiv}>
                    <p className={styles.paragraph}>This project was undertaken within the LCS2 Federated Project framework, under the guidance of Faouzi MOUSSA and hosted by the Department of Computer Science at the Faculty of Sciences of Tunis, University of Tunis El Manar.</p>
                    <img src={logoFST} className={styles.imageFST}/>
                </div>
            </section>

            <footer id="contact" className={styles.footer}>
                <h2 className={styles.footerTitle}>Get in Touch</h2>
                <p className={styles.footerDescription}>Ready to start? Contact us to learn more about how WorkElite can transform your team's workflow.</p>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <table>
                        <tr>
                            <td style={{textAlign: 'left'}}>Youssef Fathallah:</td>
                            <td style={{textAlign: 'left'}}><a href='mailto:fathallah.youssef@etudiant-fst.utm.tn' style={{color: '#08639c'}}>fathallah.youssef@etudiant-fst.utm.tn</a></td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Idris Laabidi:</td>
                            <td style={{textAlign: 'left'}}><a href='mailto:labidi.idris@etudiant-fst.utm.tn' style={{color: '#08639c'}}>labidi.idris@etudiant-fst.utm.tn</a></td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Rayen Miri:</td>
                            <td style={{textAlign: 'left'}}><a href='mailto:miri.rayen@etudiant-fst.utm.tn' style={{color: '#08639c'}}>miri.rayen@etudiant-fst.utm.tn</a></td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Tasnime ben Boubaker: {"\u00A0"}</td>
                            <td style={{textAlign: 'left'}}><a href='mailto:benboubaker.tasnime@etudiant-fst.utm.tn' style={{color: '#08639c'}}>benboubaker.tasnime@etudiant-fst.utm.tn</a></td>
                        </tr>
                    </table>
                </div>
                
                <p>&copy; {new Date().getFullYear()} WorkElite. All rights reserved.</p>
            </footer>
        </div>
  );
};

export default LandingPage;