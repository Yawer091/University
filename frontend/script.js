document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let inp = document.getElementById("searchuni").value;
    fetch("http://localhost:8080/getuniversity?name=" + inp)
      .then((res) => res.json())
      .then((data) => displayResult(data))
      .catch((err) => console.log(err));
  });

function displayResult(result) {
  let table =
    "<table><thead><tr><th>Name</th><th>State-Province</th><th>Web Pages</th></tr><thead/><tbody>";
  result.forEach((university) => {
    table +=
      "<tr><td>" +
      university.name +
      "</td><td>" +
      university["state-province"] +
      "</td><td>";
    university.web_pages.forEach((page) => {
      table += '<a href="' + page + '" target="_blank">' + page + "</a><br>";
    });

    // table += "</td><td>";
    // university.domains.forEach((domain) => {
    //   table += domain + "<br>";
    // });

    table += "</td></tr>";
  });
  table += "</tbody></table>";
  document.getElementById("resultsData").innerHTML = table;
}
