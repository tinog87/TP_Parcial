var ctx = document.getElementById('myChart4').getContext('2d');
var myChart4 = new Chart(ctx, {
   type: 'pie',
     data: {
         
        labels: ['APP DENUNCIA VIAL' , 'OTROS CANALES'],
         datasets: [{
             label: '%',
             data: [79.38, 20.62],
             backgroundColor: [
                 'rgba(89, 41, 10, 1)',
                 'rgba(127,127,127,1)',
                 
             ],
             borderColor: [
                'rgba(89, 41, 10, 0)',
                'rgba(127,127,127,0)',
                 
             ],
             borderWidth: 4
         }]
     },
     
});