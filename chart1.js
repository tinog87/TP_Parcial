d3.dsv(',',"resultado.csv", d3.autoType).then((data) => {
  let datafilter = data.filter(d => d.cantidad_denuncias > 400)
  console.log(datafilter)
  let datafilter_2 = data.filter(d => d.cantidad_denuncias > 400 && d.canal == "App Denuncia Vial")
  console.log(datafilter_2)
  let chart1 = Plot.plot({
    marks: [
      Plot.barY(datafilter,
        Plot.groupX({ y: "count" },
         { x: "canal", 
         y: "prestacion",
         ry:20,
         rx:20,
         fill:"gray",
         sort: { x: "y", reverse: false },
        }) ),
        Plot.barY(datafilter_2,
          Plot.groupX({ y: "count" },
           { x: "canal", 
           y: "prestacion",
           ry:20,
           rx:20,
           fill:"#9ECC8A",
           sort: { x: "y", reverse: true },
          }) ),
    ],
    color: {
      legend: true,
    },
    grid:true,
    line:true,
    nice:false,
    width: 800,
    height: 800,
    style: {
      color: "black",
      fontFamily: "helvetica",
      fontSize: "15px",
      background: "transparent"
    },
    marginLeft: 55,
    marginRight: 55,
    marginTop: 50,
    marginBottom: 100,
    insetTop: 10,
    insetBottom: 10,
    insetLeft:10,
    insetRight: 10,
    x: {
      label:"Canal",
    },
    y: {
      ticks:10,
    }
  });
  
  d3.select("#chart1").append(() => chart1);
});
