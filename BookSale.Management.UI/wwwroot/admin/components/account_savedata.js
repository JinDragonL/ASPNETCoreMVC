(function () {

    document.getElementById('Avatar').onchange = function () {
        const input = document.getElementById('Avatar').files[0];

        if (input) {
            document.getElementById('img-avatar').src = URL.createObjectURL(input);
        }
    }

    document.getElementById('img-avatar').onerror = function () {
        onErrorImage();
    }

    function onErrorImage() {
        const img = document.getElementById('img-avatar');
        img.src = "/images/no-image.png";
        img.alt = "no image";
    }

})();