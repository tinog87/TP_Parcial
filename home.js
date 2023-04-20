// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 6000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Get the button:
let myIndex = document.getElementsByClassName("navigation");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 600) {
    myIndex.style.display = "block";
  } else {
    myIndex.style.display = "none";
  }
}

document.querySelectorAll('a[href="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
  });
});

// ocultar todos los canvas
document.querySelectorAll('canvas').forEach(canvas => canvas.style.display = 'none');

// mostrar canvas correspondiente al botón clickeado
function updateChart(chartID) {
  // ocultar todos los canvas
  document.querySelectorAll('canvas').forEach(canvas => canvas.style.display = 'none');
  // mostrar canvas correspondiente
  document.getElementById(chartID).style.display = 'block';
}

// evento click para los botones
document.getElementById("b-button").addEventListener("click", function() {
  updateChart("myChart");
});

document.getElementById("p-button").addEventListener("click", function() {
  updateChart("myChart2");
});

document.getElementById("c-button").addEventListener("click", function() {
  updateChart("myChart3");
});

document.getElementById("vu-button").addEventListener("click", function() {
  updateChart("myChart4");
});

document.getElementById("vs-button").addEventListener("click", function() {
  updateChart("myChart5");
});

// por default mostrar el canvas correspondiente a Palermo
document.getElementById("myChart2").style.display = 'block';