var ctx = document.getElementById('myChart5').getContext('2d');
var myChart5 = new Chart(ctx, {
   type: 'pie',
     data: {
         
        labels: ['APP DENUNCIA VIAL' , 'OTROS CANALES'],
         datasets: [{
             label: '%',
             data: [81.36, 18.64],
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