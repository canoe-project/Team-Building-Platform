/*
정도현
*/

import palettes from "../../../../nextjs-material-kit/palettes";

const styles = {
  title: {
    alignItems: "center",
    fontFamily: "Do Hyeon",
    fontSize: "3rem",
    fontWeight: "500",
    marginTop: "0",
    marginBottom: "0",
  },
  titleContain: {
    marginTop: "2.5rem",
  },
  dateContain: {
    marginLeft: "100%",
  },
  body: {
    color: "#263747",
    fontFamily: "SCDream3",
    fontSize: "1rem",
    minHeight: "20rem",
  },
  icon: {
    height: "2rem",
    width: "2rem",
    alignItems: "center",
    marginRight: "1rem",
  },
  iconContain: {
    marginRight: "0.5rem",
  },
  iconMenuIcon: {
    height: "2rem",
    width: "2rem",
    marginLeft: "100%",
  },
  editor: {
    border: "none",
  },
  menu: {
    height: "20rem",
  },
  card: {
    padding: "2.5rem",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  overview: {
    height: "100%",
    padding: "2rem",
  },
  overviewItem: {
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  overviewBody: {
    fontSize: "1rem",
  },
  borderRight: {
    borderRight: "0.0625rem solid #D7E2EB",
  },
  subTitle: {
    marginTop: "1rem",
    marginBottom: "1.5rem",
    fontFamily: "SCDream4",
    fontWeight: "bold",
  },
  avatarIcon: {
    width: "2rem",
    height: "2rem",
  },
  comment: {
    width: "100%",
  },
  cardFooter: {
    marginTop: "auto",
  },
  joinButton: {
    marginTop: "1.25rem",
    width: "8rem",
    height: "2.5rem",
    backgroundColor: palettes.hotPink,
    "&:hover": {
      background: palettes.darkPink1,
    },
    marginLeft: "auto",
    marginRight: "1rem",
  },
  createButton: {
    position: "fixed",
    top: "85%",
    left: "93%",
    boxShadow:
      "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
  },
  buttonIcon: {
    width: "2.5rem",
    height: "2.5rem",
  },
  roleCardContain: {
    minHeight: "32.23125rem",
    backgroundColor: "#D7E2EB",
  },
  searcher: {
    alignItems: "center",
    transform: "scale(0.7)",
    borderRadius: "3rem",
    backgroundColor: "#ffffff",
  },
  deleteIcon: {
    alignSelf: "self-end",
    position: "absolute",
    top: "1rem",
    marginBttom: "90%",
    width: "0.5rem",
    height: "0.5rem",
  },
  deleteButton: {
    width: "0.25rem",
  },
};

export default styles;
