// Load the data from the CSV file using d3.dsv
d3.dsv(',','Barrios_3.csv', d3.autoType).then((data) => {
    // Create the bar chart using Plot.js
    let datafilt = data.filter(d => d.domicilio_barrio == "VILLA SOLDATI" || d.domicilio_barrio == "PALERMO" || d.domicilio_barrio == "VILLA URQUIZA" )
    console.log(datafilt)
    let datafilter = data.filter(d => d.domicilio_barrio == "VILLA SOLDATI")
    console.log(datafilter)
    let datafilter_2 = data.filter(d => d.domicilio_barrio == "PALERMO" )
    console.log(datafilter_2)
    let datafilter_3 = data.filter(d => d.domicilio_barrio == "VILLA URQUIZA" )
    console.log(datafilter_3)

    let chart4 = Plot.plot({
      marks: [
      Plot.barY(
          datafilt,
          { y: "cantidad_denuncias_app",
            x: "domicilio_barrio",
            sort: { x: "y", reverse: true },
            fill: "grey",
          }) ,
          Plot.barY(
            datafilter,
            { y: "cantidad_denuncias_app",
              x: "domicilio_barrio",
              sort: { x: "y", reverse: true },
              fill: "#59290A",
            }) ,
            Plot.barY(
                datafilter_2,
                { y: "cantidad_denuncias_app",
                  x: "domicilio_barrio",
                  sort: { x: "y", reverse: true },
                  fill: "#DC862F",
                }) ,
                Plot.barY(
                    datafilter_3,
                    { y: "cantidad_denuncias_app",
                      x: "domicilio_barrio",
                      sort: { x: "y", reverse: true },
                      fill: "#F7E67E",
                    }) ,
      ],
      color: {
        legend: true,
        scheme: 'blue',
      },  
      grid: true,
      line: false,
      nice: true,
      width: 450,
      height: 650,
      style: {
        color: "black",
        fontFamily: "helvetica",
        fontSize: "10px",
        background: "transparent"
      },
      marginLeft: 150,
      marginRight: 55,
      marginTop: 26,
      marginBottom: 50,
      insetTop: 10,
      insetBottom: 10,
      insetLeft: 10,
      insetRight: 10,
      x: {
        label:"Barrios",
        ticks:10,
      },
      y: {
        label:"Cantidad de denuncias",
      }
  });
    d3.select('#chart4').append(() => chart4);
  });
  