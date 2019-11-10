$(document).ready(function(){
	var tbl;
	var filteredData;
	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)')
						  .exec(window.location.search);
		return decodeURIComponent((results !== null) ? results[1] || 0 : false);
	}
	$.getJSON("./resources/data.json?t="+Date.now(),
	    function(data){
			filteredData = data.employess;
			var filters = $.urlParam("fltlist").split(",");
			for(var i =0;i<filters.length-1;i++){
				console.log($.urlParam(filters[i]))
				var ref_ = $.urlParam(filters[i]).split(",")
				filteredData = filteredData.filter(x => ref_.includes(x[filters[i]]))
			}
			tbl = $("#rpt").DataTable({
				"data":filteredData,
				"columns":[
					{"data":"ratting"},
					{"title": "Name","data":"name"},
					{"title":"Department","data":"department"},
					{"title":"Region","data":"region"},
					{"title":"Sallery Band","data":"sallery_band"},
					{"title":"Ratting","data":"ratting"}
				],
				"columnDefs": [ {
					"searchable": false,
					"orderable": false,
					"targets": 0
				} ],
				"order": [[ 1, 'asc' ]]
			})
			tbl.on( 'order.dt search.dt', function () {
				tbl.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					cell.innerHTML = i+1;
				} );
			} ).draw();
	});

	

})