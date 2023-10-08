var quote = "";
var author = "";

function getData() {
    return fetch("http://safetybelt.pythonanywhere.com/quotes/random")
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log(data);
                quote = data.quote;
                author = data.author;
                setData();
            }
        })
        .catch(error => {
            console.error(error);
            return getData(); //recursion to skip over the broken data
        });
}

function setData() {
    const quoteELem = document.getElementById('quote');
    quoteELem.innerHTML = quote;

    const authorElem = document.getElementById('author');
    authorElem.innerHTML = author;
}

function getBgColor1() {
    // console.log(Math.floor(Math.random() * 256)); 
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
    // console.log('rgb(' + r + ',' + g + ',' + b + ')'); 
}

function changeBgColor() {

    const bg = document.getElementsByClassName('quote-background');

    if (bg.length > 0) {

        document.getElementById("page-background").style.background = bg[0].style.background;

        bg[0].style.transition = '';
        bg[0].style.width = 0;

        setTimeout(() => {
            bg[0].style.transition = 'background 0.5s linear, width 0.5s linear';
            bg[0].style.background = getBgColor1();
            bg[0].style.width = '250%';

        }, 0);
    }

}

function generate() {

    getData();

    changeBgColor();

}

// Uncomment Line 74 to start the auto-animation
// setInterval(generate, 3000);

(function () {
    const button = document.getElementById('generate');
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            generate();
        });
    }
})();