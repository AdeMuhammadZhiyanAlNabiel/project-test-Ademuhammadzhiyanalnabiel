const apiUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
let datafetch = [];
var params = {
  "page[number]": 1,
  "page[size]": 10,
  append: ['small_image', 'medium_image'],
  sort: '-published_at'
};
fetchApi();

function fetchApi() {
    pagenum();
    axios.get(apiUrl, {
      params: params
    })
      .then(response => {
        console.log(response.data);
        datafetch = response.data.data;
        console.log(datafetch)
        datadisplay(datafetch)
    })
      .catch(error => {
        console.error("Axios error:", error);
    });
}


function datadisplay(a) {
    document.getElementById("container-content").innerHTML = "";
    var showCount = `${1+(parseInt(params["page[number]"])*parseInt(params["page[size]"]))-parseInt(params["page[size]"])}-${parseInt(params["page[number]"])*parseInt(params["page[size]"])}`
    document.getElementById("keterangan-page").innerText = `Showing ${showCount} of 100`
    a.forEach(element => {
        var divel = document.createElement("div");
        var date = element.published_at ;
        var formattedDate = formatTanggal(date);
        divel.className = "content-card"
        divel.innerHTML = `
        <img src=${element.medium_image[0].url} alt="post-img">
        <div class="content-data">
            <h4>${formattedDate}</h4>
            <a href="#">${element.title}</a>
        </div>
        `
        document.getElementById("container-content").appendChild(divel)
    });
}

function formatTanggal(inputDate) {
    const months = [
      "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
      "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
    ];
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

function pagenum() {
    var pgnumcont = document.getElementById("pgnumid");
    pgnumcont.innerHTML = ""
    var pgnum = 100/parseInt(params["page[size]"]);
    for (let index = 0; index < pgnum; index++) {
        var num = document.createElement("a");
        num.innerHTML = index+1
        num.setAttribute("onclick", `pagechg(${index+1});`);
        num.id = `pagenav${index+1}`
        pgnumcont.appendChild(num);
    }
    document.getElementById(`pagenav${params["page[number]"]}`).classList.add("actpge")
}

function pagechg(num) {
    params["page[number]"] = num;
    fetchApi();
}

function reloadData() {
    var vpp = document.getElementById("viewperpage").value;
    var order = document.getElementById("orderby").value;
    params["page[size]"] = vpp
    params.sort = order
    fetchApi();
}

document.getElementById("viewperpage").addEventListener("change", reloadData);
document.getElementById("orderby").addEventListener("change", reloadData);