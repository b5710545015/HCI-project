var provinces;
var percentage2015;
var percentage2013;
var averagePerRegion;
var averageCountry;
var index = 0;
var firstTime = true;
var chart;
var map = new Object(); // or var map = {};
map["North"] = 0;
map["Northeast"] = 1;
map["Central"] = 2;
map["east"] = 3;
map["south"] = 4;
//var fileName = "spanish-silver.csv";
var fileName = "forest_data.csv";
function parseData(createGraph) {
	Papa.parse("../data/"+fileName, {
		download: true,
		complete: function(results) {
			manageData(results.data);
			createGraph();
		}
	});
}

function manageData(data){
	if(firstTime){
		provinces = new Array(5);
		percentage2015 = new Array(5);
		percentage2013 = new Array(5);
		provinces[0] = ["x"];
		provinces[1] = ["x"];
		provinces[2] = ["x"];
		provinces[3] = ["x"];
		provinces[4] = ["x"];
		percentage2015[0] = ["percentage 2015"];
		percentage2015[1] = ["percentage 2015"];
		percentage2015[2] = ["percentage 2015"];
		percentage2015[3] = ["percentage 2015"];
		percentage2015[4] = ["percentage 2015"];

		percentage2013[0] = ["percentage 2013"];
		percentage2013[1] = ["percentage 2013"];
		percentage2013[2] = ["percentage 2013"];
		percentage2013[3] = ["percentage 2013"];
		percentage2013[4] = ["percentage 2013"];

		for (var i = 1; i < data.length-2; i++) {
			//onsole.log(map[ data[i][0] ] +":"+data[i][1] );
			provinces[ map[ data[i][0] ] ].push(data[i][1]);
			percentage2013[ map[ data[i][0] ] ].push(parseFloat(data[i][2]) );
			percentage2015[ map[ data[i][0] ] ].push(parseFloat(data[i][3]) );

		}
	}
	firstTime = false;
	console.log(percentage2015);
}

function createGraph() {
	 chart = c3.generate({
		bindto: '#chart',
	    data: {
				x: 'x',
	        columns: [

	            // ["x",23.38,69.49,41.29,72.03,9.18,61.21,31.15,62.07,51.77,0.29,36.40,86.89,70.81,55.27,29.87,55.70,51.77,52.36],
							provinces[index],
	            percentage2013[index],
							percentage2015[index],
							// ["percentage 2015",23.38,69.49,41.29,72.03,9.18,61.21,31.15,62.07,51.77,0.29,36.40,86.89,70.81,55.27,29.87,55.70,51.77,52.36],
							//percentage2013[index],
	      ],
        type: 'bar'
			},

			bar: {
        width: {
            ratio: 0.8 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    	},
			axis: {
        y: {
            max: 100,
            min: 0,
        },
				x: {
            type: 'category',
            tick: {
                rotate: 75,
                multiline: false
            },
            height: 130
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
					provinces[index],
					percentage2013[index],
					percentage2015[index],
					//percentage2013[index],
        ]
    });

		//console.log(provinces[index]);
}

function clickHandler() {
	index = (index+1)%5;
	update();
}

parseData(createGraph);
