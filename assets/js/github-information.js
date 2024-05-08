function fetchGitHubInformation (event) {
    var username = $("#gh-username").val(); // get elemnt with id gh-username and get it's value
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter the GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>`
    );
}