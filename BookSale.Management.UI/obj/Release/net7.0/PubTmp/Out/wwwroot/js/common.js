/**
 * show toaster [Success, Warning, Error, Information]
 * @param {any} type
 * @param {any} text
 * @param {any} timeOut
 */
function showToaster(type, text, timeOut = 5000) {
    $.toast({
        heading: type,
        text: text,
        position: 'bottom-right',
        icon: type === 'Information' ? 'info' : type.toLowerCase(),
        hideAfter: timeOut
    });
}
/**
 * map object from server responsed to control inputs on View
 * @param {any} modelView
 * @returns
 */
function mapObjectToControlView(modelView) {

    if (typeof modelView !== 'object') {
        return;
    }

    for (const property in modelView) {

        if (modelView.hasOwnProperty(property)) {

            const [firstCharacter, ...restChar] = property; //name

            const capitalText = `${firstCharacter.toLocaleUpperCase()}${restChar.join('')}`;

            $(`#${capitalText}`).val(modelView[property]);
        }
    }
}

function formatCurrencyVN(value) {
    return value.toLocaleString("vi-VN", {
        style: 'currency',
        currency: 'VND'
    });
}

(function () {

    $.blockUI.defaults.message = `<div class="sk-circle">
                                      <div class="sk-circle1 sk-child"></div>
                                      <div class="sk-circle2 sk-child"></div>
                                      <div class="sk-circle3 sk-child"></div>
                                      <div class="sk-circle4 sk-child"></div>
                                      <div class="sk-circle5 sk-child"></div>
                                      <div class="sk-circle6 sk-child"></div>
                                      <div class="sk-circle7 sk-child"></div>
                                      <div class="sk-circle8 sk-child"></div>
                                      <div class="sk-circle9 sk-child"></div>
                                      <div class="sk-circle10 sk-child"></div>
                                      <div class="sk-circle11 sk-child"></div>
                                      <div class="sk-circle12 sk-child"></div>
                                    </div>`;

    $.blockUI.defaults.css = {
        padding: 0,
        margin: 0,
        width: '30%',
        top: '40%',
        left: '35%',
        textAlign: 'center',
        color: '#000',
        border: 'none',
        backgroundColor: 'none',
        cursor: 'wait'
    }

})();