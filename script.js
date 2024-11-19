jwplayer.key = "XSuP4qMl+9tK17QNb+4+th2Pm9AWgMO/cYH8CI0HGGr7bdjo"
const playerInstance = jwplayer("player");
let currentChannel = channelList[0];
let indexActivo = 0;
const platform = window.navigator.platform
const crossIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>'
const listIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(255 , 255  , 255 , 1);transform: ;msFilter:;"><path d="M5.282 12.064c-.428.328-.72.609-.875.851-.155.24-.249.498-.279.768h2.679v-.748H5.413c.081-.081.152-.151.212-.201.062-.05.182-.142.361-.27.303-.218.511-.42.626-.604.116-.186.173-.375.173-.578a.898.898 0 0 0-.151-.512.892.892 0 0 0-.412-.341c-.174-.076-.419-.111-.733-.111-.3 0-.537.038-.706.114a.889.889 0 0 0-.396.338c-.094.143-.159.346-.194.604l.894.076c.025-.188.074-.317.147-.394a.375.375 0 0 1 .279-.108c.11 0 .2.035.272.108a.344.344 0 0 1 .108.258.55.55 0 0 1-.108.297c-.074.102-.241.254-.503.453zm.055 6.386a.398.398 0 0 1-.282-.105c-.074-.07-.128-.195-.162-.378L4 18.085c.059.204.142.372.251.506.109.133.248.235.417.306.168.069.399.103.692.103.3 0 .541-.047.725-.14a1 1 0 0 0 .424-.403c.098-.175.146-.354.146-.544a.823.823 0 0 0-.088-.393.708.708 0 0 0-.249-.261 1.015 1.015 0 0 0-.286-.11.943.943 0 0 0 .345-.299.673.673 0 0 0 .113-.383.747.747 0 0 0-.281-.596c-.187-.159-.49-.238-.909-.238-.365 0-.648.072-.847.219-.2.143-.334.353-.404.626l.844.151c.023-.162.067-.274.133-.338s.151-.098.257-.098a.33.33 0 0 1 .241.089c.059.06.087.139.087.238 0 .104-.038.193-.117.27s-.177.112-.293.112a.907.907 0 0 1-.116-.011l-.045.649a1.13 1.13 0 0 1 .289-.056c.132 0 .237.041.313.126.077.082.115.199.115.352 0 .146-.04.266-.119.354a.394.394 0 0 1-.301.134zm.948-10.083V5h-.739a1.47 1.47 0 0 1-.394.523c-.168.142-.404.262-.708.365v.754a2.595 2.595 0 0 0 .937-.48v2.206h.904zM9 6h11v2H9zm0 5h11v2H9zm0 5h11v2H9z"></path></svg>'

