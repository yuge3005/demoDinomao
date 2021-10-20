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
    getFacebookLoginStatus(function (data) {
        let expiresIn = data['authResponse']['expiresIn'];
        UserData.update({
            access_token: data['authResponse']['accessToken'],
            expireTime: Math.round(new Date().valueOf() / 1000) + expiresIn,
            login_type: 'facebook',
            platform: 'Android'
        });

        enterGame();
    }, 0);
}

function getFacebookLoginStatus(callback, repeat = 0) {
    if (repeat >= 3) return;
    try {
        FB.getLoginStatus(function (data) {
            if (data['status'] === 'connected') {
                if (callback) callback(data);
            } else {
                FB.login(
                    function (callback, response) {
                        if (response['status'] === 'connected') {
                            getFacebookLoginStatus(callback);
                        }
                    }.bind(this, callback)
                );
            }
        });
    } catch (e) {
        setTimeout(getFacebookLoginStatus.bind(this, callback, ++repeat), 100);
    }
}

function showTip(message) {}

function enterGame() {
    androidLogger.log('user_account_info=' + localStorage.getItem('user_account_info'));
    androidLogger.backToLobby('user_account_info=' + localStorage.getItem('user_account_info'));
}

function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().languageCode = 'it';
        provider.setCustomParameters({ login_hint: 'user@example.com' });

        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                //	  document.getElementById('quickstart-oauthtoken').textContent = token;

                UserData.update({ access_token: token, login_type: 'google', platform: 'Android' });
                enterGame();
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    // alert(
                    //     'You have already signed up with a different auth provider for that email.'
                    // );
                    // If you are using multiple auth providers on your app you should handle linking
                    // the user's accounts here.
                } else {
                    console.error(error);
                }
            });
    } else {
        firebase.auth().signOut();
    }
}

function onBodyLoaded() {
    UserData.init();
    DelayLoad.load();
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