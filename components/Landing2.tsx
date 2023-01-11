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
      <div className="landing2">
        <section className="slanted">
          <div className="shape-blob"></div>
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
          <div className="landing-welcome">
            <div className="welcome-content">
              <div className="welcome-text">
                <div className="welcome-title">Welcome to Shelfspot</div>
                <div className="welcome-heading">Your digital bookshelf</div>
                <div className="welcome-subheading">
                  Organize, summarize, and share what you read with the world.
                </div>
                <div className="or-login">
                  <Link href="/api/auth/login">
                    <div className="create-account-button">Start Stacking</div>
                  </Link>
                </div>
              </div>
              <div className="welcome-img">
                <Image src={landingImgDash} alt="" />
              </div>
            </div>
          </div>
        </section>
        <div className="landing-features">
          <div className="features-box">
            <div className="feature">
              <Image src={iconWrite} alt="" />
              <div className="feature-title">Summarize</div>
              <div className="feature-text">
                Create reviews and chapter summaries as you read with a built-in
                rich text editor.{" "}
              </div>
            </div>
            <div className="feature">
              <Image src={iconBooks} alt="" />
              <div className="feature-title">Organize</div>
              <div className="feature-text">
                Order your library by creating sections for topics and
                interests. Create tags for books to read, for your wish list,
                and more.
              </div>
            </div>
            <div className="feature">
              <Image src={iconPlant} alt="" />
              <div className="feature-title">Customize</div>
              <div className="feature-text">
                Make your shelf feel like home by customizing things like
                bookcase color, decorations, and profile picture frames.
              </div>
            </div>
            <div className="feature">
              <Image src={iconStats} alt="" />
              <div className="feature-title">Analyze</div>
              <div className="feature-text">
                Track number of books read, amount of notes written, page views,
                and more.
              </div>
              <div className="feature-comingsoon">Coming Soon</div>
            </div>
          </div>
        </div>
        <div className="extra-feature">
          {/* <div className="feature-comingsoon">Coming Soon</div>
          <div className="feature-content"></div> */}
        </div>
        {/* <div className="demo-section">
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
        </div> */}
        <div className="footer">Created by Matt Clagett</div>
      </div>
    </Layout>
  );
}
