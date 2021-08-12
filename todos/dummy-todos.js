let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
const todaysDate = year + "-" + month + "-" + date;
// const dummyTodos = [
//   {
//     todo: "This is your first todo. Congratulations! Feel free to complete me.",
//     dueDate: todaysDate,
//     completed: false,
//     list: "inbox",
//   },
//   {
//     todo: "Water the plants",
//     dueDate: "2021-08-11",
//     completed: true,
//     list: "inbox",
//   },
// ];
const dummyTodos = [
  {
    todo: "Water the plants",
    dueDate: "2021-08-11",
    completed: true,
    list: "home",
  },
  {
    todo: "Beat Gilbert at ping pong",
    dueDate: "2021-08-11",
    completed: false,
    list: "home",
  },
  {
    todo: "Beat Kyle at pong",
    dueDate: "2021-08-11",
    completed: false,
    list: "home",
  },
  {
    todo: "Defeat neoliberalism",
    dueDate: "2021-08-11",
    completed: false,
    list: "inbox",
  },
  {
    todo: "Become awesome",
    dueDate: "2021-08-11",
    completed: true,
    list: "inbox",
  },
  {
    todo: "Study mycology and develop a start up that uses mycellium networks to sequester C02",
    dueDate: "2021-08-11",
    completed: false,
    list: "inbox",
  },
  {
    todo: "Find a dev job",
    dueDate: "2021-08-11",
    completed: false,
    list: "work",
  },
  {
    todo: "Sign up for 401k",
    dueDate: "2021-08-11",
    completed: false,
    list: "work",
  },
  {
    todo: "Meet Nelson for lunch",
    dueDate: "2021-08-11",
    completed: false,
    list: "work",
  },
];

module.exports = dummyTodos;
