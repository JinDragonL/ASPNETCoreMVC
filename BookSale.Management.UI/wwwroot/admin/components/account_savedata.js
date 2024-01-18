(function () {

    const imgAvatar = document.getElementById('img-avatar');

    document.getElementById('Avatar').onchange = function () {
        const input = this.files[0];

        if (input) {
            imgAvatar.src = URL.createObjectURL(input);
        }
    }

    imgAvatar.onerror = function () {
        onErrorImage();
    }

    function onErrorImage() {
        imgAvatar.src = "/images/no-image.png";
        imgAvatar.alt = "no image";
    }

})();