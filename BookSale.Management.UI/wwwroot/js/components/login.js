(function () {

    function initial() {
        intialFBLogin();
        registerReCaptchaGoogleV2();
        registerEvents();
    };

    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            testAPI();
        } else {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this webpage.';
        }
    }

    function intialFBLogin() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '685523913561890',
                cookie: true,
                xfbml: true,
                version: 'v12.0'
            });

            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        };
    }

    function testAPI() {
        FB.api('/me', { fields: 'email, name' }, function (response) {
            console.log('Successful login for: ' + response.name);
        });
    }

    function registerReCaptchaGoogleV2() {
       
    }


    function registerEvents() {


    }

    initial();
})();