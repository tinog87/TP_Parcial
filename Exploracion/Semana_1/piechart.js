// Load the data from a CSV file
d3.dsv(',',"resultado.csv", d3.autoType).then((data) => {
    // Compute the pie slices
    const pie = d3.pie().value(d => d.count);
    const slices = pie(data);
  
    // Create the pie chart
    const chart1_4 = Plot.plot({
      marks: [
        Plot.arc(slices, {
          x: 200,
          y: 200,
          innerRadius: 0,
          outerRadius: 150,
          fill: d => d3.schemeCategory10[d.cantidad_denuncias],
        })
      ],
      width: 400,
      height: 400,
    });
  
    // Append the chart to the page
    d3.select("#chart1_4").append(() => chart1_4);
  });
  