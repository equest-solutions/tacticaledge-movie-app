import BGImage from "../../assets/images/bg-landing.jpg";
import Button from "../../components/button/Button";
import ButtonOutline from "../../components/button/ButtonOutline";
import IconCartBig from "../../components/icon/IconCartBig";
import HeadingExtraLarge from "../../components/typography/HeadingExtraLarge";
import TextLarge from "../../components/typography/TextLarge";
import styles from "./auth.module.css";

function Landing() {
   return (
      <div style={{ backgroundImage: `url(${BGImage})` }} className={styles.landing}>
         <div className={styles.landingBox}>
            <div className="max-w-[90px] mb-7 mx-auto">
               <IconCartBig />
            </div>
            <HeadingExtraLarge className="text-white mb-4.5 text-center">
               Welcome to <span className="text-primary-400">SM Restaurant</span>
            </HeadingExtraLarge>
            <TextLarge className="text-white leading-8 text-center mb-10">
               Lorem ipsum dolor sit amet consectetur. Lectus id maecenas aliquet a mattis facilisis vulputate consectetur.
               Faucibus eget senectus tincidunt et ut orci.
            </TextLarge>
            <Button className="bg-primary-400 mx-auto mb-6 border-primary-400" size="lg" isLink linkPath="/signup">
               <span className="font-bold font-secondary">Sign Up</span>
            </Button>
            <ButtonOutline className="mx-auto border-2" size="lg" isLink linkPath="/login">
               <span className="font-bold font-secondary text-white">Sign In</span>
            </ButtonOutline>
         </div>
      </div>
   );
}
export default Landing;
