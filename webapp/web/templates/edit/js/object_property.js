<!-- $This file is distributed under the terms of the license in /doc/license.txt$ -->
<script src="https://cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js"></script>
<link href="https://cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.css" rel="stylesheet"/>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.0.9/themes/default/style.min.css" />
<script src="/vivo/js/jstree.js"></script>
<script src="/vivo/js/jquery.color.js"></script> <!-- use base url -->
<script src="/vivo/js/helpers.js"></script>
<script language="JavaScript" type="text/javascript">
$(document).ready(function() {

	$(".stretch-panel").css({'height': '50px', 'margin-top': 25});
	$(".stretch-panel-header").click(function() {
		if($(this).parent().height() > 50) {
			$(this).parent().animate({'height': 50})
		}
		else {
			$(this).parent().animate({'height': 250});
		}
	})

	$("#uri-check").click(function() {
		var uriInput = $("#uri-field").find("input");
		if(uriInput.attr("readonly")) {
			uriInput.removeAttr("readonly");
		}
		else {
			uriInput.attr("readonly", "true");
		}
	});

	var actionEditSuperproperty = function() {
		var itemDetail = $(this).parent().parent().find(".item-detail");
		replaceWithInput(itemDetail, actionEditSuperpropertyCallback);
	}

	var actionDeleteSuperproperty = function() {
		var superpropertyURI = row.find(".item-detail").attr("data-superproperty-uri");
		var propertyURI = $("#property-uri").attr("data-property-uri");
		$.post("/vivo/edit_api/delete_superproperty", {"propertyURI": propertyURI, "superpropertyURI": superpropertyURI}, function(res) {
			console.log(res);
		});
	}

	var actionEditSubproperty = function() {
		var itemDetail = $(this).parent().parent().find(".item-detail");
		replaceWithInput(itemDetail, actionEditSubpropertyCallback);
	}

	var actionDeleteSubproperty = function() {
		var subpropertyURI = row.find(".item-detail").attr("data-subproperty-uri");
		var propertyURI = $("#property-uri").attr("data-property-uri");
		$.post("/vivo/edit_api/delete_subproperty", {"propertyURI": propertyURI, "subpropertyURI": subpropertyURI}, function(res) {
			console.log(res);
		});
	}

	var actionEditEqProperty = function() {
		var itemDetail = $(this).parent().parent().find(".item-detail");
		replaceWithInput(itemDetail, actionEditEqPropertyCallback);
	}

	var actionDeleteEqProperty = function() {
		var eqPropertyURI = row.find(".item-detail").attr("data-eqproperty-uri");
		var propertyURI = $("#property-uri").attr("data-property-uri");
		$.post("/vivo/edit_api/delete_eqproperty", {"propertyURI": propertyURI, "eqPropertyURI": eqPropertyURI}, function(res) {
			console.log(res);
		});
	}

	var actionEditInverse = function() {
		var itemDetail = $(this).parent().parent().find(".item-detail");
		replaceWithInput(itemDetail, actionEditInverseCallback);
	}

	var actionDeleteInverse = function() {
		var inversePropertyURI = row.find(".item-detail").attr("data-inverse-uri");
		var propertyURI = $("#property-uri").attr("data-property-uri");
		$.post("/vivo/edit_api/delete_eqproperty", {"propertyURI": propertyURI, "inverseURI": inverseURI}, function(res) {
			console.log(res);
		});
	}

	var actionEditDomain = function() {
		var itemDetail = $(this).parent().parent().find(".item-detail");
		replaceWithInput(itemDetail, actionEditDomainCallback);
	}

	var actionDeleteDomain = function() {
		var domainURI = row.find(".item-detail").attr("data-domain-uri");
		var propertyURI = $("#property-uri").attr("data-property-uri");
		$.post("/vivo/edit_api/delete_domain", {"propertyURI": propertyURI, "domainURI": domainURI}, function(res) {
			console.log(res);
		});
	}

	var actionEditRange = function() {
		var itemDetail = $(this).parent().parent().find(".item-detail");
		replaceWithInput(itemDetail, actionEditRangeCallback);
	}

	var actionDeleteRange = function() {
		var domainURI = row.find(".item-detail").attr("data-range-uri");
		var propertyURI = $("#property-uri").attr("data-property-uri");
		$.post("/vivo/edit_api/delete_range", {"propertyURI": propertyURI, "rangeURI": rangeURI}, function(res) {
			console.log(res);
		});
	}

	var actionEditSuperpropertyCallback = function() { };
	var actionEditSubpropertyCallback = function() { };
	var actionEditEqProperty = function() { };
	var actionEditInverseCallback = function() { };
	var actionEditDomainCallback = function() { };
	var actionEditRangeCallback = function() { };

	var addSuperproperty = function() {
		addItem($(this), function(td) {
			var propertyURI = $("#property-uri").attr("data-property-uri");
			var inverseURI = getURI(td.text());
			$.post('/vivo/edit_api/add_inverse', {'propertyURI': propertyURI, 'inverseURI': inverseURI}, function(res) {
				if(res != inverseURI) {
					console.log("error: " + res);
				}
				else {
					td.parent().find(".action-edit-superproperty").click(actionEditSuperproperty);
					td.parent().find(".action-delete-superproperty").click(actionDeleteSuperproperty);
				}
			})
		}, "superproperty");
	}

	var addSubproperty = function() {
		addItem($(this), function(td) {
			var propertyURI = $("#property-uri").attr("data-property-uri");
			var inverseURI = getURI(td.text());
			$.post('/vivo/edit_api/add_inverse', {'propertyURI': propertyURI, 'inverseURI': inverseURI}, function(res) {
				if(res != inverseURI) {
					console.log("error: " + res);
				}
				else {
					td.parent().find(".action-edit-subproperty").click(actionEditSubproperty);
					td.parent().find(".action-delete-subproperty").click(actionDeleteSubproperty);
				}
			})
		}, "subproperty");
	}

	var addEqProperty = function() {
		addItem($(this), function(td) {
			var propertyURI = $("#property-uri").attr("data-property-uri");
			var inverseURI = getURI(td.text());
			$.post('/vivo/edit_api/add_inverse', {'propertyURI': propertyURI, 'inverseURI': inverseURI}, function(res) {
				if(res != inverseURI) {
					console.log("error: " + res);
				}
				else {
					td.parent().find(".action-edit-eqproperty").click(actionEditEqProperty);
					td.parent().find(".action-delete-eqproperty").click(actionDeleteEqProperty);
				}
			})
		}, "eqproperty");
	}

	var addInverse = function() {
		addItem($(this), function(td) {
			var propertyURI = $("#property-uri").attr("data-property-uri");
			var inverseURI = getURI(td.text());
			$.post('/vivo/edit_api/add_inverse', {'propertyURI': propertyURI, 'inverseURI': inverseURI}, function(res) {
				if(res != inverseURI) {
					console.log("error: " + res);
				}
				else {
					td.parent().find(".action-edit-inverse").click(actionEditInverse);
					td.parent().find(".action-delete-inverse").click(actionDeleteInverse);
				}
			})
		}, "inverse");
	}

	var addDomain = function() {
		addItem($(this), function(td) {
			var propertyURI = $("#property-uri").attr("data-property-uri");
			var domainURI = getURI(td.text());
			$.post('/vivo/edit_api/add_domain', {'propertyURI': propertyURI, 'domainURI': domainURI}, function(res) {
				if(res != domainURI) {
					console.log("error: " + res);
				}
				else {
					td.parent().find(".action-edit-domain").click(actionEditDomain);
					td.parent().find(".action-delete-domain").click(actionDeleteDomain);
				}
			})
		}, "domain");
	}

	var addRange = function() {
		addItem($(this), function(td) {
			var propertyURI = $("#property-uri").attr("data-property-uri");
			var rangeURI = getURI(td.text());
			$.post('/vivo/edit_api/add_domain', {'propertyURI': propertyURI, 'rangeURI': rangeURI}, function(res) {
				if(res != rangeURI) {
					console.log("error: " + res);
				}
				else {
					td.parent().find(".action-edit-range").click(actionEditRange);
					td.parent().find(".action-delete-range").click(actionDeleteRange);
				}
			})
		}, "range");
	}

	$(".action-edit-superproperty").click(actionEditSuperproperty);
	$(".action-delete-superproperty").click(actionDeleteSuperproperty);
	$(".action-edit-subproperty").click(actionEditSubproperty);
	$(".action-delete-subproperty").click(actionDeleteSubproperty);
	$(".action-edit-eqproperty").click(actionEditEqProperty);
	$(".action-delete-eqproperty").click(actionDeleteEqProperty);
	$(".action-edit-inverse").click(actionEditInverse);
	$(".action-delete-inverse").click(actionDeleteInverse);
	$(".action-edit-domain").click(actionEditDomain);
	$(".action-delete-domain").click(actionDeleteDomain);
	$(".action-edit-range").click(actionEditRange);
	$(".action-delete-range").click(actionDeleteRange);

	$(".action-add-superproperty").click(addSuperproperty);
	$(".action-add-subproperty").click(addSubproperty);
	$(".action-add-eqproperty").click(addEqProperty);
	$(".action-add-inverse").click(addInverse);
	$(".action-add-domain").click(addDomain);
	$(".action-add-range").click(addRange);

});
</script>