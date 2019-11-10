var filtersData ={};
var selections = [];

var fullData;
$(document).ready(function(){
	$.getJSON("./resources/data.json?t="+Date.now(),
	    function(data){
			fullData = data.employess;
			filtersData.department =  new Set(data.employess.map(x => x.department).sort());
			filtersData.designation =  new Set(data.employess.map(x => x.designation).sort());
			filtersData.region =  new Set(data.employess.map(x => x.region).sort());
			filtersData.sallery_band =  new Set(data.employess.map(x => x.sallery_band).sort());
			filtersData.ratting =  new Set(data.employess.map(x => x.ratting).sort());
			//debugger
		});

	$('#selDetails').change(function(){
		updateFilterPan($(this).val());
		if(selections.length>0)
			$('#btnGen').prop( "disabled", false );
		else
			$('#btnGen').prop( "disabled", false );
	})

	$('#btnGen').click(function(e){
		e.preventDefault();
		var filteredData = "?fltlist=";
		var fltString="";
		$('.cfilter select').each(function(index){
			
			var colname = $(this).attr("id").replace("flt","");
			filteredData +=colname + ",";
			fltString += (colname + "=" + $(this).val().join(",") + "&");
			//debugger
			//filteredData = filteredData.filter( x => $(this).val().includes(x[colname]));
		})
		filteredData += ("&" + fltString);

		window.open("./report.html" + filteredData , "popupWindow", "width=800,resizable=false,height=650,scrollbars=yes");

	})
})

function updateFilterPan(filters){
	filters.forEach(element => {
		if(!selections.includes(element)){
			selections.push(element);
			addFilter(element);
		}
	});
	var t = selections.length;
	for(var i=0;i<t;i++){
		var element=selections[i];
		if(element!=undefined && !filters.includes(element)){
			removeSelection(element);
			removeFilter(element);
			i--;
		}
	}
}

function removeSelection(str){
	for(var i =0;i<selections.length;i++){
		if(selections[i] == str){
			selections.splice(i,1);
			break;
		}
	}
}

function addFilter(strFilterName){
	var strFilterName_ = strFilterName.replace(' ','_').toLowerCase()
	var optList = '<select class="form-control" multiple id="flt'+strFilterName_+'">';
	filtersData[strFilterName_].forEach(element=>{
		optList += '<option selected>'+element+'</option>';
	})
	optList += '</select>'
	$(".cfilter").append('<div class="col-md-4" id="fltr'+strFilterName_+'"><label for="flt'+strFilterName_+'">'+strFilterName+':</label>'+optList+'</div>');

}

function removeFilter(strFilterName){
	var strFilterName_ = 'fltr'+strFilterName.replace(' ','_').toLowerCase()
	$(document.getElementById(strFilterName_)).remove();
}