
// Global variables
var health = 100;
var points = 0;
var damage = 20;
var slow = 0;
var pointboost = 0;
var autodamage = 0;
var damagecost = 20;
var slowcost = 20;
var pointboostcost = 150;
var autodamagecost = 400;
var imageIndex = 0;
var imageSources = ['gfx/enemy1.png', 'gfx/enemy2.png', 'gfx/enemy3.png'];
var popupTimer;
var prevTop = 0;
var prevLeft = 0;

// Function to update health bar
function updateHealthBar() {
	var healthBar = document.querySelector('.health');
	healthBar.style.width = health + '%';
	if (health <= 0) {
		healthBar.style.width = '0%';
		var imageIndex = Math.floor(Math.random() * 4);
		var min = 10;
		var max = 20;
		var randomPoints = Math.floor(Math.random() * (max - min + 1)) + min;
		if (pointboost > 0) {
		var rawpoint = Math.floor((randomPoints*pointboost/100));
		var totalpoint = rawpoint + randomPoints;
		points += totalpoint;
		showPopup("You gained " + randomPoints + " points! (bonus " + rawpoint +")");
		} else {
		totalpoint = randomPoints;
		points += randomPoints;
		showPopup("You gained " + randomPoints + " points!");
		}
		document.querySelector('.Point-value').textContent = points;
		resetGame();
	if (imageIndex >= imageSources.length) {
		imageIndex = 0;
	}
		document.getElementById('image').src = imageSources[imageIndex];
	}
}

function updateStatsBar() {
	document.querySelector('.stat-damage-value').textContent = damage;
	document.querySelector('.stat-slow-value').textContent = slow + "%";
	document.querySelector('.stat-pointboost-value').textContent = pointboost + "%";
	document.querySelector('.stat-autodamage-value').textContent = autodamage;
}

// Function to reset game
function resetGame() {
	health = 100;
	document.getElementById('image').src = imageSources[imageIndex];
	document.querySelector('.Point-value').textContent = points;
	updateHealthBar();
	updateStatsBar();
}

// Function to handle attack button click
function onAttackButtonClick() {
	health -= damage;
	updateHealthBar();
	randomizeButtonPosition();

}

document.querySelector('.attack-btn').addEventListener('click', onAttackButtonClick);

resetGame();

const buyButtons = document.querySelectorAll('.buy-btn');
const pointValueElement = document.querySelector('.Point-value');


buyButtons.forEach(function (button) {
	button.addEventListener('click', function () {

		const itemPrice = parseInt(this.previousElementSibling.innerText.split(' ')[1]);
		var shopItem = this.parentNode;
		var itemNameElement = shopItem.querySelector('.item-name');
		const currentPointValue = parseInt(pointValueElement.innerText);
    
		if (itemNameElement.textContent === 'Increase Damage') {
			if (points >= itemPrice) {
				points = points - itemPrice;
				damagecost = damagecost+35;
				damage = damage + 10;
				document.querySelector('.Damage-Cost').textContent = damagecost;
				alert('You have successfully purchased the item!');
			} else {
				alert('You do not have enough points to purchase the item.');
			}
		}
		if (itemNameElement.textContent === 'Slow Enemy') {
			if (points >= itemPrice) {
				points = points - itemPrice;
				slowcost = slowcost+150;
				slow = slow + 10;
				document.querySelector('.Slow-Cost').textContent = slowcost;
				alert('You have successfully purchased the item!');
			} else {
				alert('You do not have enough points to purchase the item.');
			}
		}
		if (itemNameElement.textContent === 'Point Booster') {
			if (points >= itemPrice) {
				points = points - itemPrice;
				pointboostcost = pointboostcost+150;
				pointboost = pointboost + 10;
				document.querySelector('.PointBoost-Cost').textContent = pointboostcost;
				alert('You have successfully purchased the item!');
			} else {
				alert('You do not have enough points to purchase the item.');
			}
		}
		if (itemNameElement.textContent === 'Auto Damage') {
			if (points >= itemPrice) {
				points = points - itemPrice;
				autodamagecost = autodamagecost+350;
				autodamage = autodamage + 5;
				document.querySelector('.AutoDamage-Cost').textContent = autodamagecost;
				alert('You have successfully purchased the item!');
			} else {
				alert('You do not have enough points to purchase the item.');
			}
		}
		updateStatsBar();
		document.querySelector('.Point-value').textContent = points;
	});
});


function randomizeButtonPosition() {
  var container = document.querySelector('.right');
  var button = document.querySelector('.attack-btn');
  
  // Get the dimensions of the container
  var containerRect = container.getBoundingClientRect();
  var containerWidth = containerRect.width;
  var containerHeight = containerRect.height;
  
  // Get the dimensions of the button
  var buttonRect = button.getBoundingClientRect();
  var buttonWidth = buttonRect.width;
  var buttonHeight = buttonRect.height;
  
  // Generate random values for the top and left properties
  var maxTop = containerHeight - buttonHeight;
  var maxLeft = containerWidth - buttonWidth;
  var newTop = Math.floor(Math.random() * maxTop);
  var newLeft = Math.floor(Math.random() * maxLeft);
  
  // Set the top and left properties of the button
  button.style.top = newTop + 'px';
  button.style.left = newLeft + 'px';
}


function showPopup(message) {
	var popup = document.getElementById("popup");
	popup.textContent = message;
	popup.style.display = "block";
	clearTimeout(popupTimer);
	popupTimer = setTimeout(hidePopup, 3000);
}

function hidePopup() {
	popup.style.display = "none";
}


setInterval(secondinterval, 1000);

function secondinterval() {
	if (autodamage > 0) {
	health -= autodamage;
	updateHealthBar();
	}
}
