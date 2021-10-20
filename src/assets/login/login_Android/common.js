let sid = '',
    userData = UserData.data;

if (!userData['sid'] || userData['sid'] === '') {
    // main logic
    new XmlHttpRequest('get', captchaHost + '/get_session_id.php', null, function (data) {
        if (data['status'] === 'ok') {
            sid = data['sid'];

            UserData.update({ sid: sid });
        }
    });
} else {
    sid = userData['sid'];
}

window.onclose = function () {
    UserData.update({ sid: '' });
};

// guest login
let guestLoginBtn = document.querySelector('.guest');
guestLoginBtn.addEventListener('click', guestLogin);

function guestLogin() {
    if (!sid || sid === '') return;

    let idStrIndex = window.location.href.indexOf('id=');
    if (idStrIndex >= 0) {
        let strRequest = window.location.href.substr(idStrIndex + 3);
        let androidGuest = { device_id: strRequest };
        new XmlHttpRequest(
            'post',
            captchaHost + '/get_guest_token.php',
            Util.transferJSONToString(androidGuest),
            onAndroidGuestLoginCallback
        );
    }
}

function onAndroidGuestLoginCallback(data) {
    UserData.update({ token: data['token'], login_type: 'guest', platform: 'Android' });
    enterGame();
}

// facebook login
let facebookBtns = document.querySelectorAll('.facebook-login-btn');
facebookBtns.forEach((n, i, p) => {
    n.addEventListener('click', facebookLogin);
});

function facebookLogin() {
    window.open( "https://www.baidu.com" );
}

function enterGame() {
    androidLogger.log('user_account_info=' + localStorage.getItem('user_account_info'));
    androidLogger.backToLobby('user_account_info=' + localStorage.getItem('user_account_info'));
}

function onBodyLoaded() {
    UserData.init();
}

(function flexible(window, document) {
    var os = (function () {
        var ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet =
                /(?:iPad|PlayBook)/.test(ua) ||
                /(?:Macintosh|PlayBook)/.test(ua) ||
                (isAndroid && !/(?:Mobile)/.test(ua)) ||
                (isFireFox && /(?:Tablet)/.test(ua)),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };
    })();
    function setBodyFontSize() {
        const designWidth = 750;
        const baseFontSize = 100;
        const width = window.innerWidth;
        let currentFontSize;
        if (os.isAndroid || os.isPhone) {
            currentFontSize = (width / designWidth) * baseFontSize;
        } else if (os.isTablet) {
            currentFontSize = (width / designWidth) * baseFontSize;
            document.querySelector('.content').style.top = '20%';
            document.querySelector('.box').style.transform = 'scale(0.6)';
        } else if (os.isPc) {
            currentFontSize = (400 / designWidth) * baseFontSize;
            document.querySelector('html').style.width = '400px';
            document.querySelector('.bg').style.width = '400px';
        }
        document.querySelector('html').style.fontSize = currentFontSize + 'px';
    }
    setBodyFontSize();
    window.addEventListener('resize', setBodyFontSize);
})(window, document);