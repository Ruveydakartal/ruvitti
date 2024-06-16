import style from './Footer.module.css';

const Footer = () => {
    return (
        <div className={style.container}>
                    <div className={style.footerContentLeft}>
                        <div>
                            <img src="/images/ruvitti.png" alt="Ruvitti Logo" className={style.footerContentLeftLogo} />
                        </div>
                        <div className={style.footerContentLeftText}>
                            <p>© 2024 Ruvitti, Inc. All rights reserved.</p>
                        </div>
                    </div>
                    {/* <div className={style.footerContentRight}>
                        <div className={style.footerContentRightLinks}>
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </div> */}
            
        </div>
    );
};

export default Footer;