async function setupPlayer() {
  try {
    var mpd = await getValidMpd();

    jwplayer("player").setup({
      playlist: [{
        sources: [{
          default: true,
          type: "dash",
          file: mpd,
          drm: {
            clearkey: { keyId: channelList[0].keyId, key: channelList[0].key }
          }
        }]
      }],
      width: "100%",
      height: "100vh",
      aspectratio: "16:9",
      autostart: "true",
      cast: {},
      sharing: {}
    });

    playerInstance.on("play", function (e) {
      playerInstance.setCurrentAudioTrack(1);
    });

    playerInstance.on("error", (e) => {
      mt2.splice(mt2.indexOf(lastMt), 1)
      changeChannel(null, null, currentChannel.getURL)
    })

    playerInstance.on("ready", () => {
      // Fix live tabindex
      const liveInterval = setInterval(() => {
        const live = document.querySelector("#player").querySelector(".jw-text-live");
        if (live) {
          clearInterval(liveInterval);
          document.querySelector("#player").querySelector(".jw-text-live").setAttribute("tabindex", -1);
        }
      }, 500);
      // Desactiva interaccion con el reproductor
      document.querySelector("#player").querySelectorAll("*:not(div.channelList)").forEach((e) => e.setAttribute("tabindex", -1));
      document.querySelector("#player").setAttribute("tabindex", -1);

      // Desactiva keybinds, desmutea reproductor y pantalla completa
      if (!localStorage.getItem("jwplayer.enableShortcuts")) {
        localStorage.setItem("jwplayer.enableShortcuts", "false");
        localStorage.setItem("jwplayer.bitrateSelection", "5145136");
        localStorage.setItem("jwplayer.qualityLabel", "1080p");
        location.reload()
      }
      playerInstance.setMute(0);
      playerInstance.setVolume(100);
      // playerInstance.setFullscreen(true);

      // Crea contenedor de canales
      const channelListElement = document.createElement("div");
      channelListElement.classList = "channelList";
      channelListElement.style.display = 'block'
      channelListElement.addEventListener("click", changeChannel);
      player.prepend(channelListElement);

      // Crea pop-up seleccion numero de canal
      const channelNumberElement = document.createElement("div");
      const channelNumberElementText = document.createElement("span");
      channelNumberElement.classList = "channelNumber";
      channelNumberElement.append(channelNumberElementText);
      player.prepend(channelNumberElement);

      // Crea todos los botones de los canales
      channelList.forEach((e, i) => {
        const btn = document.createElement("button");
        const cnImage = document.createElement("img");
        cnImage.src = '/canales/canales/logos/' + (e.img || 'canal.webp')
        const cnName = document.createElement("span");
        cnName.innerText = e.name || atob(e.getURL).replaceAll("_", " ");
        const cnNumber = document.createElement("span");
        cnNumber.innerText = i + 1;
        btn.appendChild(cnImage);
        btn.appendChild(cnName);
        btn.appendChild(cnNumber);
        btn.setAttribute("getURL", e.getURL);
        btn.setAttribute("tabindex", 0);
        document.querySelector(".channelList").appendChild(btn);
      });

      // Cambiar de canales con flechas (↑) (↓)
      const getChannelList = document.querySelector(".channelList");
      const elementos = document.querySelectorAll('[tabindex="0"]'); // Selecciona todos los elementos con tabindex="0"

      // Función para enfocar el siguiente o el anterior elemento
      function enfocarElemento(index) {
        if (index >= 0 && index < elementos.length) {
          elementos[index].focus();
        }
      }
      enfocarElemento(indexActivo);

      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          getChannelList.style.display = "block";
          // Flecha abajo, mover al siguiente elemento
          indexActivo = (indexActivo + 1) % elementos.length; // Cicla al siguiente
          enfocarElemento(indexActivo);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          getChannelList.style.display = "block";
          // Flecha arriba, mover al elemento anterior
          indexActivo = (indexActivo - 1 + elementos.length) % elementos.length; // Cicla al anterior
          enfocarElemento(indexActivo);
        } else if (e.key === "ArrowLeft") {
          platform == 'Win32' && getChannelList.style.display == "block" ? hideArrow() : getChannelList.style.display = "none";
        } else if (e.key === "ArrowRight") {
          platform == 'Win32' && getChannelList.style.display == "none" ? hideArrow() : getChannelList.style.display = "block";
          enfocarElemento(indexActivo);
        }
      });

      
      if (platform == 'Win32') {
        const listArrow = document.createElement("span")
        listArrow.classList = "channelArrow";
        listArrow.innerHTML = crossIcon
        // listArrow.innerHTML = 
        listArrow.addEventListener("click", hideArrow);
        listArrow.style.left = channelListElement.offsetWidth + 'px'
        player.append(listArrow)

        function hideArrow () {
          const getChannelList = document.querySelector(".channelList");
          let visible = getChannelList.style.display
          if (visible == 'block'){
            getChannelList.style.display = 'none'
            listArrow.style.left = 0
            listArrow.innerHTML = listIcon
            listArrow.classList.add('fs')
          } else {
            getChannelList.style.display = 'block'
            listArrow.style.left = getChannelList.offsetWidth + 'px'
            listArrow.innerHTML = crossIcon
            listArrow.classList.remove('fs')
            enfocarElemento(indexActivo)
          }
        }
      }
      

    });
  } catch (error) {
    console.error("Failed to setup player:", error);
    console.error("No se encontraron URLs válidas.");
  }
}

// Funcion cambiar canales
const changeChannel = async (e, channelNumber, refreshList) => {
  const selectedChannel =
  e?.target.getAttribute("getURL") ||
  e?.target.parentElement.getAttribute("getURL") ||
  channelList[channelNumber - 1]?.getURL ||
  refreshList;
  const channelInfo = channelList.find((f) => f.getURL == selectedChannel);
  const mpd = await getValidMpd(channelInfo);

  if (platform == 'Win32') {
    const currentChannelNum = channelList.findIndex((f) => f.getURL == selectedChannel)
    indexActivo = currentChannelNum
  }

  playerInstance.load({
    sources: [
      {
        default: true,
        type: "dash",
        file: mpd,
        drm: {
          clearkey: { keyId: channelInfo.keyId, key: channelInfo.key },
        },
      },
    ],
  });
  playerInstance.stop()
  playerInstance.play()
  playerInstance.setMute(0);
  playerInstance.setVolume(100);
  playerInstance.setCurrentQuality(1);
};

