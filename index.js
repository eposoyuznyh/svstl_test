$(function() {
    $('#active_checkbox').click(function(){
        if ($(this).is(':checked')){
            $('.active').fadeIn();
        } else {
            $('.active').fadeOut();
        }
    });    

    $.getJSON( "default (1).json", function( data ) {

        var sdata = data.sort(function(a, b){ return a.parentId - b.parentId; })
        console.log(sdata);

        function calcLevel(id) {
            var current_level = 0;
            var iteration = 0;
            var current_item = sdata.filter(function(item){ return item.id == id; })[0]; 
            while (current_item.parentId !== 0 && iteration < 10) {
                current_level++;
                iteration++;
                current_item = sdata.filter(function(item){ return item.id == current_item.parentId; })[0];
            };
            return current_level;
        }


        
        var addhtml = '';
        $.each( sdata, function( key, val ) {
        var tr_class = 'closerow ';
        tr_class = tr_class + (val.isActive ? `active ` : '');
        tr_class = tr_class + (sdata.filter(function(item){ return item.parentId == val.id; }).length > 0 ? 'parent' : ''); 
        addhtml = `<tr id="row-${val.id}" onclick="openRow(${val.id})" class="`+ tr_class +`" parent-id="${val.parentId}" `+ (calcLevel(val.id) !== 0 ? 'style="display:none;"' : '') + `>
            <td `+ (calcLevel(val.id) !== 0 ? 'style="padding-left: ' + (calcLevel(val.id)*10) + 'px;"' : '') +`>${val.id}</td>
            <td>${val.balance}</td>
            <td>${val.name}</td>
            <td>${val.email}</td>
        </tr>`;   

        if (val.parentId == 0) {
            $("#content-table").append(addhtml);
        } else {
            $("#row-" + val.parentId).after(addhtml);
        }
          
        });
      });


 });

 function openRow(id) {
    if ($('#row-'+id).hasClass( "closerow" )) {
        $('[parent-id = '+ id +']').fadeIn();
        $('#row-'+id).removeClass("closerow");
    } else {
        $('[parent-id = '+ id +']').fadeOut();
        $('#row-'+id).addClass("closerow");
    }
    
}
