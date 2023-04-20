// Load the data from the CSV file using d3.dsv
d3.dsv(',','Barrios_2.csv', d3.autoType).then((data) => {
  // Create the bar chart using Plot.js

  let datafilter = data.filter(d => d.ratio >= 0.10)
  console.log(datafilter)

  let datafilter_2 = data.filter(d => d.domicilio_barrio == "PALERMO")
  console.log(datafilter_2)

  let datafilter_3 = data.filter(d => d.domicilio_barrio == "VILLA URQUIZA")
  console.log(datafilter_3)

  let chart3 = Plot.plot({
    marks: [
    Plot.barX(
        data,
        { x: "ratio",
          y: "domicilio_barrio",
          sort: { y: "x", reverse: true },
          fill: "grey",
        }) ,
        Plot.barX(
          datafilter,
          { x: "ratio",
            y: "domicilio_barrio",
            sort: { y: "x", reverse: true },
            fill: "#59290A",
          }) ,
          Plot.barX(
            datafilter_2,
            { x: "ratio",
              y: "domicilio_barrio",
              sort: { y: "x", reverse: true },
              fill: "#DC862F",
            }) ,
            Plot.barX(
              datafilter_3,
              { x: "ratio",
                y: "domicilio_barrio",
                sort: { y: "x", reverse: true },
                fill: "#F7E67E",
              }) ,
    ],
    color: {
      legend: true,
    },  
    grid: true,
    line: false,
    nice: true,
    width: 600,
    height: 600,
    style: {
      color: "black",
      fontFamily: "helvetica",
      fontSize: "10px",
      background: "transparent"
    },
    marginLeft: 150,
    marginRight: 55,
    marginTop: 7,
    marginBottom: 60,
    insetTop: 0,
    insetBottom: 10,
    insetLeft: 10,
    insetRight: 10,
    x: {
      label:"Cantidad de denuncias / densidad de población",
      ticks:10,
      
    },
    y: {
      label:"Barrios",
    }
});
  d3.select('#chart3').append(() => chart3);
});
