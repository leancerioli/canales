const playerInstance = jwplayer("player");
let getURL = channelList[0].getURL;
let indexActivo = 0;

// Funcion cambiar canales
const changeChannel = async (e, channelNumber) => {
  const selectedChannel =
    e?.target.getAttribute("getURL") ||
    e?.target.parentElement.getAttribute("getURL") ||
    channelList[channelNumber - 1].getURL;
  const channelInfo = channelList.find((f) => f.getURL == selectedChannel);

  getURL = channelInfo.getURL;
  getChannelID();
  let mpd = await getValidMpd();

  playerInstance.load({
    default: true,
    type: "dash",
    preload: "auto",
    file: mpd,
    drm: {
      clearkey: { keyId: channelInfo.keyId, key: channelInfo.key }
    },
  });

  playerInstance.setMute(0);
  playerInstance.setVolume(100);
  playerInstance.setCurrentQuality(1);
};

let number;
function getChannelID() {
  if (
    getURL == "QTNfQ2luZQ==" ||
    getURL == "Rmxvd19NdXNpY19YUA==" ||
    getURL == "Rmxvd19NdXNpY18x" ||
    getURL == "Rmxvd19NdXNpY18y" ||
    getURL == "Rmxvd19NdXNpY18z" ||
    getURL == "QUVIRA==" ||
    getURL == "SG9sYV9UVg==" ||
    getURL == "QVhOSEQ=" ||
    getURL == "TVRWMDA=" ||
    getURL == "V2FybmVySEQ=" ||
    getURL == "R0VOX1RW" ||
    getURL == "Rm94X1Nwb3J0c19QcmVtaXVuX0hE" ||
    getURL == "VG9kb05vdGljaWFz" ||
    getURL == "VHlDU3BvcnQ" ||
    getURL == "QW1lcmljYTI0" ||
    getURL == "QzVO" ||
    getURL == "TGFfTmFjaW9u" ||
    getURL == "Q3JvbmljYVRW" ||
    getURL == "Q2FuYWxfOF9UdWN1bWFu" ||
    getURL == "UGFyYWd1YXlfVFY=" ||
    getURL == "UGFyYW1vdW50" ||
    getURL == "Q29tZWR5Q2VudHJhbA" ||
    getURL == "Rmxvd19NdXNpY18z" ||
    getURL == "Qm9vbWVyYW5n" ||
    getURL == "RHJlYW13b3Jrcw==" ||
    getURL == "QW5pbWFsUGxhbmV0" ||
    getURL == "SGlzdG9yeUhE" ||
    getURL == "SUQ=" ||
    getURL == "QnJhdm9UVg==" ||
    getURL == "U29ueUhE" ||
    getURL == "VHJ1VFY=" ||
    getURL == "SEJPX1BPUA==" ||
    getURL == "RGlzY292ZXJ5VHVyYm8=" ||
    getURL == "RGlzbmV5SnI=" ||
    getURL == "SW52ZXN0aWdhY2lvbl9QZXJpb2Rpc3RpY2E=" ||
    getURL == "Rm94U3BvcnRzMl9VWQ==" ||
    getURL == "RVNQTjQ=" ||
    getURL == "Rm94U3BvcnRzM19VWQ==" ||
    getURL == "RXZlbnRvc19IRF9VeQ=="
  )
    number = 7;
  else if (
    getURL == "RVNQTjJfQXJn" ||
    getURL == "Q2luZW1heA==" ||
    getURL == "RXZlbnRvc18yX0hE" ||
    getURL == "Q2FuYWxfOF9DQkE" ||
    getURL == "MjZfVFZfSEQ" ||
    getURL == "RGlwdXRhZG9zX1RW" ||
    getURL == "QXJnZW50aW5pc2ltYQ" ||
    getURL == "TWV0cm8" ||
    getURL == "QkJDX1dvcmxkX05ld3M" ||
    getURL == "VGhlYXRlcl9IRA==" ||
    getURL == "R2xpdHo=" ||
    getURL == "UXVpZXJvX0hE" ||
    getURL == "RGlzY292ZXJ5X1dvcmxkX0hE" ||
    getURL == "RXVyb2NoYW5uZWw=" ||
    getURL == "RGlzY292ZXJ5X1NjaWVuY2U=" ||
    getURL == "SU5DQUFfVHY=" ||
    getURL == "VFY1X01vbmRl" ||
    getURL == "TVRWX0hpdHM=" ||
    getURL == "TVRWX0hE" ||
    getURL == "Tmlja19Kcg==" ||
    getURL == "VFZfRXNwYW5h" ||
    getURL == "V09CSQ==" ||
    getURL == "Vm9sdmVy" ||
    getURL == "VGVsZXN1cg==" ||
    getURL == "TGlmZXRpbWU=" ||
    getURL == "QW50ZW5hXzM=" ||
    getURL == "Rm94X05ld3M=" ||
    getURL == "VHZfQ2hpbGU=" ||
    getURL == "TWFzX0NoaWM=" ||
    getURL == "U3R1ZGlvX1VuaXZlcnNhbA==" ||
    getURL == "SVNBVA==" ||
    getURL == "U3VuX0NoYW5uZWw=" ||
    getURL == "UkFJ" ||
    getURL == "VmVudXM=" ||
    getURL == "U2V4dHJlbWU" ||
    getURL == "UGxheWJveQ" ||
    getURL == "VE5UX1Nwb3J0c19IRA" ||
    getURL == "VGVsZWZlSEQ=" ||
    getURL == "Q2FuYWw3" ||
    getURL == "RW5jdWVudHJv" ||
    getURL == "VGVsZW1heA" ||
    getURL == "TmV0X1RW" ||
    getURL == "Q2FuYWxfMTJfQ0JB" ||
    getURL == "RWxfR2FyYWdl" ||
    getURL == "RmlsbV9BcnRz" ||
    getURL == "VW5pdmVyc2FsX0NoYW5uZWxfSEQ=" ||
    getURL == "RXVyb3BhX0V1cm9wYQ" ||
    getURL == "RXVyb25ld3M=" ||
    getURL == "Rm9vZF9OZXR3b3Jr" ||
    getURL == "RV9FbnRlcnRhaW5tZW50X1RlbGV2aXNpb24=" ||
    getURL == "Q00=" ||
    getURL == "UEFLQV9QQUtB" ||
    getURL == "SGlzdG9yeV8y" ||
    getURL == "U3lGeQ==" ||
    getURL == "VEJT" ||
    getURL == "VENN" ||
    getURL == "SEJPXzI=" ||
    getURL == "SEJPX1BsdXM=" ||
    getURL == "SEJPX0ZhbWlseQ==" ||
    getURL == "SEJPX0V4dHJlbWU=" ||
    getURL == "SEJPX011bmRp" ||
    getURL == "SEJPX1NpZ25hdHVyZQ==" ||
    getURL == "Q2FuYWxfUnVyYWw=" ||
    getURL == "VExD" ||
    getURL == "Q2FuYWxfZGVfbGFfY2l1ZGFk" ||
    getURL == "RGlzY292ZXJ5X0tpZHM=" ||
    getURL == "SFRW" ||
    getURL == "TkJBX1RW" ||
    getURL == "VW5pdmVyc2FsX0NpbmVtYQ==" ||
    getURL == "VW5pdmVyc2FsX0NvbWVkeQ==" ||
    getURL == "dW5pdmVyc2FsX0NyaW1l" ||
    getURL == "VW5pdmVyc2FsX1ByZW1pZXJl" ||
    getURL == "VW5pdmVyc2FsX1JlYWxpdHk=" ||
    getURL == "RXZlbnRvc18yX0hE" ||
    getURL == "Q2FuYWxfZGVfbGFzX2VzdHJlbGxhcw=="
  )
    number = 6;
  else if (getURL == "QzlOX0M0") number = 5;
  else if (
    getURL == "RGlzY292ZXJ5SG9tZUhlYWx0aEhE" ||
    getURL == "TmF0R2VvSEQ=" ||
    getURL == "VE5UX0hEX0FyZw==" ||
    getURL == "VE5UU2VyaWVz" ||
    getURL == "Q2FydG9vbk5ldHdvcms=" ||
    getURL == "Tmlja2Vsb2Rlb24=" ||
    getURL == "QWR1bHRfU3dpbQ==" ||
    getURL == "RXZlbnRvczFIRA"
  )
    number = 3;
  else if (
    getURL == "Q2FuYWxfNV9Sb3Nhcmlv" ||
    getURL == "VEVMRUZVVFVST19DNA==" ||
    getURL == "VGVsZWZlX05ldXF1ZW4=" ||
    getURL == "VGVsZWZlX1NhbHRh" ||
    getURL == "U05UX0M0" ||
    getURL == "UEFSQVZJU0lPTl9DNA==" ||
    getURL == "Tk9USUNJQVNfUFlfQzQ=" ||
    getURL == "Tk9USUNJQVNfUFlfQzQ=" ||
    getURL == "UEFSQVZJU0lPTl9DNA==" ||
    getURL == "TEFfVEVMRV9DNA==" ||
    getURL == "U1VSX1RWX0M0" ||
    getURL == "Q2FuYWwxMlVSVQ==" ||
    getURL == "RGlzY292ZXJ5SG9tZUhlYWx0aEhE" ||
    getURL == "Q2FuYWw0X1VSVQ==" ||
    getURL == "SEJPSEQ=" ||
    getURL == "Q2FuYWwxMF9VUlU=" ||
    getURL == "UlBDX0M0"
  )
    number = 4;
  else number = 3;
}
getChannelID();

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

