const view = {
    correct: 0,
    row: `<div class="row"></div>`,

    getBar: (classes, text, i) => {
        classes += " outsideShadow";

        let bar = `<div class="bar ${classes}"><div class="inside"></div><p>${text}</p></div>`;
        return bar;
    },
    addPair: async (current, top, bottom) => {
        elements.append(view.getBar("top",      top.name,       currentWord - 1));
        elements.append(view.getBar("current",  current.name,   currentWord));
        elements.append(view.getBar("bottom",   bottom.name,    currentWord + 1));

        $(".current").attr("onclick", "toggleButton()");
        await timeout(50);
        view.fitText(".bar", {x: 40, y: 30});
    },
    updatePair: async (current, top, bottom, dir) => {
        scrolling = true;
        
        elements.find(dir < 0 ? ".bottom" : ".top").addClass(dir < 0 ? "offscreenBottom" : "offscreenTop");

        elements.find(".current").addClass(dir < 0 ? "bottom" : "top");
        elements.find(".current").removeClass("current");

        elements.find(dir < 0 ? ".top" : ".bottom").addClass("current");
        elements.find(dir < 0 ? ".top" : ".bottom").removeClass(dir < 0 ? "top" : "bottom");
        if (data.elements.length >= 3) {
            elements.find(".current p").text(current.name);
        }

        if (dir < 0) {
            elements.find(".current").before(view.getBar("offscreenTop",    top.name, currentWord - 1));
            view.fitText(".offscreenTop", {x: 40, y: 30});
        } else {
            elements.find(".current").after(view.getBar("offscreenBottom",  bottom.name, currentWord + 1));
            view.fitText(".offscreenBottom", {x: 40, y: 30});
        }

        elements.find(dir < 0 ? ".offscreenTop" : ".offscreenBottom").addClass(dir < 0 ? "top" : "bottom");
        elements.find(dir < 0 ? ".offscreenTop" : ".offscreenBottom").removeClass(dir < 0 ? "offscreenTop" : "offscreenBottom");

        await timeout (600);
        elements.find(dir < 0 ? ".offscreenBottom" : ".offscreenTop").remove();

        scrolling = false;
    },
    onPlay: async () => {
        $("#play").addClass("goUnder");
        $(".question").css("opacity", 0);
        $(".info").css("opacity", 1);
        $(".title").css("opacity", 1);

        await timeout (1000);
        $(".question").hide("opacity", 0);

        let classes = [".elements", ".elementsOverlay"];
        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).removeClass("closed");
        }

        $("#values").removeClass("offscreen");
    },
    end: async (outcomeText, kg, msqr, mj) => {
        $(".elements").addClass("closed");
        $(".elementsOverlay").addClass("closed");

        $("#status").removeClass("show");
        $("#values").addClass("offscreen");
        $("#play").addClass("goUnder");

        await timeout(1000);

        $("#outcomeText").text(outcomeText);
        $("#finalValues  #kg     .value").text(kg);
        $("#finalValues  #msqr   .value").text(msqr);
        $("#finalValues  #mj     .value").text(mj);

        view.fitText("#finalValues .roundRect", {x: 20, y: 0}, {fontSize: 50, marginTop: 45}, true);

        $(".outcome").addClass("showOutcome");
        $(".outcomeOverlay").addClass("showOutcome");
    },
    fitText: (parent, offset, defaultSettings, applyMargin) => {
        if (offset === undefined) offset = {x: 0, y: 0};

		$(parent).each(function () {
			let size, marginSize;
            let paragraph = $(this).find("p").first();

            if (defaultSettings !== undefined) {
                paragraph.css("font-size", defaultSettings.fontSize);
                paragraph.css("margin-top", defaultSettings.marginTop);
            }

			while (paragraph.height() > $(this).height() - offset.y || paragraph.width() > $(this).width() - offset.x) {
                size        = parseInt(paragraph.css("font-size"),  10);

				paragraph.css("font-size", size - 1.5);

                if (applyMargin === true) {
                    marginSize  = parseFloat(paragraph.css("margin-top"), 10);
                    paragraph.css("margin-top", marginSize + 1.3);
                }
			}
		});
	},
}