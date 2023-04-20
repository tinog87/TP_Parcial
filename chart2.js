const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(',', 'resultante.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio)

  /* Mapa Coroplético */
  let chart2 = Plot.plot({
    projection: {
      type: 'mercator',
      domain: barrios,
    },
    color: {
      type: 'quantize',
      n: 8,
      scheme: 'ylorbr',
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO;
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio)?.length || 0;
          return cantReclamos;
        },
        stroke: '#000',
        title: d => {
          let nombreBarrio = d.properties.BARRIO;
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio)?.length || 0;
          let cantidadHabitantes = reclamosPorBarrio.get(nombreBarrio)?.[0]?.habitantes || 'N/A';
          let ratio = reclamosPorBarrio.get(nombreBarrio)?.[0]?.ratio || 'N/A';
          let duracionTotal = reclamosPorBarrio.get(nombreBarrio)?.[0]?.duracion_total || 'N/A';
          return `${d.properties.BARRIO}\n${cantReclamos} denuncias\nCantidad de Habitantes: ${cantidadHabitantes}\nRatio: ${ratio}\nDuracion Total Denuncias: ${duracionTotal.toFixed(0)} dias`;
        },
      })
    ],
    style:{
      background: "transparent"
    },
  });

  d3.select('#chart2').append(() => chart2);
});
