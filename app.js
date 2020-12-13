let mineralCount = 0;
let gasCount = 0;
let supplyCount = 1;
let totalSupply = 0;

let droneCount = 0;

let clickMineralAddModifier = 0;
let clickMineralMultiplyModifier = 1;

let clickGasAddModifier = 0;
let clickGasMultiplyModifier = 1;

let automaticMineralAddModifier = 0;
let automaticMineralMultiplyModifier = 1;

let automaticGasAddModifier = 0;
let automaticGasMultiplyModifier = 1;

let miningSoundCheck = true;
let endgame = false;

let clearedToNuke = false;

var moreMinerals = new Audio("resources/sound/moreMineralsSound.wav");
var moreGas = new Audio("resources/sound/moreGasSound.wav");
var moreOverlords = new Audio("resources/sound/moreOverlordsSound.wav");
var droneSounds = ['droneSound1', 'droneSound2', 'droneSound3', 'droneSound4', 'droneSound5'];
var zerglingSounds = ['zerglingSound1', 'zerglingSound2', 'zerglingSound3', 'zerglingSound4'];
var hydraliskSounds = ['hydraliskSound1', 'hydraliskSound2', 'hydraliskSound3', 'hydraliskSound4'];
var overlordSounds = ['overlordSound1', 'overlordSound2', 'overlordSound3', 'overlordSound4'];

var eventList = ['Ghost']; // 'Siege Tank'

var secondsToUse = 0;
var minutesToUse = 0;
var canClick = true;
var unauthorizedPlay = true;

let commandCenter = {
  currentHealth: 200000,
  totalHealth: 200000
}

let clickUpgrades = {
  moreDrones: {
    mineralPrice: 20,
    gasPrice: 0,
    quantity: 0,
    multiplier: 1
  }
}

let automaticUpgrades = {
  moreDrones: {
    mineralPrice: 100,
    gasPrice: 0,
    quantity: 0,
    multiplier: 1
  }
}

let fighters = {
  zergling: {
    mineralPrice: 50,
    gasPrice: 0,
    quantity: 0,
    damage: 7,
    multiplier: 1
  },
  hydralisk: {
    mineralPrice: 75,
    gasPrice: 25,
    quantity: 0,
    damage: 30,
    multiplier: 1
  }
}

let overlords = {
  mineralPrice: 200,
  gasPrice: 0,
  quantity: 1,
  supply: 8
}

let startMusic = true;

function mineMineralsClick()
{
  if (startMusic)
  {
    playMusic();
  }
  if(canClick)
  {
    mineralCount = mineralCount + Math.round((clickUpgrades.moreDrones.quantity + 1) * clickMineralMultiplyModifier);
    if (miningSoundCheck)
    {
      var audio = new Audio("resources/sound/droneMineSound.wav");
      audio.play();
      miningSoundCheck = false;
      setTimeout(() => {
        miningSoundCheck = true;
      }, 5000);
    }
    updateCountsImmediate();
    canClick = false;
    setTimeout(() => {
      canClick = true;
    }, 2);
  }
  else
  {
    var unauthorized = new Audio("resources/sound/unauthorizedSound.wav");
    if(unauthorizedPlay)
    {
      unauthorized.play();
      unauthorizedPlay = false;
      setTimeout(() => {
        unauthorizedPlay = true;
      }, 2);
    }
  }
}

function mineGasClick()
{
  if(canClick)
  {
    gasCount = gasCount + Math.round((clickUpgrades.moreDrones.quantity + 1) * clickGasMultiplyModifier);
    if (miningSoundCheck)
    {
      var audio = new Audio("resources/sound/droneMineSound.wav");
      audio.play();
      miningSoundCheck = false;
      setTimeout(() => {
        miningSoundCheck = true;
      }, 5000);
    }
    updateCountsImmediate();
    canClick = false;
    setTimeout(() => {
      canClick = true;
    }, 2);
  }
  else
  {
    var unauthorized = new Audio("resources/sound/unauthorizedSound.wav");
    if(unauthorizedPlay)
    {
      unauthorized.play();
      unauthorizedPlay = false;
      setTimeout(() => {
        unauthorizedPlay = true;
      }, 2);
    }
  }
}

