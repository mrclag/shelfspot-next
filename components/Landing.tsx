import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import landingImgDash from "../assets/landing-img-dash.png";
import iconBooks from "../assets/icon-books.png";
import iconPlant from "../assets/icon-plant.png";
import iconWrite from "../assets/icon-write.png";
import iconStats from "../assets/icon-stats.png";
import Layout from "../components/Layout";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="landing">
        <section className="slanted">
          <div className="landing-welcome">
            <div className="welcome-content">
              <div className="welcome-text">
                <div className="welcome-title">Welcome to Shelfspot</div>
                <div className="welcome-heading">Your Digital Bookshelf.</div>
                <div className="welcome-subheading">
                  Easily organize, summarize, and share what you read with the
                  world.
                </div>
                {/* <Link className="create-account-button" href='/api/auth/signup'>Create an Account</Link> */}
                <div className="or-login">
                  or{" "}
                  <Link href="/api/auth/login">
                    <div className="or-login-link">click here to log in.</div>
                  </Link>
                </div>
              </div>
              <Image src={landingImgDash} alt="" />
            </div>
          </div>
        </section>
        <div className="landing-features">
          <div className="features-box">
            <div className="feature">
              <Image src={iconBooks} alt="" />
              <div className="feature-title">Organize</div>
              <div className="feature-text">
                Bring order to your library, by creating sections for topics and
                interests. Create tags for books to read, for your wish list,
                and more.
              </div>
            </div>
            <div className="feature">
              <Image src={iconWrite} alt="" />
              <div className="feature-title">Summarize</div>
              <div className="feature-text">
                Create reviews and chapter summaries as you read with a built-in
                rich text editor. Always remember what what you have read!{" "}
              </div>
            </div>
            <div className="feature">
              <Image src={iconPlant} alt="" />
              <div className="feature-title">Customize</div>
              <div className="feature-text">
                Make your shelf feel like home by customizing things like
                bookcase covor, shelftop decorations, and profile picture
                frames.
              </div>
            </div>
          </div>
        </div>
        <div className="extra-feature">
          <div className="feature-comingsoon">Coming Soon</div>
          <div className="feature-content">
            <Image src={iconStats} alt="" />
            <div className="feature-title">Analysis</div>
            <div className="feature-text">
              Track number of books read, amount of notes written, page views,
              and more.
            </div>
          </div>
        </div>
        <div className="demo-section">
          <div className="demo-content">
            <div className="watch-video" onClick={() => setShowModal(true)}>
              <i className="fas fa-play play-button"></i>
              <div className="watch-text">WATCH VIDEO</div>
            </div>
            <div className="demo-title">Check out a quick demo</div>
            <div className="demo-text">
              ShelfSpot is free to sign up, but if you want to tour the app
              before you sign up, press play.
            </div>
          </div>
        </div>
        <div className="footer">Created by Matt Clagett</div>
      </div>
    </Layout>
  );
}
