---
---
// When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.scrollY;
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav-mobile").style.bottom = "0";
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("nav-mobile").style.bottom = "-50px";
    document.getElementById("header").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

function changeQuote(){
  var baseurl = "{{ site.baseurl_root }}";
  var urlQuotes = baseurl + "/assets/data/quotes.json";
  fetch(urlQuotes)
    .then(response => {
      if (!response.ok) {
        throw new Error('RandomQuote: network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const quotes = data;
      const i = Math.floor(Math.random() * quotes.length);
      const quote = quotes[i];

      document.getElementById("quote-line").innerHTML = quote.text;
      document.getElementById("quote-author").innerHTML = quote.author;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('RandomQuote: An error occurred while fetching the data.');
    });
};

// After the article loads, build a table of content on the right panel
document.addEventListener('DOMContentLoaded', function() {
  changeQuote();

  var headings = document.querySelectorAll('main h1, main h2, main h3');
  var navSide = document.querySelector('#toc-side');
  var navDrop = document.querySelector('#toc-dropdown');
  var currentSide = navSide;
  var currentDrop = navDrop;

  headings.forEach(function(heading) {
    var level = parseInt(heading.tagName.charAt(1));

    var linkSide = document.createElement('a');
    linkSide.classList.add("toc-link")
    linkSide.href = '#' + heading.id;

    var itemSide = document.createElement('span');
    itemSide.textContent = heading.textContent;
    itemSide.classList.add("toc-h" + level);
    linkSide.appendChild(itemSide);

    var linkDrop = document.createElement('a');
    linkDrop.classList.add("toc-link");
    linkDrop.classList.add("touch-screen-button");
    linkDrop.href = '#' + heading.id;
    linkDrop.addEventListener("click",tocItem);

    var itemDrop = document.createElement('p');
    itemDrop.textContent = heading.textContent;
    itemDrop.classList.add("toc-h" + level);
    linkDrop.appendChild(itemDrop);
    
    linkSide.style.textIndent = (level - 1) * 20 + 'px';
    linkDrop.style.textIndent = (level - 1) * 20 + 'px';
    
    currentSide.appendChild(linkSide);
    currentDrop.appendChild(linkDrop);
  });
})

// effects of the ToC button
function tocButton(x) {
  x.classList.toggle("change");
  document.getElementById("toc-dropdown-container").classList.toggle("show");
}
function tocItem() {
  document.getElementById("toc-button").classList.toggle("change");
  document.getElementById("toc-dropdown-container").classList.toggle("show");
}