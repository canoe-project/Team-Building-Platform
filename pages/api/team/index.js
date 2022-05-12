const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

export default handle;