function buyClickDrone()
{
  
  if (mineralCount < clickUpgrades.moreDrones.mineralPrice)
  {
    moreMinerals.play();
  }
  else
  {
    if (supplyCount === totalSupply)
    {
      moreOverlords.play();
    }
    else
    {
      mineralCount = mineralCount - clickUpgrades.moreDrones.mineralPrice;
      clickUpgrades.moreDrones.quantity++;
      clickUpgrades.moreDrones.mineralPrice+= 20;
      var sound = droneSounds[Math.floor(Math.random() * droneSounds.length)];
      var audio = new Audio("resources/sound/"+ sound +".wav");
      audio.play();
      document.getElementById("droneClick").innerText = clickUpgrades.moreDrones.quantity;
      document.getElementById("clickDroneMineral").innerText = clickUpgrades.moreDrones.mineralPrice;
      document.getElementById("clickDroneGas").innerText = clickUpgrades.moreDrones.gasPrice;
      updateCountsImmediate();
    }
  }
}

function buyOverlord()
{
  
  if (mineralCount < overlords.mineralPrice)
  {
    moreMinerals.play();
  }
  else
  {
    mineralCount = mineralCount - overlords.mineralPrice;
    overlords.quantity++;
    overlords.mineralPrice+= 200;
    totalSupply = overlords.quantity * overlords.supply;
    var sound = overlordSounds[Math.floor(Math.random() * overlordSounds.length)];
    var audio = new Audio("resources/sound/"+ sound +".wav");
    audio.play();
    document.getElementById("overlord").innerText = overlords.quantity;
    document.getElementById("overlordMineral").innerText = overlords.mineralPrice;
    document.getElementById("overlordGas").innerText = overlords.gasPrice;
    updateCountsImmediate();
  }
}

function buyAutomaticDrone()
{
  if (mineralCount < automaticUpgrades.moreDrones.mineralPrice)
  {
    moreMinerals.play();
  }
  else
  {
    if (supplyCount === totalSupply)
    {
      moreOverlords.play();
    }
    else
    {
      mineralCount = mineralCount - automaticUpgrades.moreDrones.mineralPrice;
      automaticUpgrades.moreDrones.quantity++;
      automaticUpgrades.moreDrones.mineralPrice += 100;
      var sound = droneSounds[Math.floor(Math.random() * droneSounds.length)];
      var audio = new Audio("resources/sound/"+ sound +".wav");
      audio.play();
      document.getElementById("droneAuto").innerText = automaticUpgrades.moreDrones.quantity;
      document.getElementById("autoDroneMineral").innerText = automaticUpgrades.moreDrones.mineralPrice;
      document.getElementById("autoDroneGas").innerText = automaticUpgrades.moreDrones.gasPrice;
      updateCountsImmediate();
    }
  }
}

function buyZergling()
{
  
  if (mineralCount < fighters.zergling.mineralPrice)
  {
    moreMinerals.play();
  }
  else
  {
    if (supplyCount === totalSupply)
    {
      moreOverlords.play();
    }
    else
    {
      mineralCount = mineralCount - fighters.zergling.mineralPrice;
      fighters.zergling.quantity++;
      fighters.zergling.mineralPrice+= 20;
      var sound = zerglingSounds[Math.floor(Math.random() * zerglingSounds.length)];
      var audio = new Audio("resources/sound/"+ sound +".wav");
      audio.play();
      document.getElementById("zergling").innerText = fighters.zergling.quantity;
      document.getElementById("zerglingMineral").innerText = fighters.zergling.mineralPrice;
      document.getElementById("zerglingGas").innerText = fighters.zergling.gasPrice;
      updateCountsImmediate();
    }
  }
}

function buyHydralisk()
{
  
  if (mineralCount < fighters.hydralisk.mineralPrice)
  {
    moreMinerals.play();
  }
  else
  {
    if (gasCount < fighters.hydralisk.gasPrice)
    {
      moreGas.play();
    }
    else
    {
      if (supplyCount === totalSupply)
      {
        moreOverlords.play();
      }
      else
      {
        mineralCount = mineralCount - fighters.hydralisk.mineralPrice;
        gasCount = gasCount - fighters.hydralisk.gasPrice;
        fighters.hydralisk.quantity++;
        fighters.hydralisk.mineralPrice+= 75;
        fighters.hydralisk.gasPrice+= 25;
        var sound = hydraliskSounds[Math.floor(Math.random() * hydraliskSounds.length)];
        var audio = new Audio("resources/sound/"+ sound +".wav");
        audio.play();
        document.getElementById("hydralisk").innerText = fighters.hydralisk.quantity;
        document.getElementById("hydraliskMineral").innerText = fighters.hydralisk.mineralPrice;
        document.getElementById("hydraliskGas").innerText = fighters.hydralisk.gasPrice;
        updateCountsImmediate();
      }
    }  
  }
}

