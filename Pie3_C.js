var ctx = document.getElementById('myChart4').getContext('2d');
var myChart4 = new Chart(ctx, {
   type: 'pie',
     data: {
         
        labels: ['APP DENUNCIA VIAL' , 'OTROS CANALES'],
         datasets: [{
             label: '%',
             data: [79.38, 20.62],
             backgroundColor: [
                'rgba(159, 213, 103, 0.8)',
                 'rgba(127,127,127,0.6)',
                 
             ],
             borderColor: [
                'rgba(158, 204, 138, 1)',
                'rgba(127,127,127,1)',
                 
             ],
             borderWidth: 4
         }]
     },
     
});