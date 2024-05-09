function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`
}

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    return `<div class="clearfix repo-list">
                <p><strong>Repo List:</strong></p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html(""); //bug fix empty user name and repo data, so it doesn't display anything if its empty
    $("#gh-repo-data").html("");

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

    // JQuery promise, takes function as first argument
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        //when we do two calls like this, the .then method packs up response in to arrays.
        //and each one is a first element of the array, that's why we will need to take use indexes ex.: firstResponse[0]; secondResponse[0]
        // * when it was one call, we didint need to use indexes.
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];   
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        });

}

$(document).ready(fetchGitHubInformation); // when document loads, it will execute and fetchGithubInformation