if (window.location.hostname == '127.0.0.1') {
    window.argosv3_api = "http://localhost:3999"
    console.log('run local')
} else {
    window.argosv3_api = "https://argosv3.servehttp.com"
}

let storageToken = "argosv3_v1_";

(function () {
    class ArgosV3 {
        insertInput() {
            var allForms = document.querySelectorAll('form')
            allForms.forEach(element => {  
                var inputArgos = document.createElement('input');
                inputArgos.setAttribute('name', 'argosid_teste');
                inputArgos.value = this.userid;
                inputArgos.setAttribute('type', 'hidden');
                element.appendChild(inputArgos);
            });
        }

        build() {
            this.userid = sessionStorage.getItem(storageToken + "userid")
            this.identifyData = window.argosIdentify || []
            this.insertInput()
            this.pageview()

            if (sessionStorage.getItem(storageToken + "session_ok") == null) {
                this.session()
                sessionStorage.setItem(storageToken + "session_ok", true)
            }
        }

        sender(url, data) {
            var blob = new Blob([data], { type: 'application/json; charset=UTF-8' });
            navigator.sendBeacon(window.argosv3_api + url, blob)
        }

        getDevice() {
            if (screen.width >= 1200) {
                return "3" // desktop
            } else if (screen.width < 768) {
                return "1" // mobile
            } else {
                return "2" // tablet
            }
        }

        getParams() {
            let queryDict = {}
            location.search.substr(1).split("&").forEach(function (item) {
                queryDict[item.split("=")[0]] = item.split("=")[1]
            })

            return queryDict;
        }

        userUpdate() {
            
            var data = JSON.stringify({
                "alias": window.argosIdentify[0],
                "data": window.argosIdentify[1]
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {});

            xhr.open("POST", window.argosv3_api + "/user/");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
        }

        identify() {

            if (this.identifyData.length > 0) {

                var data = JSON.stringify({
                    "token": parseInt(this.userid),
                    "alias": window.argosIdentify[0]
                });

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                var identifyData = this.identifyData

                var callUpdateUser = this.userUpdate.bind(this);

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if (identifyData.length > 1) {
                            callUpdateUser()
                        }
                    }
                });

                xhr.open("POST", window.argosv3_api + "/identify/");
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.send(data);

            }
        }

        session() {
            let urlParams = this.getParams()

            var params = {
                "1": this.getDevice()
            }

            if (urlParams['utm_source'] != undefined) {
                params['2'] = urlParams['utm_source']
            }
            if (urlParams['utm_medium'] != undefined) {
                params['3'] = urlParams['utm_medium']
            }
            if (urlParams['utm_campaign'] != undefined) {
                params['4'] = urlParams['utm_campaign']
            }
            if (urlParams['utm_content'] != undefined) {
                params['10'] = urlParams['utm_content']
            }
            if (urlParams['utm_term'] != undefined) {
                params['11'] = urlParams['utm_term']
            }
            if (urlParams['gclid'] != undefined) {
                params['5'] = urlParams['gclid']
            }
            if (urlParams['fbclid'] != undefined) {
                params['6'] = urlParams['fbclid']
            }

            if (document.referrer != '') {
                params['9'] = document.referrer
            } else {
                params['9'] = 'direct'
            }

            var data = JSON.stringify({
                "type": 2,
                "token": parseInt(this.userid),
                "data": params
            });

            this.sender('/event/', data)
        }

        pageview() {

            let domain = window.location.hostname,
                path = window.location.pathname;

            var data = JSON.stringify({
                "type": 1,
                "token": parseInt(this.userid),
                "data": {
                    "7": domain,
                    "8": path
                }
            });

            this.sender('/event/', data);

            this.identify()
        }
    }
    window.ArgosV3 = ArgosV3;
})();

function loadPlugin() {
    window.ArgosV3 = new ArgosV3();
    window.ArgosV3.build();
}

function argosSetUser(userid) {
    sessionStorage.setItem(storageToken + "userid", userid)
    loadPlugin()
}

function loadUserid() {
    var argosScript = document.createElement('script');
    argosScript.setAttribute('src', window.argosv3_api + '/central.js');
    document.head.appendChild(argosScript);
}

if (sessionStorage.getItem(storageToken + "userid") == null) {
    loadUserid();
} else {
    loadPlugin()
}

// Para registrar todos os envios de formularios
document.addEventListener('submit', function (e) {

    let url = window.location.hostname + window.location.pathname

    var formData = JSON.stringify({
        "type": 3,
        "token": parseInt(ArgosV3.userid),
        "data": {
            "13": e.target.action,
            "14": e.target.id,
            "15": url
        }
    });

    ArgosV3.sender('/event/', formData)
}, false);

// ===== EventType
// 1 - pageview
// 2 - session
// 3 - form

// ===== Fieldlist

// 7 - domain (pageview)
// 8 - path (pageview)

// 1 - device (1-mobile / 2-tablet / 3-computer) (session)
// 2 - utm_source (session)
// 3 - utm_medium (session)
// 4 - utm_campaign (session)
// 5 - gclid (session)
// 6 - fbclid (session)
// 9 - referer (session)
// 10 - utm_content (session)
// 11 - utm_term (session)
// 12 - IP (session)

// 13 - Form Action (form)
// 14 - Form ID (form)
// 15 - URL of Form (form)