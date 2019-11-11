var filtersData ={};
var selections = [];

var fullData;
$(document).ready(function(){
	$.getJSON("./resources/data.json?t="+Date.now(),
		
		function(data){
			fullData = data.employess;
			Object.keys(fullData[0]).forEach(element => {
				if(element.indexOf("_")!=0){
					var optionText = element.replace("_"," ")
					$('#selDetails').append(new Option(optionText, element))
					filtersData[element] = new Set(data.employess.map(x => x[element]).sort());
				}
			})
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
	$(".cfilter").append('<div class="col-md-4" id="fltr'+strFilterName_+'"><label for="flt'+strFilterName_+'">'+strFilterName.replace("_"," ")+':</label>'+optList+'</div>');

}

function removeFilter(strFilterName){
	var strFilterName_ = 'fltr'+strFilterName.replace(' ','_').toLowerCase()
	$(document.getElementById(strFilterName_)).remove();
}