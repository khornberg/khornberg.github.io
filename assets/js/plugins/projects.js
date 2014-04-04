(function ($, undefined) {
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
  
  function addRepo(repo) {
    var languageClass = styleLanguage(repo.language);
    var $item = $("<li>").addClass("repo " + (languageClass || '').toLowerCase());
    var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
    $link.append($("<h2>").text(repo.name));
    $link.append($("<h3>").text(repo.language + ((repo.fork) ? ' : forked' : '')));
    $link.append($("<p>").text(repoDescription(repo)));
    $item.appendTo("#repos");
  }
  
  function addGist(repo) {
    // Allows one to get the language of the first file in the gist
    // Also used for the number of files in the gist
    // Object.keys could be used inline if desired
    var gistFiles = Object.keys(repo.files);
    var languageClass = styleLanguage(repo.files[gistFiles[0]].language);
    var $item = $("<li>").addClass("repo " + (languageClass || '').toLowerCase());
    var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
    $link.append($("<h2>").text("gist: " + repo.id));
    $link.append($("<h3>").text(
        repo.files[gistFiles[0]].language + " : " + 
        ((gistFiles.length > 1) ? gistFiles.length + " files" : gistFiles.length + " file") +
        ((repo.fork) ? ' : forked' : '')
    ));
    $link.append($("<p>").text(repoDescription(repo)));
    $item.appendTo("#gists");
  }

  function addRepos(repos, page) {
    repos = repos || [];
    page = page || 1;

    var uri = "https://api.github.com/users/" + user + "/repos?"
            + "&per_page=100"
            + "&page="+page;

    $.getJSON(uri, function (result) {
      if (result.data && result.data.length > 0) {
        repos = repos.concat(result.data);
        addRepos(repos, page + 1);
      }
      else {
        $(function () {
          // $("#num-repos").text(repos.length);

          // Convert pushed_at to Date.
          $.each(repos, function (i, repo) {
            repo.pushed_at = new Date(repo.pushed_at);

            var weekHalfLife  = 1.146 * Math.pow(10, -9);

            var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
            var createdDelta = (new Date) - Date.parse(repo.created_at);

            var weightForPush = 1;
            var weightForWatchers = 1.314 * Math.pow(10, 7);

            repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
            repo.hotness += weightForWatchers * repo.watchers / createdDelta;
          });

          // // Sort by highest # of watchers.
          // repos.sort(function (a, b) {
          //   if (a.hotness < b.hotness) return 1;
          //   if (b.hotness < a.hotness) return -1;
          //   return 0;
          // });

          // Sort by most-recently pushed to.
          repos.sort(function (a, b) {
            if (a.pushed_at < b.pushed_at) return 1;
            if (b.pushed_at < a.pushed_at) return -1;
            return 0;
          });

          $.each(repos, function (i, repo) {
            addRepo(repo);
          });

          // $.each(repos.slice(0, 3), function (i, repo) {
          //   addRecentlyUpdatedRepo(repo);
          // });
          
          // Get avatar of user, assumes the first repo is owned by the user
          // var userRepos = Object.keys(repos);
          // console.log(repos[userRepos[0]].owner.avatar_url);
          // $("#logo").css("background-image",  "url(' " + repos[userRepos[0]].owner.avatar_url + "')" );
          
        });
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

    $.getJSON(uri, function (result) {
      if (result.data && result.data.length > 0) {
        repos = repos.concat(result.data);
        addGists(repos, page + 1);
      }
      else {
        $(function () {
          // $("#num-gists").text(repos.length);

          // Convert pushed_at to Date.
          $.each(repos, function (i, repo) {
            repo.pushed_at = new Date(repo.pushed_at);

            var weekHalfLife  = 1.146 * Math.pow(10, -9);

            var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
            var createdDelta = (new Date) - Date.parse(repo.created_at);

            var weightForPush = 1;
            var weightForWatchers = 1.314 * Math.pow(10, 7);

            repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
            repo.hotness += weightForWatchers * repo.watchers / createdDelta;
          });

          // Sort by highest # of watchers.
          repos.sort(function (a, b) {
            if (a.hotness < b.hotness) return 1;
            if (b.hotness < a.hotness) return -1;
            return 0;
          });

          $.each(repos, function (i, repo) {
            addGist(repo);
          });
        });
      }
    });
  }
  addGists();

})(jQuery);