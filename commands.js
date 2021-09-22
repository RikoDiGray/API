/*
    Author: https://vk.com/satosempai
    Script create at: 19.09.2021
*/

function connect() {
    // wait...
}

var input = document.querySelector("div[class='im_editable im-chat-input--text _im_text']");
var buttonSendMessage = document.querySelector(".im-chat-input--send");
var info = document.querySelector("img[class='top_profile_vkconnect_img']");
var messageCounts = document.querySelector("span[class='inl_bl left_count']").innerText;
var get_name = info.getAttribute("alt");
var updateBtn = null;
var lastSendMessage, lastFocusMessage;
var editButton, lastEditButton;
var beforeText = "";

const logs = [{
    message_history: []
}];

const err = [];

const settings = {
    user: {
        name: get_name.split(" ")[0],
        surname: get_name.split(" ")[1],
        id: vk.id,
        ignor_list: []
    },

    profile: {
        send: true,
        visible: true,
        hide: false,
        active: true,
        status: "ok"
    }
}


class API { 
    constructor() {
        this.sendMessage("Бот успешно запущен!");
    }

    sendMessage(text) {
        input.innerText = text;
        buttonSendMessage.click();
        logs[0].message_history.push({
            text: text || "null",
            date: new Date().toLocaleString(),
            method: "message_send"
        });
    }
    
    deleteMessage() {
        return false;
    }

    editMessage(text) {
        beforeText = input.innerText;
        lastEditButton.click()
        input.innerText = text;
        setTimeout(() => {
            updateBtn = document.querySelector("button[aria-label='Редактировать']");
            try {
                updateBtn.click();
            } catch (e) {
                return false;
            }
        }, 100);
        setTimeout(() => {
            input.innerText = beforeText;
        }, 200);
    }

    sendPic() {
        return APIcommands.sendMessage("[API.sendPic()] Метод на данный момент не работает.");
    }
}

const APIcommands = new API();

const body = document.body;
body.id = "body";
var previousText = input.innerText;
input.addEventListener("keyup", function() {
    previousText = this.innerText;
});


var logs_text = "";
var counter = 1;
var random = Math.floor(Math.random() * 100);

const prefixes = ["!у", ".у"];
const signals = [
    {
        text: "пинг",
        result: "Понг!"
    },
    {
        text: "инфо",
        result: `Пользователь @id${vk.id}(${settings.user.name})\nid: ${settings.user.id}\nСообщений: ${messageCounts}
        `
    },
    {
        text: "рандом",
        result: `Рандомное число 0-100: ${random}`
    }
]
function getPrefix(item) {
    random = Math.floor(Math.random() * 100);
    for(i = 0; i < prefixes.length; i++) {
        for(j = 0; j < signals.length; j++) {
            if(item == `${prefixes[i]} ${signals[j].text}`) {
                if(settings.profile.send) {
                    APIcommands.sendMessage(signals[j].result);
                } else {
                    APIcommands.editMessage(signals[j].result);
                }
            }
        }
    }
}

function set_tings(item) {
    for(i = 0; i < prefixes.length; i++) {
        for(j = 0; j < signals.length; j++) {
            if(item.indexOf(`${prefixes[i]} н`) > -1 && item.split(`${prefixes[i]} н`)[0] == "") {
                var str = String(item.split("н")[1]).trim();
                if(settings.profile.send) {
                    switch(str) {
                        case "1":
                            APIcommands.sendMessage(`Настройки Сообщения:\nСтатус: ${settings.profile.send}`);
                            break;
                        case "2":
                            APIcommands.sendMessage(`Настройки Visible:\nСтатус: ${settings.profile.visible}`);
                            break;
                        case "3":
                            APIcommands.sendMessage(`Настройки hide:\nСтатус: ${settings.profile.hide}`);
                            break;
                        case "4":
                            APIcommands.sendMessage(`Настройки active:\nСтатус: ${settings.profile.active}`);
                            break;
                        case "5":
                            APIcommands.sendMessage(`Настройки status:\nСтатус: ${settings.profile.status}`);
                            break;
                        case "все":
                            APIcommands.sendMessage(`Настройки все:\nСообщения: ${settings.profile.send}\nvisible: ${settings.profile.visible}\nhide: ${settings.profile.hide}\nactive: ${settings.profile.active}\nstatus: ${settings.profile.status}`);
                            break;
                        default:
                            APIcommands.sendMessage(`Неверно передан аргумент. Проверьте настройки\nСигнал: !у н все`);
                            break;
                    }
                } else {
                    switch(str) {
                        case "1":
                            APIcommands.editMessage(`Настройки Сообщения:\nСтатус: ${settings.profile.send}`);
                            break;
                        case "2":
                            APIcommands.editMessage(`Настройки Visible:\nСтатус: ${settings.profile.visible}`);
                            break;
                        case "3":
                            APIcommands.editMessage(`Настройки hide:\nСтатус: ${settings.profile.hide}`);
                            break;
                        case "4":
                            APIcommands.editMessage(`Настройки active:\nСтатус: ${settings.profile.active}`);
                            break;
                        case "5":
                            APIcommands.editMessage(`Настройки status:\nСтатус: ${settings.profile.status}`);
                            break;
                        case "все":
                            APIcommands.editMessage(`Настройки все:\nСообщения: ${settings.profile.send}\nvisible: ${settings.profile.visible}\nhide: ${settings.profile.hide}\nactive: ${settings.profile.active}\nstatus: ${settings.profile.status}`);
                            break;
                        default:
                            APIcommands.editMessage(`Неверно передан аргумент. Проверьте настройки\nСигнал: !у н все`);
                            break;
                    }
                }
            }
        }
    }
}


function dev(item) {
    for(i = 0; i < prefixes.length; i++) {
        for(j = 0; j < signals.length; j++) {
            if(item.indexOf(`${prefixes[i]} выполни`) > -1 && item.split(`${prefixes[i]} выполни`)[0] == "") {
                if(settings.profile.send == true) {
                    try {
                        var ev =  eval(item.split("выполни")[1].trim());
                        APIcommands.sendMessage(`[return]: ${ev}`);
                    } catch (e) {
                        return APIcommands.sendMessage(`[error]: ${e}`);
                    }
                 } else {
                    try {
                        var ev =  eval(item.split("выполни")[1].trim());
                        APIcommands.editMessage(`[return]: ${ev}`);
                    } catch (e) {
                        return APIcommands.editMessage(`[error]: ${e}`);
                    }
                }
            }
        }
    }
}



var startUpCounter = 0;


function scan() {
    lastSendMessage = document.querySelectorAll("div[class='im-mess--text wall_module _im_log_body']");
    lastFocusMessage = lastSendMessage[lastSendMessage.length - 1].innerText;
    editButton = document.querySelectorAll("span[aria-label='Редактировать']");
    lastEditButton = editButton[editButton.length -1];
    startUpCounter++;
    if(startUpCounter >= 2) {
        startUpCounter = 0;
        getPrefix(lastFocusMessage);
        dev(lastFocusMessage);
        set_tings(lastFocusMessage);
    }
}

const observer = new MutationObserver(scan);
observer.observe(body, {
    childList: true,
    subtree: true
});
