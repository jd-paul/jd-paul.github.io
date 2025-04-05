import React from "react";
import { List, Frame, Cursor, TaskBar, TitleBar } from "@react95/core";
import Janne_pixelated from "../assets/janne_pixelated.png";
import Shortcuts from "./desktopIcons";
import * as S from "./layoutStyling";
import "./styles.scss";
import { Shell3236, User, Progman34, Textchat, Explorer103, Awfxcg321303 } from "@react95/icons";
import Portfolio from "./portfolio";
import CV from "./cv";
import About from "./welcome";
import Skills from "./skills";
import useModal from "./useModal";

function Desktop() {
  const [showAboutModal, handleOpenAboutModal, handleCloseAboutModal] = useModal(true);
  const [showSkillsModal, handleOpenSkillsModal, handleCloseSkillsModal] = useModal(false);
  const [showPhotoModal, handleOpenPhotoModal, handleClosePhotoModal] = useModal(false);
  const [showPortfolioModal, handleOpenPortfolioModal, handleClosePortfolioModal] = useModal(false);
  const [showCVModal, handleOpenCVModal, handleCloseCVModal] = useModal(false);

  const socialMedia = [
    {
      id: 0,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/janneilkka/",
    },
    {
      id: 1,
      name: "Github",
      url: "https://www.github.com/janneilkka/",
    },
    {
      id: 2,
      name: "Bluesky",
      url: "https://bsky.app/profile/janne-koivisto.bsky.social",
    },
    {
      id: 3,
      name: "Mastodon",
      url: "https://mastodon.social/@jannekoivisto",
    },
  ];

  return (
    <>
      <TaskBar
        list={
          <List width={"200px"}>
            <List.Item
              className="listLink"
              icon={<Progman34 variant="32x32_4" />}
            >
              Socials
              <List>
                {socialMedia.map(({ id, name, url }) => (
                  <a
                    className="listLink"
                    as="a"
                    target="_blank"
                    href={url}
                    key={id}
                  >
                    <List.Item className={`${Cursor.Pointer} listLink`}>{name}</List.Item>
                  </a>
                ))}
              </List>
            </List.Item>
            <List.Item
              icon={<Awfxcg321303 variant="32x32_4" />}
              onClick={handleOpenCVModal}
              className="listLink"
            >
              CV
            </List.Item>
            <List.Item
              icon={<Explorer103 variant="32x32_4" />}
              onClick={handleOpenPortfolioModal}
              className="listLink"
            >
              Portfolio
            </List.Item>
            <List.Item
              icon={<User variant="32x32_4" />}
              onClick={handleOpenPhotoModal}
              className="listLink"
            >
              Janne
            </List.Item>
            <List.Item
              icon={<Shell3236 variant="32x32_4" />}
              onClick={handleOpenSkillsModal}
              className="listLink"
            >
              Skills
            </List.Item>
            <List.Divider />
            <List.Item
              icon={<Textchat variant="32x32_4" />}
              onClick={handleOpenAboutModal}
              className="listLink"
            >
              Welcome
            </List.Item>
          </List>
        }
      />

      <Shortcuts
        openPortfolio={handleOpenPortfolioModal}
        openCV={handleOpenCVModal}
      />

      {showAboutModal && <About closeAboutModal={handleCloseAboutModal} />}
      {showSkillsModal && <Skills closeSkillsModal={handleCloseSkillsModal} />}
      {showPhotoModal && (
        <S.styledModal
          title={"janne_compressed_for_web.jpeg"}
          titleBarOptions={
            <TitleBar.Close onClick={handleClosePhotoModal} key="close" />
          }
          icon={<User variant="16x16_4" />}
        >
          <Frame boxShadow="none" className="fullWidthImage">
            <img
              src={Janne_pixelated}
              aria-hidden
              alt="Janne as a pixelated image"
              className="fullWidthImage"
            />
          </Frame>
        </S.styledModal>
      )}
      {showPortfolioModal && (
        <Portfolio closePortfolio={handleClosePortfolioModal} />
      )}
      {showCVModal && <CV closeCV={handleCloseCVModal} />}
    </>
  );
}

export default Desktop;
