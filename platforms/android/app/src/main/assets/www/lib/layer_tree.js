/** Gestion de l’arborescence des couches dans le menu de l’interface **/

///////////////////// Il faut déclarer chaque couche dans le HTML selon leur numéro de layerid//////////////////



function bindInputs(layerid, layer) {
		var visibilityInput = $(layerid + ' input.visible');
		visibilityInput.on('change', function() {
			layer.setVisible(this.checked);
		});
		visibilityInput.prop('checked', layer.getVisible());

		$.each(['opacity'],
			function(i, v) {
				var input = $(layerid + ' input.' + v);
				input.on('input change', function() {
					layer.set(v, parseFloat(this.value));
				});
				input.val(String(layer.get(v)));
			  }
		);
	}

map.getLayers().forEach(function(layer, i) {
	bindInputs('#layer' + i, layer);
	if (layer instanceof ol.layer.Group) {
		layer.getLayers().forEach(function(sublayer, j) {
			bindInputs('#layer' + i + j, sublayer);
		});
	}
});


jQuery(document).ready(function () {
    $('input.visible').each(function(){
        if ($(this).is(':checked')) {
           var parentId2 = $(this).closest('li').prop('id');
			$( "#"+parentId2+" .layer" ).css({"display":"block"})  
        }
    });
});


$(document).ready(function() {

	$("input[type=checkbox]").change(function() {
		var parentId = $(this).closest('li').prop('id');
		if ($(this).is(':checked')) {
			$( "#"+parentId+" .layer" ).css({"display":"block"})
		  } 
		else {
			$( "#"+parentId+" .layer" ).css({"display":"none"})
		  }
	});
})