function addCard(unit)
{
  let imageToUse = "";
  let cardName = "";
  let description = "";
  let mineralCost = 0;
  let gasCost = 0;
  let count = 0;
  let countID = unit;
  let buyFunction = "";
  let mineralCostID = "";
  let gasCostID = "";

  switch (unit)
  {
    case "droneClick":
      imageToUse = "resources/images/droneAnimated.gif";
      cardName = "Drone (Manual)"
      description = "Used to harvest resources by clicking";
      mineralCost = clickUpgrades.moreDrones.mineralPrice;
      gasCount = clickUpgrades.moreDrones.gasPrice;
      count = clickUpgrades.moreDrones.quantity;
      mineralCostID = "clickDroneMineral";
      gasCostID = "clickDroneGas";
      buyFunction = "buyClickDrone()";
      break;
    case "droneAuto":
      imageToUse = "resources/images/droneAnimated.gif";
      cardName = "Drone (Automatic)"
      description = "Used to harvest resources automatically";
      mineralCost = automaticUpgrades.moreDrones.mineralPrice;
      gasCount = automaticUpgrades.moreDrones.gasPrice;
      count = automaticUpgrades.moreDrones.quantity;
      buyFunction = "buyAutomaticDrone()";
      mineralCostID = "autoDroneMineral";
      gasCostID = "autoDroneGas";
      break;
    case "zergling":
      imageToUse = "resources/images/zerglingAnimated.gif";
      cardName = "Zergling"
      description = "Agile melee attack unit";
      mineralCost = fighters.zergling.mineralPrice;
      gasCount = fighters.zergling.gasPrice;
      count = fighters.zergling.quantity;
      buyFunction = "buyZergling()";
      mineralCostID = "zerglingMineral";
      gasCostID = "zerglingGas";
      break;
    case "hydralisk":
      imageToUse = "resources/images/hydraAnimated.gif";
      cardName = "Hydralisk"
      description = "Ranged attack unit";
      mineralCost = fighters.hydralisk.mineralPrice;
      gasCost = fighters.hydralisk.gasPrice;
      count = fighters.hydralisk.quantity;
      buyFunction = "buyHydralisk()";
      mineralCostID = "hydraliskMineral";
      gasCostID = "hydraliskGas";
      break;
    case "overlord":
      imageToUse = "resources/images/overlordAnimated.gif";
      cardName = "Overlord"
      description = "Overseer, provides supply";
      mineralCost = overlords.mineralPrice;
      gasCount = overlords.gasPrice;
      count = overlords.quantity;
      buyFunction = "buyOverlord()";
      mineralCostID = "overlordMineral";
      gasCostID = "overlordGas";
      break;
    default:
      break;
  }
  if (imageToUse !== "")
  {
    let container = document.getElementById("buyUnits");
    let content = `
         <div class="col-md-2 shadow p-3 mb-5 bg-black rounded ">
          <div class="text-center">
          <img src="${imageToUse}" class="img-fluid" alt="icon">
          <h4>${cardName}</h4>
          </div>
          <h6>Mineral Cost: <span id="${mineralCostID}">${mineralCost}</span> <h6>
          <h6>Gas Cost: <span id="${gasCostID}">${gasCost}</span> <h6>
          <h6>${description}</h6>
          <h6>Count: <span id="${countID}">${count}</span></h6>
          <div class="text-center"><button class="myButton" onclick="${buyFunction}">Buy</button><div>
      `;
  
    // Append newyly created card element to the container
    container.innerHTML += content;
  }
}

function updateCommandCenter()
{
  let container = document.getElementById("commandCenter");
  var delta = Date.now() - startTime;
  var seconds = Math.floor(delta / 1000);


  imageToUse = "resources/images/commandCenter.png";

  let zerglingDamage = (fighters.zergling.damage * fighters.zergling.quantity) * fighters.zergling.multiplier;
  let hydraliskDamage = (fighters.hydralisk.damage * fighters.hydralisk.quantity) * fighters.hydralisk.multiplier;
  commandCenter.currentHealth = commandCenter.currentHealth - zerglingDamage - hydraliskDamage;

  let percentHealth = Math.round((commandCenter.currentHealth / commandCenter.totalHealth) * 100);

    if (percentHealth > 100)
    {
      percentHealth = 100;
    }
    if (percentHealth <= 0 && !endgame)
    {
      percentHealth = 0;
      endgame = true;
      secondsToUse = seconds % 60;
      minutesToUse = Math.floor((seconds - secondsToUse) / 60);
      window.localStorage.clear();
    }


    let content = `
    <div class="col-md-12 shadow p-3 mb-5 bg-black rounded ">
    <div class="text-center">
    <img src="${imageToUse}" class="img-fluid" alt="cmd">
    <h4>Terran Command Center</h4>
    </div>
    <h6>Destroy this to win!</h6>
    <h6>Zergling damage/interval: <span id="zerglingDamage">${zerglingDamage}</span> <h6>
    <h6>Hydralisk damage/interval: <span id="hydraliskDamage">${hydraliskDamage}</span> <h6>
    <div class="healthBar">
                  <div class="healthPercent" style="width: ${percentHealth}%">
                  </div>
                </div>
      `;
  
    if(endgame)
    {
    content = `
    <div class="col-md-12 shadow p-3 mb-5 bg-black rounded ">
    <div class="text-center">
    <img src="${imageToUse}" class="img-fluid" alt="cmd">
    <h4>Terran Command Center</h4>
    </div>
    <h6>The Terran base has been destroyed! FOR THE SWARM!</h6>
    <h6>Time elapsed: ${minutesToUse} minutes and ${secondsToUse} seconds. </h6>
      `;
    }
    container.innerHTML = content;
}

