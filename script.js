

document.getElementById('search').addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        e.preventDefault();
        getData();
    }
});
document.getElementById("btn").addEventListener("click", getData)
var card = document.querySelector('#ListItems');
card.addEventListener("click", id);

function id(e) {
    if (e.target.className == "card-title") {
        var card = e.target.parentElement.querySelector('.malId');
        var id = card.textContent;
    } else if (e.target.parentElement.className == "card-img") {
        var card = e.target.parentElement.parentElement.querySelector('.malId');
        var id = card.textContent;
    } else if (e.target.className == "card") {
        var card = e.target.querySelector('.malId');
        var id = card.textContent;
    } else {
        return null;
    }
    console.log(id);
    localStorage.setItem('id', id);
    AnimeDetails();
    return id;

};

function AnimeDetails() {
    window.location.href = "anime.html";
}

function getData() {
    var search = document.getElementById("search").value;
    var item = document.getElementById("item");
    if (item != null) {
        while (card.firstChild) {
            card.removeChild(card.firstChild);
        };
    }
    if (search.length > 2) {
        fetch('https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(search))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                count = data.pagination.items.count;
                for (var i = 0; i < count; i++) {
                    let nData = data.data[i];
                    card.innerHTML += `
                                <div class="col-12 col-lg-3 p-3" id="item">
                                    <div class="card h-100">
                                        <div class="card-img">
                                            <img src="${nData.images.jpg.image_url}" width="100%" style="border: solid black">
                                        </div>
                                        <span class="d-none malId">${nData.mal_id}</span>
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
