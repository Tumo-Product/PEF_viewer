axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    dataFetch: async () =>
	{
		return dummyJson;
        let get_url = document.location.href;
		let url     = new URL(get_url);
		let _uid    = url.searchParams.get("_uid");

        return      axios.get(config.query_url + _uid);
	}
}

const dummyJson = {
	intro	: "Choose 5 to see how food waste affects the environment more text maybe …",
	title	: "PEF 0.67",
	elements: [
		{
			name: "Lasagnes ou canelloni aux légumes et au fromage de chèvre, cuits",
			info: "lasagna"
		},
		{
			name: "Vegetable soup (Soupe aux légumes variés, préemballée à réchauffer)",
			info: "veggie soup"
		},
		{
			name: "Crêpe ou Galette fourrée béchamel fromage",
			info: "fromage"
		},
		{
			name: "Pizza",
			info: "Did you know single-use plastic bags, plates, cups, straws, and more were banned in France last year (1)? This is because of the waste created by these single-use items.  Roughly 17 billion plastic bags were used every day before the ban, and about half of those were just thrown away. To make things worse, these bags take up to 400 years to biodegrade (2). So what can you do? Did you know single-use plastic bags, plates, cups, straws, and more were banned in France last year (1)? "
		},
		{
			name: "Quiche lorraine",
			info: "test"
		},
		{
			name: "Tomatoes and cheese tart",
			info: "tomata"
		},
		{
			name: "Poisson pane, frit",
			info: "Poison?"
		}
	],
}