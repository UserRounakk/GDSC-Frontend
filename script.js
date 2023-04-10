

document.getElementById('search').addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        e.preventDefault();
        getData();
    }
});
document.getElementById("btn").addEventListener("click", getData)
var card = document.querySelector('#ListItems');

function getData() {
    var search = document.getElementById("search").value;
    var item = document.getElementById("item");
    if (item != null) {
        while (card.firstChild) {
            card.removeChild(card.firstChild);
        };
    }
    if (search.length > 2) {
        fetch('https://api.jikan.moe/v4/anime?q=' + search)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                count = data.pagination.items.count;
                for (var i = 0; i < count; i++) {
                    let nData = data.data[i];
                    console.log(nData.images.jpg);
                    card.innerHTML += `
                                <div class="col p-3" id="item">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="${nData.images.jpg.image_url}" width="100%" style="border: solid black">
                                        </div>
                                        <div class="card-title">
                                        <br>
                                            <center><h6>${nData.title}</h6></center>
                                        </div>
                                    </div>
                                </div>
                    `;
                }
            }).catch((err) => {
                alert("Error loading data");
            })
    } else {
        alert("Please enter at least 3 characters")
    }

}
