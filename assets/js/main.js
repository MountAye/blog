var mainHeight = function() {
  var total = window.innerHeight;
  var sections = document.querySelectorAll('.outlined');
  
  sections.forEach(function(section) {
    section.style.height = 'auto';
    var sectionHeight = section.getBoundingClientRect().height;
    
    if (sectionHeight < total) {
      var margin = section.offsetHeight - section.clientHeight;
      section.style.height = total - margin - 20 + 'px';
    }
  });
};

window.addEventListener('resize', mainHeight);

document.addEventListener('DOMContentLoaded', function() {
  var headings = document.querySelectorAll('.outlined h1, .outlined h2, .outlined h3');
  var navList = document.querySelector('nav ul');
  var currentLevel = 1;
  var currentList = navList;

  headings.forEach(function(heading) {
    var level = parseInt(heading.tagName.charAt(1));
    var listItem = document.createElement('li');
    listItem.classList.add("tag-h" + level)
    var link = document.createElement('a');
    link.textContent = heading.textContent;
    link.href = '#' + heading.id;
    listItem.appendChild(link);            

    if (level > currentLevel) {
      var sublist = document.createElement('ul');
      currentList.lastElementChild.appendChild(sublist);
      currentList = sublist;
    } else if (level < currentLevel) {
      for (var i = level; i < currentLevel; i++) {
        currentList = currentList.parentElement.parentElement;
      }
    }
    
    currentList.appendChild(listItem);
    currentLevel = level;
  });


  navList.querySelector('li:first-child a').parentElement.classList.add('active');

  var navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var targetId = this.getAttribute('href');
      var position = document.querySelector(targetId).offsetTop + 380;
      window.scrollTo({ top: position, behavior: 'smooth' });
      navList.querySelectorAll('li a').forEach(function(a) {
        a.parentElement.classList.remove('active');
      });
      this.parentElement.classList.add('active');
    });
  });

  mainHeight();

  var images = document.querySelectorAll('img');
  images.forEach(function(image) {
    image.addEventListener('load', mainHeight);
  });
});