function updateCounts()
{
  mineralCount = mineralCount + Math.round(((automaticUpgrades.moreDrones.quantity) * automaticMineralMultiplyModifier));
  gasCount = gasCount + Math.round(((automaticUpgrades.moreDrones.quantity) * automaticGasMultiplyModifier));
  supplyCount = clickUpgrades.moreDrones.quantity + automaticUpgrades.moreDrones.quantity + fighters.zergling.quantity + fighters.hydralisk.quantity + 1;
  totalSupply = overlords.quantity * overlords.supply;
  let supply = `${supplyCount}/${totalSupply}`;

  let timerBar = document.getElementById("timerBar");
  if(timerBar)
  {
    let percentTime = Math.round(((15000 - (Date.now() - eventCountdownTimer)) / 15000) * 100);

    if (percentTime > 100)
    {
      percentTime = 100;
    }
    if (percentTime <= 0)
    {
      percentTime = 0;
    }


    let content = `<div class="timerPercent" style="width: ${percentTime}%">
    </div>`;
    timerBar.innerHTML = content;
  }
  document.getElementById("mineralCount").innerText = mineralCount.toString();
  document.getElementById("gasCount").innerText = gasCount.toString();
  document.getElementById("supplyCount").innerText = supply;
  updateCommandCenter();
  checkForNewCards();
  checkForNewEvent();
  setTimeout(() => {
    updateCounts();
  }, 500);
}

function updateCountsImmediate()
{
  supplyCount = clickUpgrades.moreDrones.quantity + automaticUpgrades.moreDrones.quantity + fighters.zergling.quantity + fighters.hydralisk.quantity + 1;
  let supply = `${supplyCount}/${totalSupply}`;
  document.getElementById("mineralCount").innerText = mineralCount.toString();
  document.getElementById("gasCount").innerText = gasCount.toString();
  document.getElementById("supplyCount").innerText = supply;
  checkForNewCards();
}

function playMusic()
{
  var audio = new Audio("resources/sound/zergTwoMusic.wav");
  audio.volume = 0.6;
  audio.play();
  startMusic = false;
  setTimeout(() => {
    playMusic();
  }, 300005);
}

function checkForNewCards()
{
  if (!document.getElementById("zergling") && mineralCount > 300)
  {
    addCard("zergling")
  }
  if (!document.getElementById("hydralisk") && mineralCount > 500)
  {
    addCard("hydralisk")
  }
}

function checkForNewEvent()
{
  if (eventTimer <= Date.now() - 60000)
  {
    if (Math.floor(Math.random() * Math.floor(10)) === 9)
    {
      eventTimer = Date.now();
      var event = eventList[Math.floor(Math.random() * eventList.length)];
      let container = document.getElementById("eventArea");
      let imageToUse = "";
      let cardName = "";
      let description = "";
      let soundFile = "";
      let percentTime = 100;

      var content = ``;
      switch (event)
      {
        case "Ghost":
          imageToUse = "resources/images/ghost.png";
          cardName = "Nuclear Missile";
          description = "Nuclear launch detected! Find and click the invisible ghost on the screen quickly to stop it! Your mouse will crosshair over it.";
          soundFile = "resources/sound/nukeSound.wav";
          deployGhost();
          break;
        case "Siege Tank":
          imageToUse = "resources/images/siegeMode.png";
          cardName = "Siege Tank";
          description = "They're sieging the high ground! Burrow your drones before it attacks.";
          soundFile = "resources/sound/siegeDeploySound.wav";
          break;
        default:
          break;
      }

      content = `
      <div class="col-md-6 shadow p-3 mb-5 bg-black rounded ">
        <div class="text-center">
        <img src="${imageToUse}" class="img-fluid" alt="eventImg">
        <h4>${cardName}</h4>
        </div>
            <h6>${description}</h6>
            <div id="timerBar" class="timerBar">
                  <div class="timerPercent" id="timerPercent" style="width: ${percentTime}%">
                  </div>
                </div>
        </div>

        `;

      container.innerHTML = content;
      var audio = new Audio(soundFile);
      audio.play();
    }
  }
}

