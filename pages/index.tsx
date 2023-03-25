import { getSession, useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { Loader } from "../components/layout/Loader";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import landingImgDash from "../public/static/img/safari-mockup.png";
import iconBooks from "../public/static/assets/icon-books.png";
import iconPlant from "../public/static/assets/icon-plant.png";
import iconWrite from "../public/static/assets/icon-write.png";
import iconStats from "../public/static/assets/icon-stats.png";
import Head from "next/head";

export const getServerSideProps = ({ req, res }) => {
  const session = getSession(req, res);
  return { props: { loading: Boolean(session) } };
};

export default function Home({ loading }) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (user) router.push({ pathname: "/dashboard" });
  if (loading || isLoading) return <Loader />;
  else
    return (
      <Layout>
        <Head>
          <title>ShelfSpot</title>
        </Head>
        <div className="landing2">
          <section className="slanted">
            <div className="shape-blob"></div>
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
            <div className="landing-welcome">
              <div className="welcome-content">
                <div className="welcome-text">
                  {/* <div className="welcome-title">Welcome to Shelfspot</div> */}
                  <div className="welcome-heading">Your Digital Bookshelf</div>
                  <div className="welcome-subheading">
                    Organize, create summaries, and share what you read with the
                    world.
                  </div>
                  <div className="or-login">
                    <Link href="/api/auth/login">
                      <div className="create-account-button">Get Started</div>
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
                <div className="img-circle orange">
                  <Image src={iconBooks} alt="" />
                </div>
                <div className="feature-title">Organize</div>
                <div className="feature-text">
                  Bring order to your library, by creating sections for topics
                  and interests. Create tags for books to read, for your wish
                  list, and more.
                </div>
              </div>
              <div className="feature">
                <div className="img-circle blue">
                  <Image src={iconWrite} alt="" />
                </div>
                <div className="feature-title">Summarize</div>
                <div className="feature-text">
                  Create reviews and chapter summaries as you read with a
                  built-in rich text editor. Always remember what what you have
                  read!{" "}
                </div>
              </div>
              <div className="feature">
                <div className="img-circle teal">
                  <Image src={iconPlant} alt="" />
                </div>
                <div className="feature-title">Customize</div>
                <div className="feature-text">
                  Make your shelf feel like home by customizing things like
                  bookcase covor, shelftop decorations, and profile picture
                  frames.
                </div>
              </div>
              <div className="feature">
                <div className="img-circle purple">
                  <Image src={iconStats} alt="" />
                </div>
                <div className="feature-title">Analyze</div>
                <div className="feature-text">
                  Track number of books read, amount of notes written, page
                  views, and more.
                </div>
                <div className="feature-comingsoon">Coming Soon</div>
              </div>
            </div>
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
          <div className="footer">© Matt Clagett 2023</div>
        </div>
      </Layout>
    );
}
