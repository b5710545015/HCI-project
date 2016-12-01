var Years;
var silverMined;
var situadosPaid;
var index = 0;
var firstTime = true;
var	minY,maxY;
var chart;
function parseData(createGraph) {
	Papa.parse("../data/spanish-silver.csv", {
		download: true,
		complete: function(results) {
			manageData(results.data);
			createGraph();
		}
	});
}

function manageData(data){
	if(firstTime){
		Years = new Array(2);
		silverMined = new Array(2);
		situadosPaid = new Array(2);
		Years[0] = ["x"];
		Years[1] = ["x"];
		silverMined[0] = ["Silver Minted"];
		silverMined[1] = ["Silver Minted"];
		situadosPaid[0] = ["situadosPaid"];
		situadosPaid[1] = ["situadosPaid"];
		minY = parseInt(data[1][2]);
		maxY = parseInt(data[1][2]);
		for (var i = 1; i < data.length; i++) {
			if(i<data.length/2){
				Years[0].push(data[i][0]);
				situadosPaid[0].push(data[i][1]);
				silverMined[0].push(data[i][2]);
			}	else {
				Years[1].push(data[i][0]);
				situadosPaid[1].push(data[i][1]);
				silverMined[1].push(data[i][2]);
			}
			minY = Math.min ( ((parseInt(data[i][1])<minY) ? parseInt(data[i][1]):minY) , ((parseInt(data[i][2])<minY) ? parseInt(data[i][2]):minY));
			maxY = Math.max( ((parseInt(data[i][1])>maxY) ? parseInt(data[i][1]):maxY) , ((parseInt(data[i][2])>maxY) ? parseInt(data[i][2]):maxY) );
		}
	}
	firstTime = false;
}

function createGraph() {
	console.log(maxY);
	console.log(minY);
	 chart = c3.generate({
		bindto: '#chart',
	    data: {
				x: 'x',
	        columns: [
	            Years[index],
	            silverMined[index],
							situadosPaid[index],
	      ]
			},
			axis: {
        y: {
            max: maxY,
            min: minY,
        }
    	},
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

function update() {
    chart.load({
        columns: [
					Years[index],
					silverMined[index],
					situadosPaid[index],
        ]
    });

		//console.log(Years[index]);
}

function clickHandler() {
	index = (index+1)%2;
	update();
}

parseData(createGraph);
