const axios = require("axios");
const { generateID } = require("./helpers");

const getDummyDataFormatted = async () => {
  let dataObjArr = [];
  await axios
    .get("https://jsonplaceholder.typicode.com/todos/")
    .then((response) => {
      dataObjArr = [...response.data];
    });

  //map dataObjArr into format {id, todo, completed, dueDate}
  let newObjArr;
  dataObjArr.map((dataObj) => {
    const newObj = {
      id: generateID(),
      todo: dataObj.title,
    };
  });
};

getDummyDataFormatted();
