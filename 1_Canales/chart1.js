d3.dsv(',',"resultado.csv", d3.autoType).then((data) => {
  let datafilter = data.filter(d => d.cantidad_denuncias > 400)
  console.log(datafilter)
  let chart1 = Plot.plot({
    marks: [
      Plot.barY(datafilter,
        Plot.groupX({ y: "count" },
         { x: "canal", 
         y: "prestacion",
         //fill:'domicilio_barrio',// para mi saquemolo, porque no nos da niguna conclusion
         sort: { x: "y", reverse: false },
        }) ),
    ],
    color: {
      legend: true,
      //scheme: "tableau10",
    },
    grid:true,
    line:true,
    nice:false,
    width: 800,
    height: 900,
    style: {
      color: "black",
      fontFamily: "helvetica",
      fontSize: "10px",
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
      label:"Count",
      ticks:10
    }
  });
  
  d3.select("#chart1").append(() => chart1);
});