function deployGhost()
{
  var x = Math.floor(Math.random() * 90); 
  var y = Math.floor(Math.random() * 90) 
  var el = document.createElement("div");

  el.style.position = "absolute"; 
  el.style.left = x + 'vw'; 
  el.style.top = y + 'vh'; 
  el.style.width = "250px";
  el.style.height = "250px";
  el.style.cursor = "crosshair";
  el.style.caretColor = "red";
  el.id = "nukeGhost";
  el.onclick = removeGhost;
  clearedToNuke = true;
  eventCountdownTimer = Date.now();
  setTimeout(() => {
    if (clearedToNuke)
    {
      nuke();
    }
  }, 15000);

  document.getElementById("main").appendChild(el);

}

function removeGhost()
{
  clearedToNuke = false;
  var audio = new Audio("resources/sound/ghostDeath.wav");
  audio.play();
  document.getElementById("nukeGhost").remove();
  resetEvent();
}

function nuke()
{
  var audio = new Audio("resources/sound/zerglingDeath.wav");
  audio.play();
  clickUpgrades.moreDrones.quantity = Math.floor(clickUpgrades.moreDrones.quantity * 0.5);
  automaticUpgrades.moreDrones.quantity = Math.floor(automaticUpgrades.moreDrones.quantity * 0.5);
  fighters.zergling.quantity = Math.floor(fighters.zergling.quantity * 0.5);
  fighters.hydralisk.quantity = Math.floor(fighters.hydralisk.quantity * 0.5);
  document.getElementById("nukeGhost").remove();
  resetEvent();
  document.getElementById("droneClick").innerText = clickUpgrades.moreDrones.quantity;
  document.getElementById("droneAuto").innerText = automaticUpgrades.moreDrones.quantity;
  document.getElementById("zergling").innerText = fighters.zergling.quantity;
  document.getElementById("hydralisk").innerText = fighters.hydralisk.quantity;
}

function resetEvent()
{
  var container = document.getElementById("eventArea");
  var content =  `
  <div class="col-md-6 shadow p-3 mb-5 bg-black rounded ">
        <div class="text-center">
        <h4>Event</h4>
        </div>
        <h6>No event currently. Time to macro up! Click the resources on the left to mine. More units unlock with high mineral count.</h6>
    </div>
    `;

  container.innerHTML = content;
}

function save()
{
  window.localStorage.setItem('commandCenter', JSON.stringify(commandCenter));
  window.localStorage.setItem('fighters', JSON.stringify(fighters));
  window.localStorage.setItem('clickers', JSON.stringify(clickUpgrades));
  window.localStorage.setItem('auto', JSON.stringify(automaticUpgrades));
  window.localStorage.setItem('overlords', JSON.stringify(overlords));
  window.localStorage.setItem('startTime', JSON.stringify(startTime));
  window.localStorage.setItem('eventTime', JSON.stringify(eventTimer));
  window.localStorage.setItem('minerals', JSON.stringify(mineralCount));
  window.localStorage.setItem('gas', JSON.stringify(gasCount));
}

function load()
{
  commandCenter = JSON.parse(window.localStorage.getItem('commandCenter'));
  fighters = JSON.parse(window.localStorage.getItem('fighters'));
  clickUpgrades = JSON.parse(window.localStorage.getItem('clickers'));
  automaticUpgrades = JSON.parse(window.localStorage.getItem('auto'));
  startTime = JSON.parse(window.localStorage.getItem('startTime'));
  eventTimer = JSON.parse(window.localStorage.getItem('eventTimer'));
  mineralCount = JSON.parse(window.localStorage.getItem('minerals'));
  gasCount = JSON.parse(window.localStorage.getItem('gas'));
  overlords = JSON.parse(window.localStorage.getItem('overlords'));

  if (!document.getElementById("zergling") && fighters.zergling.quantity > 0)
  {
    addCard("zergling")
  }
  if (!document.getElementById("hydralisk") && fighters.hydralisk.quantity > 0)
  {
    addCard("hydralisk")
  }
}

var startTime = Date.now();
var eventTimer = Date.now();
var eventCountdownTimer = Date.now();
addCard("droneClick");
addCard("droneAuto");
addCard("overlord");
updateCounts();
updateCommandCenter();