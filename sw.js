// Service worker: полностью офлайн-доступ ко всему сайту.
// Список precache подставляется при сборке (scripts/build.mjs).
//
// Стратегии:
//  • Переходы между страницами (navigate) — сеть с коротким тайм-аутом, при
//    неудаче мгновенно из кэша. Так контент свежий при связи и не «висит» без неё.
//  • Статика (CSS/JS/иконки) — cache-first: она версионируется (?v=<buildId>),
//    поэтому из кэша всегда свежая, а грузится мгновенно.
var CACHE = 'kodeksdetstva-' + '1789315856452'
var PRECACHE = ["/","/pomoshch/","/tebe/","/kontakty/","/o-proekte/","/politika/","/poisk/","/moe/","/regiony/","/regiony/moskva/","/regiony/moskovskaya-oblast/","/regiony/sankt-peterburg/","/regiony/novosibirsk/","/regiony/ekaterinburg/","/regiony/kazan/","/regiony/nizhniy-novgorod/","/regiony/chelyabinsk/","/regiony/krasnoyarsk/","/regiony/samara/","/regiony/ufa/","/regiony/rostov-na-donu/","/regiony/krasnodar/","/regiony/omsk/","/regiony/voronezh/","/regiony/perm/","/regiony/volgograd/","/regiony/vladivostok/","/regiony/khabarovsk/","/regiony/irkutsk/","/regiony/saratov/","/regiony/stavropol/","/regiony/buryatiya/","/regiony/altay/","/regiony/dagestan/","/regiony/ingushetiya/","/regiony/kabardino-balkariya/","/regiony/kalmykiya/","/regiony/karachaevo-cherkesiya/","/regiony/kareliya/","/regiony/komi/","/regiony/mariy-el/","/regiony/mordoviya/","/regiony/yakutiya/","/regiony/severnaya-osetiya/","/regiony/tyva/","/regiony/udmurtiya/","/regiony/khakasiya/","/regiony/chechnya/","/regiony/chuvashiya/","/regiony/altayskiy-kray/","/regiony/blagoveshchensk/","/regiony/arkhangelsk/","/regiony/astrakhan/","/regiony/belgorod/","/regiony/bryansk/","/regiony/vladimir/","/regiony/vologda/","/regiony/ivanovo/","/regiony/kaliningrad/","/regiony/kaluga/","/regiony/kamchatka/","/regiony/kemerovo/","/regiony/kirov/","/regiony/kostroma/","/regiony/kurgan/","/regiony/kursk/","/regiony/leningradskaya-oblast/","/regiony/lipetsk/","/regiony/magadan/","/regiony/murmansk/","/regiony/novgorod/","/regiony/orenburg/","/regiony/orel/","/regiony/penza/","/regiony/pskov/","/regiony/ryazan/","/regiony/yuzhno-sakhalinsk/","/regiony/smolensk/","/regiony/tambov/","/regiony/tver/","/regiony/tomsk/","/regiony/tula/","/regiony/tyumen/","/regiony/ulyanovsk/","/regiony/chita/","/regiony/yaroslavl/","/regiony/birobidzhan/","/regiony/naryan-mar/","/regiony/khanty-mansiysk/","/regiony/anadyr/","/regiony/salekhard/","/regiony/adygeya/","/vse-temy/","/novosti/","/novosti/2026-06-23-ipotechnye-kanikuly-dlya-semey-s-detmi-prodlili-do-polutora-/","/psihika/","/radost-detstva/","/bezopasnost/","/semya/","/semeynye-dela/","/travlya/","/cifra/","/podrostok-i-zakon/","/razvod/","/zdorovie/","/prava-shkola/","/sirotstvo/","/pervaya-lyubov/","/lichnost/","/vospitanie/","/lichnost/mnenie-rebenka/","/lichnost/granitsy-telo-privatnost/","/lichnost/pravo-na-chuvstva/","/lichnost/sravnenie-i-publichnyy-styd/","/lichnost/slezhka-i-kontrol/","/lichnost/chto-takoe-dusha/","/lichnost/religiya-i-prinuzhdenie/","/lichnost/rebenok-kak-proekt-roditelya/","/lichnost/ispoved-i-svyashchennik/","/lichnost/vybor-professii/","/lichnost/kodeks-detstva-iniciativa/","/lichnost/vneshnost-pirsing-tatu-plastika/","/radost-detstva/zhivotnye-i-rebenok/","/radost-detstva/priroda-i-aktivnyy-otdyh/","/radost-detstva/muzyka-tvorchestvo-emocii/","/radost-detstva/svobodnaya-igra/","/radost-detstva/chtenie-i-voobrazhenie/","/radost-detstva/semeynye-ritualy-i-tradicii/","/radost-detstva/mnogoyazychie-i-rechevoe-razvitie/","/radost-detstva/dobrota-i-empatiya/","/radost-detstva/mechty-i-celi-rebenka/","/radost-detstva/blagodarnost-i-radost-melocham/","/semya/fizicheskie-nakazaniya/","/semya/emotsionalnoe-nasilie-krik/","/semya/kak-ostanovit-sebya/","/semya/prenebrezhenie-neglect/","/semya/nasilie-mezhdu-roditelyami/","/semya/zavisimosti-roditeley/","/semya/giperopeka/","/semya/kontaktnoe-nasilie-svoi/","/semya/rebenku-doma-nebezopasno/","/semya/kak-vybratsya-iz-tyazheloy-semyi/","/semya/izyatie-rebenka-iz-semyi/","/semeynye-dela/materinskiy-kapital/","/semeynye-dela/rebenok-poteryal-roditelya/","/semeynye-dela/semya-v-nuzhde-mery-podderzhki/","/semeynye-dela/vyplaty-pri-rozhdenii-rebenka/","/semeynye-dela/mnogodetnaya-semya/","/semeynye-dela/imushchestvo-i-nasledstvo-rebenka/","/semeynye-dela/propiska-registraciya-rebenka/","/semeynye-dela/dokumenty-rebenka/","/semeynye-dela/roditel-v-sizo-ili-kolonii/","/semeynye-dela/rebenok-zhivet-u-rodstvennikov/","/semeynye-dela/brak-s-inostrancem-rebenok/","/semeynye-dela/deti-rossiyan-za-granicey/","/sirotstvo/priyomnyy-rebenok-adaptaciya/","/sirotstvo/rebenok-v-detskom-dome-prava/","/sirotstvo/vypusknik-detskogo-doma/","/sirotstvo/otkaz-ot-rebenka-i-podkidyshi/","/sirotstvo/poisk-biologicheskih-roditeley/","/sirotstvo/kak-usynovit-rebenka/","/sirotstvo/vozvrat-priyomnogo-rebenka/","/sirotstvo/nedobrosovestnoe-usynovlenie-i-moshenniki/","/sirotstvo/travma-deprivacii/","/razvod/razvod-bez-travmy-rebenka/","/razvod/roditelskoe-pohishchenie/","/razvod/rebenok-instrument-v-razvode/","/razvod/otchuzhdenie-roditelya/","/razvod/mesto-zhitelstva-i-obshchenie/","/razvod/alimenty-na-rebenka/","/razvod/alimenty-s-roditelya-za-granicey/","/razvod/alimenty-platit-ili-net/","/razvod/razvod-poshagovo-s-detmi/","/razvod/smena-imeni-ili-familii-rebenka/","/bezopasnost/pohishchenie-uroki-rebenku/","/bezopasnost/rebenok-poteryalsya/","/bezopasnost/smertelnye-chellendzhi/","/bezopasnost/opasnye-subkultury/","/bezopasnost/doroga-i-sim/","/bezopasnost/bytovaya-gibel-doma/","/bezopasnost/nasilie-v-lageryah/","/bezopasnost/vyezd-za-granicu/","/bezopasnost/travma-rebenka/","/bezopasnost/sekty-i-kulty/","/bezopasnost/torgovlya-lyudmi-ekspluataciya/","/bezopasnost/nasilie-nyanya-repetitor-trener/","/bezopasnost/detskiy-otdyh-i-besplatnye-putyovki/","/bezopasnost/sobaka-pokusala-rebenka/","/bezopasnost/rebenok-i-transport-prava/","/bezopasnost/legkie-dengi-vebkam-eskort-onlyfans/","/bezopasnost/narkozavisimost-podrostka-pomoshch/","/bezopasnost/bezopasnost-detskih-tovarov/","/cifra/gruming-onlayn/","/cifra/sextortion/","/cifra/verbovka-legkie-dengi/","/cifra/destruktivnye-soobshchestva/","/cifra/finansovye-lovushki/","/cifra/zavisimost-vnimanie/","/cifra/privatnost-cifrovoy-sled/","/cifra/ii-deepfake/","/cifra/zavisimost-ot-gadzhetov-i-igr/","/cifra/chto-v-telefone-u-podrostka/","/travlya/travlya-rebenok-molchit/","/travlya/travlya-algoritm-shkola/","/travlya/kiberbulling/","/travlya/travlya-uchitel/","/travlya/tvoy-rebenok-agressor/","/prava-shkola/pobory-v-shkole/","/prava-shkola/personalnye-dannye-shkola/","/prava-shkola/dosmotr-i-telefony/","/prava-shkola/ekzameny-oge-ege/","/prava-shkola/ovz-inklyuziya/","/prava-shkola/prinuzhdenie-k-vneurochke/","/prava-shkola/deti-migrantov-shkola/","/prava-shkola/semeynoe-obrazovanie/","/prava-shkola/detskiy-sad-kak-popast/","/podrostok-i-zakon/dopros-nesovershennoletnego/","/podrostok-i-zakon/risk-i-otnoshenie-k-zhizni/","/podrostok-i-zakon/zakladki-veshchestva/","/podrostok-i-zakon/uchet-kdn/","/podrostok-i-zakon/komendantskiy-chas/","/podrostok-i-zakon/zaderzhanie-dosmotr/","/podrostok-i-zakon/uhod-iz-doma/","/podrostok-i-zakon/prizyv-i-voenkomat/","/podrostok-i-zakon/ugolovnaya-otvetstvennost-podrostka/","/podrostok-i-zakon/vred-prichinennyy-nesovershennoletnim/","/podrostok-i-zakon/podrostok-i-rabota/","/podrostok-i-zakon/rebenok-svidetel-ili-poterpevshiy/","/vospitanie/pochemu-tyanet-na-zapretnoe/","/vospitanie/alkogol-i-kompanii/","/vospitanie/pozdno-domoy-i-trevoga-roditelya/","/vospitanie/karmannye-dengi/","/vospitanie/zavisimost-ot-igr-i-stavok/","/vospitanie/uspeh-schaste-i-dengi/","/vospitanie/besplatnye-kruzhki-i-razvitie/","/vospitanie/rebenok-i-sport/","/vospitanie/separaciya-vzrosleyushchego-rebenka/","/vospitanie/kak-govorit-s-rebenkom/","/vospitanie/rebenok-vryot-i-voruet/","/vospitanie/detskie-isteriki-i-neposlushanie/","/psihika/suicidalnye-signaly/","/psihika/selfharm/","/psihika/depressiya-podrostka/","/psihika/rpp/","/psihika/skulshuting-signaly/","/psihika/gore-i-poterya/","/psihika/odinochestvo/","/psihika/mest-i-obida/","/psihika/shkolnyy-stress/","/psihika/strahi-i-trevozhnost/","/psihika/podrostok-nichego-ne-hochet/","/zdorovie/informirovannoe-soglasie/","/zdorovie/otkaz-ot-privivok/","/zdorovie/davlenie-privivkami-v-shkole/","/zdorovie/veypy-nikotin/","/zdorovie/podrostkovaya-kontratseptsiya/","/zdorovie/rannyaya-beremennost/","/zdorovie/son-podrostka/","/zdorovie/psihiatriya-mify/","/zdorovie/obezbolivanie/","/zdorovie/telo-ves-vneshnost/","/zdorovie/dispanserizaciya-shkolnika/","/zdorovie/rebenok-boleet-prava/","/zdorovie/besplatnaya-medicina-detyam/","/zdorovie/privivki-kalendar-i-vybor/","/zdorovie/rebenok-s-invalidnostyu/","/zdorovie/vrachebnaya-oshibka-i-zhaloby/","/zdorovie/prikreplenie-k-poliklinike/","/zdorovie/stomatologiya-rebenku-po-oms/","/pervaya-lyubov/pervaya-lyubov-otverzhenie/","/pervaya-lyubov/toksichnye-otnosheniya/","/pervaya-lyubov/rannie-otnosheniya-i-zakon/","/assets/styles.css?v=1789315856452","/assets/search.js?v=1789315856452","/assets/nav.js?v=1789315856452","/assets/tg.js?v=1789315856452","/assets/fonts/golos-cyrillic.woff2","/assets/fonts/golos-latin.woff2","/search-index.json","/regions.json","/favicon.svg","/favicon.ico","/manifest.webmanifest","/404.html"] []
var NET_TIMEOUT = 3000

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // cache: 'reload' — мимо HTTP-кэша браузера, чтобы не закешировать старое
      return Promise.all(
        PRECACHE.map(function (u) {
          return fetch(new Request(u, { cache: 'reload' }))
            .then(function (r) { if (r && r.ok) return c.put(u, r) })
            .catch(function () {})
        }),
      )
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE }).map(function (k) { return caches.delete(k) }),
      )
    }),
  )
  self.clients.claim()
})

