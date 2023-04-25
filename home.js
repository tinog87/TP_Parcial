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

// Seleccionar todos los botones
const buttons = document.querySelectorAll('.Pie-container a');

// Iterar sobre cada botón
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Evitar el comportamiento predeterminado del enlace
    event.preventDefault();

    // Eliminar la clase active de todos los botones
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Agregar la clase active al botón actual
    button.classList.add('active');

    // Cambiar el color del piechart correspondiente
    const canvasId = button.getAttribute('id').replace('-button', '');
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      canvas.style.backgroundColor = '#d9d9d9';
      canvas.style.color = 'gray';
    }
  });
});



addTooltips = (chart, styles) => {
  const stroke_styles = { stroke: "blue", "stroke-width": 3 };
  const fill_styles = { fill: "blue", opacity: 0.5 };

  // Workaround if it's in a figure
  const type = d3.select(chart).node().tagName;
  let wrapper =
    type === "FIGURE" ? d3.select(chart).select("svg") : d3.select(chart);

  // Workaround if there's a legend....
  const svgs = d3.select(chart).selectAll("svg");
  if (svgs.size() > 1) wrapper = d3.select([...svgs].pop());
  wrapper.style("overflow", "visible"); // to avoid clipping at the edges

  // Set pointer events to visibleStroke if the fill is none (e.g., if its a line)
  wrapper.selectAll("path").each(function (data, index, nodes) {
    // For line charts, set the pointer events to be visible stroke
    if (
      d3.select(this).attr("fill") === null ||
      d3.select(this).attr("fill") === "none"
    ) {
      d3.select(this).style("pointer-events", "visibleStroke");
      if (styles === undefined) styles = stroke_styles;
    }
  });
  
  if (styles === undefined) styles = fill_styles;

  const tip = wrapper
    .selectAll(".hover")
    .data([1])
    .join("g")
    .attr("class", "hover")
    .style("pointer-events", "none")
    .style("text-anchor", "middle");

  // Add a unique id to the chart for styling
  const id = id_generator();

  // Add the event listeners
  d3.select(chart).classed(id, true); // using a class selector so that it doesn't overwrite the ID
  wrapper.selectAll("title").each(function () {
    // Get the text out of the title, set it as an attribute on the parent, and remove it
    const title = d3.select(this); // title element that we want to remove
    const parent = d3.select(this.parentNode); // visual mark on the screen
    const t = title.text();
    if (t) {
      parent.attr("__title", t).classed("has-title", true);
      title.remove();
    }
    // Mouse events
    parent
      .on("pointerenter pointermove", function (event) {
        const text = d3.select(this).attr("__title");
        const pointer = d3.pointer(event, wrapper.node());
        if (text) tip.call(hover, pointer, text.split("\n"));
        else tip.selectAll("*").remove();

        // Raise it
        d3.select(this).raise();
        // Keep within the parent horizontally
        const tipSize = tip.node().getBBox();
        if (pointer[0] + tipSize.x < 0)
          tip.attr(
            "transform",
            `translate(${tipSize.width / 2}, ${pointer[1] + 7})`
          );
        else if (pointer[0] + tipSize.width / 2 > wrapper.attr("width"))
          tip.attr(
            "transform",
            `translate(${wrapper.attr("width") - tipSize.width / 2}, ${
              pointer[1] + 7
            })`
          );
      })
      .on("pointerout", function (event) {
        tip.selectAll("*").remove();
        // Lower it!
        d3.select(this).lower();
      });
  });

  // Remove the tip if you tap on the wrapper (for mobile)
  wrapper.on("touchstart", () => tip.selectAll("*").remove());

  // Define the styles
  chart.appendChild(html`<style>
  .${id} .has-title { cursor: pointer;  pointer-events: all; }
  .${id} .has-title:hover { ${Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(" ")} }`);

  return chart;
}

// Function to position the tooltip
hover = (tip, pos, text) => {
  const side_padding = 10;
  const vertical_padding = 5;
  const vertical_offset = 15;

  // Empty it out
  tip.selectAll("*").remove();

  // Append the text
  tip
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("transform", `translate(${pos[0]}, ${pos[1] + 7})`)
    .selectAll("text")
    .data(text)
    .join("text")
    .style("dominant-baseline", "ideographic")
    .text((d) => d)
    .attr("y", (d, i) => (i - (text.length - 1)) * 15 - vertical_offset)
    .style("font-weight", (d, i) => (i === 0 ? "bold" : "normal"));

  const bbox = tip.node().getBBox();

  // Add a rectangle (as background)
  tip
    .append("rect")
    .attr("y", bbox.y - vertical_padding)
    .attr("x", bbox.x - side_padding)
    .attr("width", bbox.width + side_padding * 2)
    .attr("height", bbox.height + vertical_padding * 2)
    .style("fill", "white")
    .style("stroke", "#d3d3d3")
    .lower();
}

// To generate a unique ID for each chart so that they styles only apply to that chart
id_generator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return "a" + S4() + S4();
}

Plot = tooltipPlugin(await require("@observablehq/plot"))

tooltipPlugin = (Plot) => {
  const { plot } = Plot;
  Plot.plot = ({ tooltip, ...options }) => addTooltips(plot(options), tooltip);
  return Plot;
}

