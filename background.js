
// Set localStorage defaults
if (localStorage.isCheckNotif === '') {
  localStorage.isCheckNotif = true;
}
if (localStorage.scanInterval === '') {
  localStorage.scanInterval = '120';
}
if (localStorage.securityLevelNotification === '') {
  localStorage.securityLevelNotification = true;
}
if (localStorage.shuttleNotification === '') {
  localStorage.shuttleNotification = true;
}

if (localStorage.checkBagil === '') {
  localStorage.checkBagil = true;
}
if (localStorage.checkSybil === '') {
  localStorage.checkSybil = true;
}

function percentage(players, server_name) {
  var max = 0;
  if (server_name == 'bagil') {
    max = 90;
  }else if (server_name == 'sybil') {
    max = 90;
  } else {
    return 0;
  }
  return parseInt((players*100)/max);
}

function toTimeString(seconds) {
  return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}

function bagilNotif(mode, map_name, gamestate, players, duration, message) {
  var fullMessage;
  if (mode === undefined) {
    mode = '';
  }
  if (map_name === undefined) {
    map_name = '';
  } else {
    map_name = 'Map: '+map_name;
  }
  if (gamestate === undefined) {
    gamestate = '';
  }
  if (players === undefined) {
    players = '';
  }
  if (message === undefined) {
    message = '';
    fullMessage = map_name;
  } else {
    fullMessage = message;
  }

  var bagilOpt = {
    type: "progress",
    title: "TG Station 13 (Bagil) - \""+mode+"\"",
    message: fullMessage,
    iconUrl: "img/ss13.png",
    contextMessage: window.gamestate(gamestate)+' - '+players+'/90 | '+toTimeString(duration),
    buttons: [
      {
        title: 'Play',
        iconUrl: 'img/ss13.png'
      },
    ],
    progress: percentage(players, 'bagil'),
    isClickable: true,
  };
  chrome.notifications.create('bagil', bagilOpt);
}

function sybilNotif(mode, map_name, gamestate, players, duration, message) {
  var fullMessage;
  if (mode === undefined) {
    mode = '';
  }
  if (map_name === undefined) {
    map_name = '';
  } else {
    map_name = 'Map: '+map_name;
  }
  if (gamestate === undefined) {
    gamestate = '';
  }
  if (players === undefined) {
    players = '';
  }
  if (message === undefined) {
    message = '';
    fullMessage = map_name;
  } else {
    fullMessage = message;
  }

  var sybilOpt = {
    type: "progress",
    title: "TG Station 13 (Sybil) - \""+mode+"\"",
    message: fullMessage,
    iconUrl: "img/ss13.png",
    contextMessage: window.gamestate(gamestate)+' - '+players+'/90 | '+toTimeString(duration),
    buttons: [
      {
        title: 'Play',
        iconUrl: 'img/ss13.png'
      },
    ],
    progress: percentage(players, 'sybil'),
    isClickable: true,
  };
  chrome.notifications.create('sybil', sybilOpt);
}

function serialize(obj) {
  var str = [];
  for(var p in obj)
  if (obj.hasOwnProperty(p)) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}

function gamestate(gamestate) {
  if (gamestate == 1) {
    return 'Pre Game';
  }
  if (gamestate == 2) {
    return 'Setting Up';
  }
  if (gamestate == 3) {
    return 'Playing';
  }
  if (gamestate == 4) {
    return 'Restarting';
  }
}

