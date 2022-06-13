import Searcher from "../components/Tags/Searcher/Search";
import RoleItem from "../components/Tags/Searcher/SearcherItem/RoleItem";
import ProfessionsItem from "../components/Tags/Searcher/SearcherItem/ProfessionsItem";
import { Fragment } from "react";
import SectionGenerateTags from "../pages-sections/tags/SectionGenerateTags";
//   index, filed, basicQuery,
const Index = () => {
  return (
    <Fragment>
      <Searcher
        index={"role_index"}
        filed={["name", "description", "type"]}
        basicQuery={"role"}
        size={10}
      >
        <RoleItem></RoleItem>
      </Searcher>
      <Searcher
        index={"professtion_index"}
        filed={["name", "description", "type"]}
        basicQuery={"professtion"}
        size={10}
        direction={"row"}
        modal={<SectionGenerateTags category={"profession"} />}
        modalLabel={"분야 생성"}
      >
        <ProfessionsItem></ProfessionsItem>
      </Searcher>
    </Fragment>
  );
};

export default Index;
