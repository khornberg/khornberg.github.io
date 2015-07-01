(function () {
  var user = 'khornberg';

  // Put custom repo URL's in this object, keyed by repo name.
  var repoUrls = {

  };

  function repoUrl(repo) {
    return repoUrls[repo.name] || repo.html_url;
  }

  // Put custom repo descriptions in this object, keyed by repo name.
  var repoDescriptions = {

  };

  function repoDescription(repo) {
    return repoDescriptions[repo.name] || repo.description;
  }

  function styleLanguage(language) {
    // Replaced spaces with '-', '#' with 'sharp', and '+' with 'p'
    return language.replace(/ /gi, '-').replace(/\+/gi, 'p').replace(/#/gi, "sharp");
  }

  // function addRecentlyUpdatedRepo(repo) {
  //   var $item = $("<li>");

  //   var $name = $("<a>").attr("href", repo.html_url).text(repo.name);
  //   $item.append($("<span>").addClass("name").append($name));

  //   var $time = $("<a>").attr("href", repo.html_url + "/commits").text(strftime("%h %e, %Y", repo.pushed_at));
  //   $item.append($("<span>").addClass("time").append($time));

  //   $item.append('<span class="bullet">&sdot;</span>');

  //   var $watchers = $("<a>").attr("href", repo.html_url + "/watchers").text(repo.watchers + " stargazers");
  //   $item.append($("<span>").addClass("watchers").append($watchers));

  //   $item.append('<span class="bullet">&sdot;</span>');

  //   var $forks = $("<a>").attr("href", repo.html_url + "/network").text(repo.forks + " forks");
  //   $item.append($("<span>").addClass("forks").append($forks));

  //   $item.appendTo("#recently-updated-repos");
  // }

  function getJSON (uri, callback) {
    var data = undefined;
    request = new XMLHttpRequest();
    request.open('GET', uri, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        // Success!
        data = JSON.parse(request.responseText);
        // console.debug(data);
        callback(data);
      } else {
        // We reached our target server, but it returned an error
        console.error(request.responseText);
        var repos = document.getElementById('flex-container'),
        message = '<p>Oh no...something went wrong :(<p>',
        item = document.createElement('div');

        item.classList.add('flex-item', 'repo');
        item.innerHTML = message;
        repos.appendChild(item);
      }
    };

    request.onerror = function(err) {
      // There was a connection error of some sort
      console.error(err);
    };

    request.send();
  }

  function repoHotness(repo) {
    repo.pushed_at = new Date(repo.pushed_at);

    var weekHalfLife  = 1.146 * Math.pow(10, -9);

    var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
    var createdDelta = (new Date) - Date.parse(repo.created_at);

    var weightForPush = 1;
    var weightForWatchers = 1.314 * Math.pow(10, 7);

    repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
    repo.hotness += weightForWatchers * repo.watchers / createdDelta;
    repo.hotness += (repo.watchers > 0 || repo.forks_count > 0) ? .5 : 0;
  }

  function addRepo(repo) {
    var repos = document.getElementById('flex-container'),
    language = (repo.language || '').toLowerCase(),
    link = repoUrl(repo),
    repoName = (repo.name) ? repo.name : repo.homepage,
    isForked = (repo.fork) ? ' : forked' : '',
    description = repoDescription(repo);

    description = (description === null) ? '' : description;

    var inner = '<a href="' + link + '"> <h2>'+ repoName +'</h2> <h3>'+ language + ' ' + isForked +'</h3> <h3> Stars: '+ repo.stargazers_count + ' Forks: ' + repo.forks_count +'</h3> <p>'+ description +'</p> </a>';

    var item = document.createElement('div');
    item.classList.add('flex-item', 'card');

    var cardLink = document.createElement('a');
    cardLink.setAttribute('href', link);

    var header = document.createElement('div');
    header.classList.add('card-header');
    if (language) header.classList.add(language);
    header.innerHTML = '<span class="card-title">'+ repoName +'</span>';

    var content = document.createElement('div');
    content.classList.add('card-content');
    content.innerHTML = '<p>' + description + '</p>';

    var action = document.createElement('div');
    action.classList.add('card-action');
    action.innerHTML = '<span>Stars: ' + repo.stargazers_count + ' &#8212; Forks: ' + repo.forks_count + '</span>';

    cardLink.appendChild(header);
    cardLink.appendChild(content);
    cardLink.appendChild(action);
    item.appendChild(cardLink);

    repos.appendChild(item);
  }

  function addGist(repo) {
    // Allows one to get the language of the first file in the gist
    // Also used for the number of files in the gist
    // Object.keys could be used inline if desired
    var gistFiles = Object.keys(repo.files),
    repos = document.getElementById('flex-container'),
    language = (repo.files[gistFiles[0]].language || '').toLowerCase(),
    link = repoUrl(repo),
    repoName = 'gist: ' + repo.id,
    isForked = (repo.fork) ? ' : forked' : '',
    files = ((gistFiles.length > 1) ? gistFiles.length + " files" : gistFiles.length + " file")
    description = repoDescription(repo);

    description = (description === null) ? '' : description;

    var inner = '<a href="' + link + '"> <h2>'+ repoName +'</h2> <h3>'+ language + ' ' + files + ' ' + isForked +'</h3> <p>'+ description +'</p> </a>';

    var item = document.createElement('div');
    item.classList.add('flex-item', 'repo');
    if (language) item.classList.add(language);
    item.innerHTML = inner;

    repos.appendChild(item);
  }

  function addRepos(repos, page) {
    repos = repos || [];
    page = page || 1;

    var uri = "https://api.github.com/users/" + user + "/repos?"
            + "&per_page=100"
            + "&page="+page;

    getJSON(uri, function (result) {
      if (result && result.length > 0) {
        repos = repos.concat(result);
        addRepos(repos, page + 1);
      }
      else {
        // $(function () {
          // $("#num-repos").text(repos.length);

          // Convert pushed_at to Date.
          repos.forEach(function (repo) {
            repoHotness(repo);
          });

          // Sort by highest # of watchers.
          repos.sort(function (a, b) {
            if (a.hotness < b.hotness) return 1;
            if (b.hotness < a.hotness) return -1;
            return 0;
          });

          // Sort by most-recently pushed to.
          // repos.sort(function (a, b) {
          //   if (a.pushed_at < b.pushed_at) return 1;
          //   if (b.pushed_at < a.pushed_at) return -1;
          //   return 0;
          // });

          repos.forEach(function (repo) {
            addRepo(repo);
          });

          // $.each(repos.slice(0, 3), function (i, repo) {
          //   addRecentlyUpdatedRepo(repo);
          // });

          // Get avatar of user, assumes the first repo is owned by the user
          // var userRepos = Object.keys(repos);
          // console.log(repos[userRepos[0]].owner.avatar_url);
          // $("#logo").css("background-image",  "url(' " + repos[userRepos[0]].owner.avatar_url + "')" );

        // });
      }
    });
  }
  addRepos();

  function addGists(repos, page) {
    repos = repos || [];
    page = page || 1;

    var uri = "https://api.github.com/users/" + user + "/gists?"
            + "&per_page=100"
            + "&page="+page;

    getJSON(uri, function (result) {
      if (result.data && result.data.length > 0) {
        repos = repos.concat(result.data);
        addGists(repos, page + 1);
      }
      else {
        // $(function () {
          // $("#num-gists").text(repos.length);

          // Convert pushed_at to Date.
          repos.forEach(function (repo) {
            repoHotness(repo);
          });

          // Sort by highest # of watchers.
          repos.sort(function (a, b) {
            if (a.hotness < b.hotness) return 1;
            if (b.hotness < a.hotness) return -1;
            return 0;
          });

          repos.forEach(function (repo) {
            addGist(repo);
          });
        // });
      }
    });
  }
  // addGists();

})();
