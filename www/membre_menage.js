// create table
if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}

// insert data
function ajouter(values) {
  db.transaction(function (tx) {
    tx.executeSql(
      `insert into membre_menage 
      (code_district,gourvanerat,num_m,num_indiv,nom , relation, sexe ,etat_civil  ,date_nais , age, niv_s, pers_s) 
      values (?,?,?,?,?,?,?,?,?,?,?,?)
      `,
      values,
      function (tx, result) {
        console.log("success", result);
        alert("Data inserted successfully");
      },
      function (tx, error) {
        console.log("error", error);
      }
    );
  });
}

function getDataFromHTML(event) {
  event.preventDefault();
  const state = [];

  for (let i = 1; i < 11; i++) {
    let row = Array.from(document.querySelectorAll(`#input-${i} > td > input`));

    if (row[0].value === "") continue;

    state.push({
      nom: row[0].value,
      relation: row[1].value,
      sexe: row[2].value,
      etat_civil: row[3].value,
      date_nais: row[4].value,
      age: row[5].value,
      niv_s: row[6].value,
      pers_s: row[7].value,
    });
  }

  console.log(state);

  if (state.length > 0)
    state.forEach(function (el, index) {
      // data = [ ...sessionData , num_m , dataFromHtml ]
      const data = getSessionData().concat([index, ...Object.values(el)]);
      console.log("data : ", data);
      ajouter(data);
    });
}

function getSessionData() {
  return [
    sessionStorage.getItem("code_district"),
    sessionStorage.getItem("gouvernorat"),
    sessionStorage.getItem("num_m"),
  ];
}

function checkSessionData() {
  const data = getSessionData();
  if (data.includes(null)) window.location.href = "index.html";
}

checkSessionData();
