// get jquery up and running on document ready
$(document).ready(() => {
	{
		let colors = get_colors();

		for (let i = 0; i < colors.length; i++) {
			colors[i].val("255");
		}
	}

	// search for input events from the three input tags for taking color values
	$(".input_data").on({
		keyup: () => {
			handler();
		},
		keypress: () => {
			handler();
		}
		click: () => {
			handler();
		}
	});
});

const handler = () => {
	let colors = process_color_input();
	let hex_val = arr_to_hex_val(colors);
	$("body").css("background-color", hex_val);
	$("#result").text(hex_val);
}

// takes input values and returns a valid u8 value for the colors in an array
const process_color_input = () => {
	let colors = [0, 0, 0];
	let color_objs = get_colors();

	for (let i = 0; i < colors.length; i++) {
		colors[i] = validate_input(color_objs[i].val());
	}

	console.log(colors);

	return colors;
}

// validates a single input as a u8 will always return 0-255
const validate_input = (input_color) => {
	let parsed = parseInt(input_color, 10);

	if (isNaN(parsed)) {
		parsed = 0;
	} else if (parsed < 0) {
		parsed = 0;
	} else if (parsed > 255) {
		parsed = 255;
	}

	return parsed;
}

// gets jquery objects for the rgb inputs
const get_colors = () => {
	return [$("#red"), $("#green"), $("#blue")];
}

// returns hex value for rgb array
const arr_to_hex_val = (colors_arr) => {
	let res = "#";

	for (let i = 0; i < colors_arr.length; i++) {
		let color = colors_arr[i].toString(16);
		if (color < 16) {
			color = `0${color}`;
		}

		res = `${res}${color}`;
	}
	console.log(res);
	return res;
}