function scanBagil() {
  $.ajax({
    url: 'http://localhost:1337/?bagil=1',
    crossDomain: true,
    dataType: 'json',
    beforeSend: function () {
      if(localStorage.isCheckNotif == 'true'){
        chrome.notifications.create('checkBagil', {
          type: "basic",
          title: "Scanning Stations (Bagil)",
          message: 'Checking Bagil',
          iconUrl: "img/ss13.png"
        });
      }
    },
    success: function(data) {
      chrome.notifications.clear('checkBagil');
      var bagil = data[0];

      // is there any bagil?
      if (bagil !== undefined) {

        // is bagil data erroneus?
        if (bagil.ERROR !== null) {

          // arrange bagil data for storage
          var bagilStore = {};
          $.each(bagil, function(i,v){
            i = 'bagil_'+i;
            bagilStore[i] = v;
          });

          // store bagil data to storage
          chrome.storage.sync.set(bagilStore, function() {
            console.log('Settings saved for Bagil');
          });

          // if bagil storage data changed
          chrome.storage.onChanged.addListener(function(changes, namespace) {
            for (var key in changes) {
              var storageChange = changes[key];


              // This is here so everytime a notification pop up
              if (key == 'bagil_round_duration' && localStorage.developerAlert == 'true') {
                bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration);
              }

              // Game state changed notification
              if (key == 'bagil_gamestate') {
                if (storageChange.newValue == 1) {
                  bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration, 'Gamestate: Pre-Game');
                }
                if (storageChange.newValue == 2) {
                  bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration, 'Gamestate: Setting Up');
                }
                if (storageChange.newValue == 3) {
                  bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration, 'Gamestate: Playing');
                }
                if (storageChange.newValue == 4) {
                  bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration, 'Gamestate: Restarting');
                }
              }
              // shuttle status changed notification
              if (key == 'bagil_shuttle_mode') {
                bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration, 'Shuttle Mode: '+storageChange.newValue);
              }
              // security level changed notification
              if (key == 'bagil_security_level' && localStorage.securityLevelNotification == 'true') {
                bagilNotif(bagilStore.bagil_mode, bagilStore.bagil_map_name, bagilStore.bagil_gamestate, bagilStore.bagil_players, bagilStore.bagil_round_duration, 'Securty Level: '+storageChange.newValue);
              }
            }
          });
          // create bagil notification
          chrome.storage.sync.get(null, function(storedData) {
            if (storedData.bagil_version === ''){
              bagilNotif(bagil.mode, bagil.map_name, bagil.gamestate, bagil.players);
            }
          });
        } else {
          var bagilOptErr = {
            type: "basic",
            title: "TG Station 13 (Bagil)",
            message: "Error: Cannot connect to server.",
            iconUrl: "img/ss13.png",
            isClickable: false,
          };
          chrome.notifications.create('bagilErr', bagilOptErr);
        }
      }
    },
    error: function (a, b, c) {
      alert(c);
    }
  });
}
function scanSybil() {
  $.ajax({
    url: 'http://localhost:1337/?sybil=1',
    crossDomain: true,
    dataType: 'json',
    beforeSend: function () {
      if(localStorage.isCheckNotif == 'true'){
        chrome.notifications.create('checkSybil', {
          type: "basic",
          title: "Scanning Stations (Sybil)",
          message: 'Checking Sybil',
          iconUrl: "img/ss13.png"
        });
      }
    },
    success: function(data) {
      chrome.notifications.clear('checkSybil');
      var sybil = data[0];

      // is there any sybil?
      if (sybil !== undefined) {

        // is sybil data erroneus?
        if (sybil.ERROR !== null) {

          // arrange sybil data for storage
          var sybilStore = {};
          $.each(sybil, function(i,v){
            i = 'sybil_'+i;
            sybilStore[i] = v;
          });

          // store sybil data to storage
          chrome.storage.sync.set(sybilStore, function() {
            console.log('Settings saved for Sybil');
          });

          // if sybil storage data changed
          chrome.storage.onChanged.addListener(function(changes, namespace) {
            for (var key in changes) {
              var storageChange = changes[key];

              // This is here so everytime a notification pop up
              if (key == 'sybil_round_duration' && localStorage.developerAlert == 'true') {
                sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration);
              }

              // Game state changed notification
              if (key == 'sybil_gamestate') {
                if (storageChange.newValue == 1) {
                  sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration, 'Gamestate: Pre-Game');
                }
                if (storageChange.newValue == 2) {
                  sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration, 'Gamestate: Setting Up');
                }
                if (storageChange.newValue == 3) {
                  sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration, 'Gamestate: Playing');
                }
                if (storageChange.newValue == 4) {
                  sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration, 'Gamestate: Restarting');
                }
              }
              // shuttle status changed notification
              if (key == 'sybil_shuttle_mode') {
                sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration, 'Shuttle Mode: '+storageChange.newValue);
              }
              // security level changed notification
              if (key == 'sybil_security_level' && localStorage.securityLevelNotification == 'true') {
                sybilNotif(sybilStore.sybil_mode, sybilStore.sybil_map_name, sybilStore.sybil_gamestate, sybilStore.sybil_players, sybilStore.sybil_round_duration, 'Securty Level: '+storageChange.newValue);
              }
            }
          });
          // create sybil notification
          chrome.storage.sync.get(null, function(storedData) {
            if (storedData.sybil_version === ''){
              sybilNotif(sybil.mode, sybil.map_name, sybil.gamestate, sybil.players);
            }
          });
        } else {
          var sybilOptErr = {
            type: "basic",
            title: "TG Station 13 (Sybil)",
            message: "Error: Cannot connect to server.",
            iconUrl: "img/ss13.png",
            isClickable: false,
          };
          chrome.notifications.create('sybilErr', sybilOptErr);
        }
      }

    },
    error: function (a, b, c) {
      alert(c);
    }
  });
}

function scan() {
  if (localStorage.checkBagil == 'true') {
    scanBagil();
  }
  if (localStorage.checkSybil == 'true') {
    scanSybil();
  }
}

function playBtnClicked (id, index) {
  var newURL;
  if (id == 'bagil') {
    newURL = "byond://bagil.game.tgstation13.org:2337";
  }
  if (id == 'sybil') {
    newURL = "byond://sybil.game.tgstation13.org:1337";
  }
  chrome.tabs.create({ url: newURL });
}

chrome.notifications.onButtonClicked.addListener(playBtnClicked);

var interval = 0;
setInterval(function() {
  interval++;

  if (localStorage.scanInterval <= interval) {
    scan();
    interval = 0;
  }
}, 1000);
