import { useEffect, useState } from "react";

import Treemap from "../components/Visualizations/Treemap/Treemap";

const reqProfesstion = async (index, filed, size) => {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/search/groupBy?index=${index}&filed=${filed}&size=${size}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });

  return data;
};

const reqColor = async () => {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/tags/Profession/?select=color`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
  console.log(data);
  return data;
};

const index = "contest_index";
const filed = "professtion_name.keyword";
const size = 0;
const App = () => {
  const [treemapData, setTreemapData] = useState([{ name: "Origin", parent: "", value: "" }]);
  useEffect(() => {
    
    reqProfesstion(index, filed, size).then((res) => {
      const root = res.map((data) => {
        return {
          name: data.key,
          parent: "Origin",
          value: data.doc_count,
        };
      });
      root.columns = ["name", "parent", "value"];

      setTreemapData([...treemapData, ...root]);
    });
  }, []);
  return <Treemap value={treemapData}></Treemap>;
};
export default App;

// 0: {name: 'Origin', parent: '', value: ''}
// 1: {name: 'grp1', parent: 'Origin', value: '12'}
// 2: {name: 'grp2', parent: 'Origin', value: '23'}
// 3: {name: 'grp3', parent: 'Origin', value: '11'}
// 4: {name: 'grp4', parent: 'Origin', value: '40'}
// 5: {name: 'grp5', parent: 'Origin', value: '30'}
// 6: {name: 'grp6', parent: 'Origin', value: '25'}
// columns: Array(3)
// 0: "name"
// 1: "parent"
// 2: "value"
