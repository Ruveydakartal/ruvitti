import style from './About.module.css';

const About = () => {
    return (
        <div className={style.container}>
            <img src="./images/me.jpeg" alt="" className={style.meImg}/>
            <div className={style.detail}>
                <div className={style.title}>
                    <h1>ABOUT ME</h1>
                    <img src="./images/shooting-star.png" alt="" />
                </div>
                <p>Hello! I&apos;m Rüveyda Kartal, a passionate technology enthusiast and art appreciator. This project represents a fusion of my two interests. At the beginning, I wasn&apos;t sure if it would succeed, but I&apos;m delighted by the overwhelming interest and positivity it has received. My goal wasn&apos;t just to create something &apos;cool&apos; but also meaningful. I hope this project inspires you, that it is never wrong to speak your mind or show your creativity. It&apos;s what makes you, You. </p>
            </div>
            <img src="./images/panda.png" alt="" className={style.panda}/>
        </div>
    );
};

export default About;