let mt = [
  "edge-live01-mun",
  "edge-live02-mun",
  "edge-live11-hr",
  "edge-live12-hr",
  "edge-live13-hr",
  "edge-live14-hr",
  "edge-live15-hr",
  "edge-live16-hr",
  "edge-live17-hr",
  "edge-live31-hr",
  "edge-live32-hr",
  "edge-live34-hr",
  "edge-live11-sl",
  "edge-live12-sl",
  "edge-live13-sl",
  "edge-live15-sl",
  "edge-live17-sl",
  "edge-live31-sl",
  "edge-vod02-sl",
  "edge-vod04-sl",
  "edge-vod06-sl",
  "edge9-sl",
  "edge10-sl",
  "edge-vod01-hr",
  "edge-vod03-hr",
  "edge-vod04-hr",
  "edge1-ccast-sl",
  "edge2-ccast-sl",
  "edge6-ccast-sl",
  "edge-live01-cen",
  "edge-live03-cen",
  "edge-mix02-cte",
  "edge-vod01-cen",
  "edge-live01-cte",
  "edge-live01-coe",
  "edge-mix01-coe",
  "edge-mix02-coe",
  "edge-mix03-coe",
  "edge-mix04-coe",
  "edge-mix05-coe",
  "edge-mix01-ird",
  "edge-mix02-ird",
  "edge-mix01-mus",
  "edge-mix03-mus",
];

// let mt = ["edge-mix05-coe"]

async function testSubdomains() {
  for (let i = 0; i < mt.length; i++) {
    let subdomain = mt[i];
    let mpdURL =
      "https://" +
      subdomain +
      ".cvattv.com.ar/live/c" +
      number +
      "eds/" +
      atob(getURL) +
      "/SA_Live_dash_enc/" +
      atob(getURL) +
      ".mpd";

    try {
      await testMpdURL(mpdURL);
      console.log("Subdomain", subdomain, "is working.");
    } catch (error) {
      console.error(
        "Subdomain",
        subdomain,
        "is not working. Error:",
        error.message
      );
    }
  }
}
// testSubdomains();

function testMpdURL(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error("HTTP request failed with status " + xhr.status));
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
}

let lastMt = ''
let mt2 = [...mt];
async function getValidMpd(channelInfo) {
  const channelToLoad = channelInfo || channelList[0];
  currentChannel = channelToLoad;
  while (mt2.length > 0) {
    let random = Math.floor(Math.random() * mt2.length);
    let url = `https://${mt2[random]}.cvattv.com.ar/live/c${channelToLoad.number || 3}eds/${atob(channelToLoad.getURL)}/SA_Live_dash_enc/${atob(channelToLoad.getURL)}.mpd`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        console.log("Selected mt:", mt2[random]);
        lastMt = mt2[random]
        return url;
      } else {
        console.log("Invalid URL, status:", response.status);
        mt2.splice(random, 1); // Remove the invalid entry from the array
      }
    } catch (error) {
      console.log("Error fetching URL:", error);
      mt2.splice(random, 1); // Remove the invalid entry from the array
    }
  }
  mt2 = [...mt]
  // alert("El canal no funciona en este momento.");
  throw new Error("No valid MPD URL found");
}

setupPlayer();

// Deteccion controles TV
let pressed = "";
let timer;
const runTimer = () => {
  timer = setTimeout(() => {
    indexActivo = Number(pressed) - 1;
    changeChannel(null, pressed, null);
    pressed = "";
    document.querySelector(".channelNumber").style.visibility = "hidden";
  }, 2000);
};

document.addEventListener("keypress", (e) => {
  if (!(e.keyCode >= 48 && e.keyCode <= 57)) return;
  if (pressed.length > 2) return;
  document.querySelector(".channelNumber").style.visibility = "visible";
  const channelNumberBox = document.querySelector(".channelNumber span");
  pressed += e.key;
  channelNumberBox.innerText = pressed;
  if (pressed.length >= 1) {
    clearTimeout(timer);
    runTimer();
  }
});

// Touch slide canales android
const debounceDelay = 50;
let debounceTimeout;
let startX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  const chnList = document.querySelector(".channelList")
  const currentX = e.touches[0].clientX; 

  if (!e.target.className.match("jw-reset")) return;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
        if (currentX < startX) {
          chnList.style.transform = `translateX(-${chnList.offsetWidth}px)`
        } else {
          chnList.style.transform = "translateX(0px)"
        }
  }, debounceDelay);
});


// document.addEventListener("keydown", (e) => {
//   document.querySelector(".input").innerText = e.key;
// });