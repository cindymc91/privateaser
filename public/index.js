'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

//-------------------------------------//
//STEP 1

function computePrice (barID, eventID){
  var bar, ev;
  for (var i = 0; i < bars.length; i++){
    if(bars[i].id == barID){
      bar = bars[i];
    }
  }

  for (var i = 0; i < events.length; i++){
    if(events[i].id == eventID){
      ev = events[i];
    }
  }
  return ev.time * bar.pricePerHour + ev.persons * bar.pricePerPerson;
}

function updatePrice(events){
  for (var i = 0; i < events.length; i++){
    events[i].price = computePrice(events[i].barId, events[i].id);
    }
  }

updatePrice(events);


//-------------------------------------//
//STEP 2

function computePrice2(barID, eventID){
  var bar, ev;
  for (var i = 0; i < bars.length; i++){
    if(bars[i].id == barID){
      bar = bars[i];
    }
  }

  for (var i = 0; i < events.length; i++){
    if(events[i].id == eventID){
      ev = events[i];
    }
  }
  var newPrice;
  if(ev.persons > 60){
    newPrice = ev.time * bar.pricePerHour + ev.persons * bar.pricePerPerson*0.5;
  }
  else if(ev.persons > 20 ){
    newPrice = ev.time * bar.pricePerHour + ev.persons * bar.pricePerPerson*0.7;
  }
  else if(ev.persons > 10 ){
    newPrice = ev.time * bar.pricePerHour + ev.persons * bar.pricePerPerson*0.9;
  }
  else {
    newPrice = ev.time * bar.pricePerHour + ev.persons * bar.pricePerPerson;
  }

  return newPrice;
}

function updatePrice2(events){
  for (var i = 0; i < events.length; i++){
    events[i].price = computePrice2(events[i].barId, events[i].id);
    }
  }

updatePrice2(events);


//-------------------------------------//
//STEP 3

function updateCommission(events){
  var comm;
  for (var i = 0; i < events.length; i++){
    comm = 0.3 * events[i].price;
    events[i].commission.insurance = comm/2;
    events[i].commission.treasury = events[i].persons;
    events[i].commission.privateaser = comm -   events[i].commission.insurance - events[i].commission.treasury;
    }
}

updateCommission(events);

//-------------------------------------//
//STEP 4

function computePriceIfDeductibleOption(barID, eventID){
  var bar, ev;
  for (var i = 0; i < bars.length; i++){
    if(bars[i].id == barID){
      bar = bars[i];
    }
  }

  for (var i = 0; i < events.length; i++){
    if(events[i].id == eventID){
      ev = events[i];
    }
  }

  var priceDeductible;

  if(ev.options.deductibleReduction == true){
    priceDeductible = ev.persons;
    return computePrice2(barID, eventID) + priceDeductible;
  }

  else{
    return computePrice2(barID, eventID);
  }
}

function updatePrice4(events){
  for (var i = 0; i < events.length; i++){
    events[i].price = computePriceIfDeductibleOption(events[i].barId, events[i].id);
    }
  }

function updateCommissionIfDeductibleOption(events){
  var comm;
  for (var i = 0; i < events.length; i++){
    if(events[i].options.deductibleReduction == true){
      comm = 0.3 * (events[i].price - events[i].persons);
    }
    else{
      comm = 0.3 * events[i].price;
    }
    events[i].commission.insurance = comm/2;
    events[i].commission.treasury = events[i].persons;
    events[i].commission.privateaser = comm - events[i].commission.insurance - events[i].commission.treasury + events[i].persons;
    }
}

updatePrice4(events);
updateCommissionIfDeductibleOption(events);








//-------------------------------------//
//CONSOLE LOG

console.log(bars);
console.log(events);
console.log(actors);
