window.onload = init;

function init() {
    localStorage.getItem('id') == null ? window.location.href = 'index.html' : '';
    id = localStorage.getItem('id');
    console.log(id);
    fetchdata();
    function fetchdata() {
        fetch('https://api.jikan.moe/v4/anime/' + id)
            .then(res => {
                return res.json()
            })
            .then(data => {
                nData = data.data;
                console.log(nData);
                var start = new Date(nData.aired.from);
                var end = new Date(nData.aired.to);
                var sDate = start.toDateString();
                var eDate = end.toDateString();
                console.log(sDate);
                var sym = nData.synopsis;
                sym = sym.split(`[Written by MAL Rewrite]`);
                var container = document.body;
                container.innerHTML = `
                        <div class = "container p-5">
                        <div class = "row">
                        <div class = "col-3">
                        <img src   = "${nData.images.jpg.image_url}"> <br><br>
                            <h3>${nData.title}</h3>
                        </div>
                        <div class = "col-9">
                            ${sym}
                            <div class = "alert alert-info mt-5">
                                Details: <br><br>
                                <div class = "row">
                                <div class = "col-2">
                                                    Episodes: <br>
                                                    Rated   : <br>
                                              Start Date    : <br>
                                              End   Date    : <br>
                                    </div>
                                    <div class = "col">
                                        ${nData.episodes} <br>
                                        ${nData.rating} <br>
                                         ${sDate}<br>
                                        ${eDate} <br>
                                    </div>
                                </div>

                            </div>
                            </div>
                            </div>
                            </div>
            `
            })
    }
}
