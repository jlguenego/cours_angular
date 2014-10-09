// Code goes here

$(document).ready(function() {
	function toggleColorblind() {
		if ($('#colorblindCheckbox:checked').length > 0) {
			$('div.container').eq(0).addClass('colorblind');
		} else {
			$('div.container').eq(0).removeClass('colorblind');
		}

		if ($('#colorblindCheckboxBg:checked').length > 0) {
			$('div.container').eq(1).addClass('colorblind-bg');
		} else {
			$('div.container').eq(1).removeClass('colorblind-bg');
		}
	}

	$('#colorblindCheckbox').change(toggleColorblind);
	$('#colorblindCheckboxBg').change(toggleColorblind);
	toggleColorblind();
});