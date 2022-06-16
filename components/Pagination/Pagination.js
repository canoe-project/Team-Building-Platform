/*
정도현
*/


import React, { Fragment, useState } from "react";
import Pagination from "react-js-pagination";

const Paging = ({ currentPage, MaxPage, handel }) => {
  return (
    <Fragment>
      <Pagination
        activePage={parseInt(currentPage)}
        totalItemsCount={MaxPage}
        itemsCountPerPage={16}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handel}
      />
    </Fragment>
  );
};

export default Paging;