// let mt = ["edge-live13-sl"]

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

async function getValidMpd() {
  let mt2;
  mt2 = [...mt];
  while (mt2.length > 0) {
    var random = Math.floor(Math.random() * mt2.length);
    var url =
      "https://" +
      mt2[random] +
      ".cvattv.com.ar/live/c" +
      number +
      "eds/" +
      atob(getURL) +
      "/SA_Live_dash_enc/" +
      atob(getURL) +
      ".mpd";
    try {
      let response = await fetch(url);
      if (response.ok) {
        console.log("Selected mt:", mt2[random]);
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
  alert("El canal no funciona en este momento.");
  throw new Error("No valid MPD URL found");
}

async function setupPlayer() {
  try {
    var mpd = await getValidMpd();

    jwplayer("player").setup({
      default: true,
      type: "dash",
      preload: "auto",
      file: mpd,
      drm: {
        clearkey: {
          keyId: channelList[0].keyId,
          key: channelList[0].key,
        },
      },
      width: "50%",
      aspectratio: "16:9",
      autostart: "true",
      cast: {},
      sharing: {},
      defaultBandwidthEstimate: 1,
    });

    if (getURL == "Rm94X1Nwb3J0c19QcmVtaXVuX0hE") {
      playerInstance.on("error", function () {
        var redirectUrl =
          "https://nebunexa.co/mpdk/?get=aHR0cHM6Ly9weWxvY2FsbGl2ZWNoYW5uZWxkYXNoLmxjZG4uY2xhcm90di5jb20ucHkvQ29udGVudC9EQVNIX0RBU0hfRksvTGl2ZS9jaGFubmVsKEZPWF9TUE9SVFNfUFJFTUlVTSkvbWFzdGVyLm1wZA==&key=Y2Y0Yzc4ZTIxZmUyMTlhZDRhYTU0MjlhZTkzZDQzYmU=&key2=MjZkYjM4YTk2OGExYjY1ZDcyNzBlZTkyNjMyYTdjZTE=";

        redirectUrl += "&start=true";

        window.location = redirectUrl;
      });
    } else if (getURL == "VE5UX1Nwb3J0c19IRA") {
      playerInstance.on("error", function () {
        var redirectUrl =
          "https://nebunexa.co/mpdk/?get=aHR0cHM6Ly9weWxvY2FsbGl2ZWNoYW5uZWxkYXNoLmxjZG4uY2xhcm90di5jb20ucHkvQ29udGVudC9EQVNIX0RBU0hfRksvTGl2ZS9jaGFubmVsKFROVF9TUE9SVFMpL21hc3Rlci5tcGQ=&key=NDVkYTFkZjZiN2RhYzZmNDZmMGM5NWI1ODUwYmMyZjI=&key2=YTE5NWRjMDIwNjAzNWIyY2M4YmUyZDQ1MmU3MWI2MWQ=";

        redirectUrl += "&start=true";

        window.location = redirectUrl;
      });
    }

    var selectedLanguage = 1;
    var selectedLanguage2 = 1;
    var languageChangedDuringPlay = false;

    playerInstance.on("play", function (e) {
      playerInstance.setCurrentAudioTrack(1);
      if (!languageChangedDuringPlay) {
        var currentLanguage = playerInstance.getCurrentAudioTrack();

        if (
          currentLanguage !== selectedLanguage &&
          currentLanguage !== selectedLanguage2
        ) {
          // playerInstance.setCurrentAudioTrack(selectedLanguage);
          languageChangedDuringPlay = true;
        }
      }
    });

    playerInstance.on("ready", () => {
      // Fix live tabindex
      const liveInterval = setInterval(() => {
        const live = document
          .querySelector("#player")
          .querySelector(".jw-text-live");
        if (live) {
          clearInterval(liveInterval);
          document
            .querySelector("#player")
            .querySelector(".jw-text-live")
            .setAttribute("tabindex", -1);
        }
      }, 500);
      // Desactiva interaccion con el reproductor
      document
        .querySelector("#player")
        .querySelectorAll("*:not(div.test)")
        .forEach((e) => e.setAttribute("tabindex", -1));
      document.querySelector("#player").setAttribute("tabindex", -1);

      // Desactiva keybinds, desmutea reproductor y pantalla completa
      localStorage.setItem("jwplayer.enableShortcuts", "false");
      playerInstance.setMute(0);
      playerInstance.setVolume(100);
      playerInstance.setFullscreen(true);

      // Crea contenedor de canales
      const midiv = document.createElement("div");
      midiv.classList = "test";
      player.prepend(midiv);
      document.querySelector(".test").addEventListener("click", changeChannel);

      // Crea pop-up seleccion numero de canal
      const midiv2 = document.createElement("div");
      const midiv2text = document.createElement("span");
      midiv2.classList = "channelNumber";
      midiv2.append(midiv2text);
      player.prepend(midiv2);

      // Crea todos los botones de los canales
      channelList.forEach((e, i) => {
        const btn = document.createElement("button");
        const cnImage = document.createElement("img");
        // cnImage.src = 'https://raw.githubusercontent.com/leancerioli/canales/refs/heads/main/canales/logos/' + (e.img || 'canal.webp')
        cnImage.src =
          "https://raw.githubusercontent.com/leancerioli/canales/refs/heads/main/canales/logos/canal.webp";
        const cnName = document.createElement("span");
        cnName.innerText = e.name || atob(e.getURL).replaceAll("_", " ");
        const cnNumber = document.createElement("span");
        cnNumber.innerText = i + 1;
        btn.appendChild(cnImage);
        btn.appendChild(cnName);
        btn.appendChild(cnNumber);
        btn.setAttribute("getURL", e.getURL);
        btn.setAttribute("tabindex", 0);
        document.querySelector(".test").appendChild(btn);
      });

      // Cambiar de canales con flechas (↑) (↓)
      const getChannelList = document.querySelector(".test");
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
          getChannelList.style.display = "none";
        } else if (e.key === "ArrowRight") {
          getChannelList.style.display = "block";
          enfocarElemento(indexActivo);
        }
      });
    });
  } catch (error) {
    console.error("ddFailed to setup player:", error);
    console.error("No se encontraron URLs válidas.");
  }
}
setupPlayer();

// W.I.P: Deteccion controles TV
let pressed = "";
let timer;
const runTimer = () => {
  timer = setTimeout(() => {
    indexActivo = Number(pressed) - 1;
    changeChannel(null, pressed);
    pressed = "";
    document.querySelector(".channelNumber").style.visibility = "hidden";
  }, 2000);
};
document.addEventListener("keypress", (e) => {
  // document.querySelector('.input').innerText = e.key
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
let debounceTimeout;
const debounceDelay = 100;
document.addEventListener("touchmove", (e) => {
  if (!e.target.className.match("jw-reset")) return;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    document.querySelector(".test").style.display =
      document.querySelector(".test").style.display == "none"
        ? "block"
        : "none";
  }, debounceDelay);

  document.querySelector(".input").innerText = "touch";
});

document.addEventListener("keydown", (e) => {
  document.querySelector(".input").innerText = e.key;
});
