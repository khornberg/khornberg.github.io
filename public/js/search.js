/* posts are generated in footer.html as an object with keys of name, url, and post_date */

var searchBox = document.getElementById('search');
searchBox.addEventListener('input', search);

function search() {
  var options = {keys: ['name']},
    searchBox = document.getElementById('search'),
    list = document.getElementById('list'),
    f = new Fuse(posts, options),
    results = f.search(searchBox.value),
    resultList = '';

  results.forEach(function(el) {
    resultList = resultList + '<a class="sidebar-nav-item" href="'+ el.url +'">'+ el.name +'</a>';
  });

  list.innerHTML = resultList;
}