// ВАЖНО: везде ниже matching идёт через caches.open(CACHE).then(c => c.match(...)),
// а не через голый caches.match(...). caches.match() (без открытия конкретного
// кэша) ищет по ВСЕМ версиям кэша этого источника и может отдать запись из
// кэша прошлого деплоя, если activate ещё не успел его подчистить — то есть
// «залипшие» старые данные (например, устаревший regions.json или список тем
// в поиске) после деплоя могли показываться, пока пользователь не нажмёт
// «Обновить» вручную. Открытие именно текущего CACHE это исключает: если
// записи там нет — сразу идём в сеть, а не в чужую версию кэша.
function putInCache(req, res) {
  if (res && res.ok && res.type === 'basic') {
    var copy = res.clone()
    caches.open(CACHE).then(function (c) { c.put(req, copy) })
  }
  return res
}

function matchCurrent(req, opts) {
  return caches.open(CACHE).then(function (c) { return c.match(req, opts) })
}

// Файлы данных: даже при cache-first для статики их лучше обновлять «сетью
// вперёд», как переходы между страницами — от них зависит актуальность
// контента (регионы, поисковый индекс), а не только скорость отрисовки.
var NETWORK_FIRST_PATHS = ['/regions.json', '/search-index.json']

self.addEventListener('fetch', function (e) {
  var req = e.request
  if (req.method !== 'GET') return
  var url = new URL(req.url)
  if (url.origin !== location.origin) return

  var networkFirst = req.mode === 'navigate' || NETWORK_FIRST_PATHS.indexOf(url.pathname) !== -1

  // ── Переходы и файлы данных: сеть с тайм-аутом, при неудаче — кэш текущей версии ──
  if (networkFirst) {
    var isNavigate = req.mode === 'navigate'
    e.respondWith(
      new Promise(function (resolve) {
        var done = false
        var timer = setTimeout(function () {
          if (done) return
          done = true
          matchCurrent(req, { ignoreSearch: true }).then(function (c) {
            if (c) return resolve(c)
            if (isNavigate) {
              matchCurrent('/').then(function (h) { resolve(h || matchCurrent('/404.html')) })
            } else {
              resolve(new Response('', { status: 504, statusText: 'offline' }))
            }
          })
        }, NET_TIMEOUT)

        fetch(req)
          .then(function (res) {
            if (done) { putInCache(req, res); return }
            done = true
            clearTimeout(timer)
            putInCache(req, res.clone())
            resolve(res)
          })
          .catch(function () {
            if (done) return
            done = true
            clearTimeout(timer)
            matchCurrent(req, { ignoreSearch: true }).then(function (c) {
              if (c) return resolve(c)
              if (isNavigate) {
                matchCurrent('/').then(function (h) { resolve(h || matchCurrent('/404.html')) })
              } else {
                resolve(new Response('', { status: 504, statusText: 'offline' }))
              }
            })
          })
      }),
    )
    return
  }

  // ── Статика (CSS/JS/иконки, версионированы ?v=<buildId>): cache-first ──
  e.respondWith(
    matchCurrent(req).then(function (cached) {
      if (cached) return cached
      return fetch(req)
        .then(function (res) { return putInCache(req, res) })
        .catch(function () { return new Response('', { status: 504, statusText: 'offline' }) })
    }),
  )
})
