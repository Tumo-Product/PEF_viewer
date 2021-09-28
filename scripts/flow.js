const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let elements;

let currentWord     = 0;
let scrolling       = false;
let done            = false;
let href            = window.location.href;

jQuery.event.special.wheel = {
    setup: function( _, ns, handle ) {
        this.addEventListener("wheel", handle, { passive: !ns.includes("noPreventDefault") });
    }
};

const onPageLoad = async () => {
    data = await parser.dataFetch();
    // data = data.data.data.elements;
    $("#question p").text(data.intro);

    href = href.substring(0, href.indexOf("?"));
    elements = $(".elements");

    await addWords(currentWord);

    $("#kg .value").text(getWord(currentWord).kg);
    $("#msqr .value").text(getWord(currentWord).msqr);
    $("#mj .value").text(getWord(currentWord).mj);

    view.fitText("#values .roundRect", {x: 20, y: 0}, {fontSize: 50, marginTop: 45}, true);

    $(".elements").on('wheel', async function (e) { wheel(e) });

    updateInfo();
    $(".title p").text(data.title);
    
    loader.toggle();
}

const updateInfo = () => {
    $(".info p").text(getWord(currentWord).info);
}

const wheel = (e) => {
    if (!scrolling && !done) {
        let dir = Math.sign(e.originalEvent.wheelDelta);
        currentWord += dir;
        
        scrollTo(currentWord, dir);
    }
}

const scrollTo = async (index, dir) => {
    view.updatePair(getWord(index), getWord(index - 1), getWord(index + 1), dir);

    await timeout(150);
    $("#values  #kg     .value").text(getWord(index).kg);
    $("#values  #msqr   .value").text(getWord(index).msqr);
    $("#values  #mj     .value").text(getWord(index).mj);

    view.fitText("#values .roundRect", {x: 20, y: 0}, {fontSize: 50, marginTop: 45}, true);

    updateInfo();
}

const addWords = async (index) => {
    await view.addPair(getWord(index), getWord(index - 1), getWord(index + 1));
}

const onPlay = async () => {
    await view.onPlay();
    $("#play").attr("onclick", "check()");
}

const getWord = (newIndex) => {
    let length  = data.elements.length;
    newIndex    %= length;
    
    if (newIndex < 0) {
        newIndex = length + newIndex;
    }
    else if (newIndex == length) {
        newIndex = 0;
    }

    return data.elements[newIndex];
}

$(onPageLoad);