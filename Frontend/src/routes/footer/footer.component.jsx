import { Fragment } from "react";

const Navigation = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="top">
          <div className="heading-secondary">Made with 💓 by Codechef-VIT</div>
        </div>
        <div className="media-icons">
          <ul className="social-links">
            <li className="heading-secondary">Follow us on</li>

            <li className="mar-f">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/codechefvit/"
              >
                <ion-icon
                  name="logo-instagram"
                  className="social-icon"
                ></ion-icon>
              </a>
            </li>
            <li className="mar-f">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/codechefvit/"
              >
                <ion-icon
                  name="logo-twitter"
                  className="social-icon"
                ></ion-icon>
              </a>
            </li>
            <li className="mar-f">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/codechef-vit-chapter/?original_referer="
              >
                <ion-icon
                  name="logo-linkedin"
                  className="social-icon"
                ></ion-icon>
              </a>
            </li>
            <li className="mar-f">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://medium.com/codechef-vit"
              >
                <ion-icon name="logo-medium" className="social-icon"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </Fragment>
  );
};

export default Navigation;
