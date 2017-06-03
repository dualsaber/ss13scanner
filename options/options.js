function save_options() {
  localStorage.isCheckNotif = isCheckNotif.checked;
  localStorage.scanInterval = scanInterval.value;
  if (document.getElementById('developerAlert') !== null) {
    localStorage.developerAlert = developerAlert.checked;
  }
  localStorage.securityLevelNotification = securityLevelNotification.checked;
  localStorage.shuttleNotification = shuttleNotification.checked;
  localStorage.gamestateNotification = gamestateNotification.checked;
  localStorage.enterStatusNotification = enterStatusNotification.checked;
  localStorage.checkBagil = checkBagil.checked;
  localStorage.checkSybil = checkSybil.checked;
  document.getElementById('status').textContent = 'Options Saved!';
  setTimeout(function(){
    document.getElementById('status').textContent = '';
  }, 2000);
}


function restore_options() {

  if (localStorage.isCheckNotif == 'true') {
    isCheckNotif.checked = true;
  } else {
    isCheckNotif.checked = false;
  }
  if (document.getElementById('developerAlert') !== null) {
    if (localStorage.developerAlert == 'true') {
      developerAlert.checked = true;
    } else {
      developerAlert.checked = false;
    }
  }
  if (document.getElementById('checkBagil') !== null) {
    if (localStorage.checkBagil == 'true') {
      checkBagil.checked = true;
    } else {
      checkBagil.checked = false;
    }
  }
  if (document.getElementById('checkSybil') !== null) {
    if (localStorage.checkSybil == 'true') {
      checkSybil.checked = true;
    } else {
      checkSybil.checked = false;
    }
  }
  if (localStorage.securityLevelNotification == 'true') {
    securityLevelNotification.checked = true;
  } else {
    securityLevelNotification.checked = false;
  }
  if (localStorage.shuttleNotification == 'true') {
    shuttleNotification.checked = true;
  } else {
    shuttleNotification.checked = false;
  }
  if (localStorage.gamestateNotification == 'true') {
    gamestateNotification.checked = true;
  } else {
    gamestateNotification.checked = false;
  }
  if (localStorage.enterStatusNotification == 'true') {
    enterStatusNotification.checked = true;
  } else {
    enterStatusNotification.checked = false;
  }

  for (var i = 0; i < scanInterval.options.length; i++) {
    scanInterval.options[i].selected = false;
    if (scanInterval.options[i].value == localStorage.scanInterval) {
      scanInterval.options[i].selected = true;
    }
  }

  if (isCheckNotif.checked) {
    document.getElementById('isCheckNotifLabel').textContent = 'On';
    document.getElementById('isCheckNotifLabel').className = "linkOn";
  } else {
    document.getElementById('isCheckNotifLabel').textContent = 'Off';
    document.getElementById('isCheckNotifLabel').className = "linkOff";
  }
  if (securityLevelNotification.checked) {
    document.getElementById('securityLevelNotificationLabel').textContent = 'On';
    document.getElementById('securityLevelNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('securityLevelNotificationLabel').textContent = 'Off';
    document.getElementById('securityLevelNotificationLabel').className = "linkOff";
  }
  if (shuttleNotification.checked) {
    document.getElementById('shuttleNotificationLabel').textContent = 'On';
    document.getElementById('shuttleNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('shuttleNotificationLabel').textContent = 'Off';
    document.getElementById('shuttleNotificationLabel').className = "linkOff";
  }
  if (gamestateNotification.checked) {
    document.getElementById('gamestateNotificationLabel').textContent = 'On';
    document.getElementById('gamestateNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('gamestateNotificationLabel').textContent = 'Off';
    document.getElementById('gamestateNotificationLabel').className = "linkOff";
  }
  if (enterStatusNotification.checked) {
    document.getElementById('enterStatusNotificationLabel').textContent = 'On';
    document.getElementById('enterStatusNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('enterStatusNotificationLabel').textContent = 'Off';
    document.getElementById('enterStatusNotificationLabel').className = "linkOff";
  }
  if (developerAlert.checked) {
    document.getElementById('developerAlertLabel').textContent = 'On';
    document.getElementById('developerAlertLabel').className = "linkOn";
  } else {
    document.getElementById('developerAlertLabel').textContent = 'Off';
    document.getElementById('developerAlertLabel').className = "linkOff";
  }
  if (checkBagil.checked) {
    document.getElementById('checkBagilLabel').textContent = 'On';
    document.getElementById('checkBagilLabel').className = "linkOn";
  } else {
    document.getElementById('checkBagilLabel').textContent = 'Off';
    document.getElementById('checkBagilLabel').className = "linkOff";
  }
  if (checkSybil.checked) {
    document.getElementById('checkSybilLabel').textContent = 'On';
    document.getElementById('checkSybilLabel').className = "linkOn";
  } else {
    document.getElementById('checkSybilLabel').textContent = 'Off';
    document.getElementById('checkSybilLabel').className = "linkOff";
  }
}

document.getElementById("isCheckNotifLabel").addEventListener("click", function(){
  if (!isCheckNotif.checked) {
    document.getElementById('isCheckNotifLabel').textContent = 'On';
    document.getElementById('isCheckNotifLabel').className = "linkOn";
  } else {
    document.getElementById('isCheckNotifLabel').textContent = 'Off';
    document.getElementById('isCheckNotifLabel').className = "linkOff";
  }
});
document.getElementById('securityLevelNotificationLabel').addEventListener("click", function(){
  if (!securityLevelNotification.checked) {
    document.getElementById('securityLevelNotificationLabel').textContent = 'On';
    document.getElementById('securityLevelNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('securityLevelNotificationLabel').textContent = 'Off';
    document.getElementById('securityLevelNotificationLabel').className = "linkOff";
  }
});
document.getElementById('shuttleNotificationLabel').addEventListener("click", function(){
  if (!shuttleNotification.checked) {
    document.getElementById('shuttleNotificationLabel').textContent = 'On';
    document.getElementById('shuttleNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('shuttleNotificationLabel').textContent = 'Off';
    document.getElementById('shuttleNotificationLabel').className = "linkOff";
  }
});
document.getElementById('gamestateNotificationLabel').addEventListener("click", function(){
  if (!gamestateNotification.checked) {
    document.getElementById('gamestateNotificationLabel').textContent = 'On';
    document.getElementById('gamestateNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('gamestateNotificationLabel').textContent = 'Off';
    document.getElementById('gamestateNotificationLabel').className = "linkOff";
  }
});
document.getElementById('enterStatusNotificationLabel').addEventListener("click", function(){
  if (!enterStatusNotification.checked) {
    document.getElementById('enterStatusNotificationLabel').textContent = 'On';
    document.getElementById('enterStatusNotificationLabel').className = "linkOn";
  } else {
    document.getElementById('enterStatusNotificationLabel').textContent = 'Off';
    document.getElementById('enterStatusNotificationLabel').className = "linkOff";
  }
});
document.getElementById('developerAlertLabel').addEventListener("click", function(){
  if (!developerAlert.checked) {
    document.getElementById('developerAlertLabel').textContent = 'On';
    document.getElementById('developerAlertLabel').className = "linkOn";
  } else {
    document.getElementById('developerAlertLabel').textContent = 'Off';
    document.getElementById('developerAlertLabel').className = "linkOff";
  }
});
document.getElementById('checkBagilLabel').addEventListener("click", function(){
  if (!checkBagil.checked) {
    document.getElementById('checkBagilLabel').textContent = 'On';
    document.getElementById('checkBagilLabel').className = "linkOn";
  } else {
    document.getElementById('checkBagilLabel').textContent = 'Off';
    document.getElementById('checkBagilLabel').className = "linkOff";
  }
});
document.getElementById('checkSybilLabel').addEventListener("click", function(){
  if (!checkSybil.checked) {
    document.getElementById('checkSybilLabel').textContent = 'On';
    document.getElementById('checkSybilLabel').className = "linkOn";
  } else {
    document.getElementById('checkSybilLabel').textContent = 'Off';
    document.getElementById('checkSybilLabel').className = "linkOff";
  }
});

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener("click", save_options);
document.getElementById('scan').addEventListener("click", scan);