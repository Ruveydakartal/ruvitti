import { useState } from 'react';
import style from './Home.module.css';

const Home = () => {
    const [currentMemory, setCurrentMemory] = useState(0);

    const handleArrowClick = (direction) => {
      const totalMemories = document.querySelectorAll(`.${style.memory}`).length;
      let newCurrentMemory;
  
      if (direction === 'left') {
        newCurrentMemory = (currentMemory - 1 + totalMemories) % totalMemories;
      } else {
        newCurrentMemory = (currentMemory + 1) % totalMemories;
      }
  
      setCurrentMemory(newCurrentMemory);
    };

    return (
        <div className={style.container}>
            <section className={style.hero}>
                <div className={style.heroBanner}>
                    <img src="./images/cracked-wall.png" alt="hero-image"  className={style.heroImg}/>
                    <h2>Graffiti redefined in the digital age</h2>
                </div>

                <div className={style.heroContent}>
                    <img src="./images/Arrow.png" alt="" className={style.arrowImage} />
                    <p>scroll down</p>
                </div>
            </section>
            
            <section className={style.techContainer}>
            <h1 className={style.techTitle}>TECHN</h1>
            <h1 className={style.techTitle2}>OLOGY</h1>
            <div className={style.techExplanation}>
                    <img src="./images/camera.png" alt="Camera Icon" />
                    <img src="./images/whiteboard.png" alt="Whiteboard Icon" />
                    <img src="./images/spraycan.png" alt="Spray Icon" className={style.spraycan}/>
            </div>       
                <div className={style.techBlock}>
                    <p>Behind the wall there are two key components: A camera and aprojector. With the camera we are detecting what your are drawing to project it in real time. </p>
                    <p>the wall is made from a steel outline with a white cloth attached to it. You can see what you draw instantly. </p>
                    <p>In our spray can we have a laserpointer to show the camera where you are drawing.</p>
                </div>
        </section>

        <section className={style.visionContainer}>
            <div className={style.visionTitle}>
                <h1>VISION</h1>
                <img src="./images/star.png" alt="" />
            </div>
            <div className={style.visionExplanation}>
                <p>The aim of this project is to empower the voices of young people. In a world where technology is advancing rapidly, what sets us apart from machines are our thoughts and creativity. My goal was to demonstrate this by creating something both challenging and innovative, while highlighting the users creativity and showcasing it on the Infinite Wall</p>
                <div className={style.visionImages}>
                    <img src="./images/art1.png" alt=""  className={style.art1}/>
                    <img src="./images/art2.png" alt="" className={style.art2}/>
                </div>
            </div>
        </section>

        <section className={style.videoContainer}>
            <h1>BEHIND THE SCENES</h1>
            <section className={style.memories}>
        <div className={`${style.arrow} ${style.left}`} onClick={() => handleArrowClick('left')}>
          <img src="./images/chevron.left.png" alt="left arrow" className={style.img} />
        </div>
        <div className={style.memoryContainer}>
          <div className={style.memoriesWrapper} style={{ transform: `translateX(-${currentMemory * 100}%)` }}>
            <div className={style.memory}>
              <img src="./images/car1.jpeg" alt="April Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car2.jpeg" alt="May Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car3.jpeg" alt="June Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car4.jpg" alt="July Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car5.jpg" alt="August Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car6.jpeg" alt="September Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car7.jpg" alt="October Memory" />
            </div>
            <div className={style.memory}>
              <img src="./images/car8.jpeg" alt="November Memory" />
            </div>
          </div>
        </div>
        <div className={`${style.arrow} ${style.right}`} onClick={() => handleArrowClick('right')}>
          <img src="./images/chevron.Right.png" alt="right arrow" className={style.img} />
        </div>
      </section>

        </section>

        <section className={style.contactContainer}>
            <div className={style.contactTitle}>
                <h1>CONTACT</h1>
                <img src="./images/red-cat.png" alt="" />
            </div>
            <div className={style.contactExplanation}>
                <p>Let&apos;s get in touch! You can find us at various events and places in Ghent! But if thats too abstract for you, You can always contact me. If it&apos;s a question about my project or you simply what to talk or brainstorm, don&apos;t hesitate, just shoot! </p>
                <div className={style.contactInfo}>
            <div className={style.contactItem}>
                <img src="./images/mail.png" alt="Email icon" />
                <p><a href="mailto:ruveyda.kartal@outlook.be">ruveyda.kartal@outlook.be</a></p>
            </div>
            <div className={style.contactItem}>
                <img src="./images/phone.png" alt="Phone icon" />
                <p><a href="tel:+32489753204">+32 489 75 32 04</a></p>
            </div>
        </div>
            </div>
            <img src="./images/water-cat.png" alt="" className={style.waterCat}/>

        </section>
        </div>
    );
};

export default Home;