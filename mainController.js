'use strict';

var oyayaApp = angular.module('oyayaApp', ['ngRoute', 'ngMaterial', 'ngResource']);

oyayaApp.controller('MainController', ['$scope', '$routeParams', '$rootScope', '$location', '$resource', '$http',
    function ($scope, $routeParams, $rootScope, $location, $resource, $http) {

        
        var framesMax = 19;
        var myInterval;
        var $window = $(window);
        var prevX = -1;
        var mousePressed = false;
        var divData = new Map();
        var btnData = new Map();
        var playing = true;

        // Get the modal
        var modal = document.getElementById('vidModal');

        // Get the button that opens the modal
        var btn = document.getElementById("playButton");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        var animationFrame = document.getElementById('animate-frame');

    	$scope.form = {};
    	$scope.form.clientName = '';
    	$scope.form.city = '';
        $scope.form.comData = '';
        $scope.form.submitSuccess = false;
        $scope.button = {};
        $scope.button.blue = false;
        $scope.button.white = true;
        $scope.button.orange = false;
        $scope.button.gray = false;
        $scope.button.brown = false;

        var currActiveButton = 'white';

        var currPos = 0;

        function isScrolledIntoView($elem, $window) {
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        function isScrolledBeforeElem($elem, $window) {
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = $elem.offset().top;

            return elemTop > docViewBottom;
        }

        function rotateOyaya(event) {
            var x = (event.clientX - prevX)/150;
            prevX = event.clientX;
            if(prevX < 0) return;
            var elem = document.getElementById('oyayaAnimation');
            for(var i = 0; i < 20; i++) {
                if(i >= Math.abs(x)) return;
                if(x < 0) {
                    elem.style.backgroundPosition = currPos + ((960/1440) * 100) + "vw";
                    currPos += (960/1440) * 100;
                    console.log(elem.style.backgroundPosition);
                } else {
                    elem.style.backgroundPosition = currPos - ((960/1440) * 100) + "vw";
                    currPos -= (960/1440) * 100;
                    console.log(elem.style.backgroundPosition);
                }
            }
        }

        function rotateOyayaTouch(event) {
            var touch = event.targetTouches[0];
            console.log(touch.pageX + ", " + prevX);
            var x = (touch.pageX - prevX)/150;
            prevX = touch.pageX;
            if(prevX < 0) return;
            var elem = document.getElementById('oyayaAnimation');
            for(var i = 0; i < 20; i++) {
                if(i >= Math.abs(x)) return;
                if(x < 0) {
                    console.log("negative");
                    elem.style.backgroundPosition = currPos + ((960/1440) * 100) + "vw";
                    currPos += (960/1440) * 100;
                    console.log(elem.style.backgroundPosition);
                } else {
                    console.log("postive");
                    elem.style.backgroundPosition = currPos - ((960/1440) * 100) + "vw";
                    currPos -= (960/1440) * 100;
                    console.log(elem.style.backgroundPosition);
                }
            }
        }


        document.getElementById("animate-frame").addEventListener("mousedown", function(event) {
            mousePressed = true;
        });

        document.getElementById("animate-frame").addEventListener("mouseup", function(event) {
            mousePressed = false;
            if(!playing) {
                document.getElementById("oyayaAnimation").style.backgroundPosition = 0 + "px";
                $("#oyayaAnimation").addClass("animate");
                playing = true;
            }
        });

        document.getElementById("animate-frame").addEventListener("mousemove", function(event) {
            if(mousePressed) {
                if(playing) {
                    $("#oyayaAnimation").removeClass("animate");
                    document.getElementById("oyayaAnimation").style.backgroundPosition = 0 + "px";
                    playing = false;
                }
                rotateOyaya(event);
            }
        });

        document.getElementById("animate-frame").addEventListener("touchend", function(event) {
            if(!playing) {
                document.getElementById("oyayaAnimation").style.backgroundPosition = 0 + "px";
                $("#oyayaAnimation").addClass("animate");
                playing = true;
            }
        });

        document.getElementById("animate-frame").addEventListener("touchmove", function(event) {
            if(playing) {
                $("#oyayaAnimation").removeClass("animate");
                document.getElementById("oyayaAnimation").style.backgroundPosition = 0 + "px";
                playing = false;
            }
            rotateOyayaTouch(event);
        });

        $(document).on("scroll", function() {
            if(isScrolledIntoView($('.speech-bubble-1'), $window)) {
                $('.speech-bubble-1').addClass("animate");
            }
            if(isScrolledIntoView($('.speech-bubble-2'), $window)) {
                $('.speech-bubble-2').addClass("animate");
            }
            if(isScrolledIntoView($('.speech-bubble-3'), $window)) {
                $('.speech-bubble-3').addClass("animate");
            }
            if(isScrolledIntoView($('.speech-bubble-4'), $window)) {
                $('.speech-bubble-4').addClass("animate");
            }
        });

        $(document).on("scroll", function() {
            if(isScrolledBeforeElem($('#speech-frame'), $window)) {
                $('.speech-bubble-1').removeClass("animate");
                $('.speech-bubble-2').removeClass("animate");
                $('.speech-bubble-3').removeClass("animate");
                $('.speech-bubble-4').removeClass("animate");
            }
        });

        $(document).on("scroll", function() {
            var time = new Date();
            var timestamp = time.getTime();
            if(isScrolledIntoView($('#opening-frame'), $window)) {
                divData.set(timestamp, 'div1');
            }
            if(isScrolledIntoView($('#video-frame'), $window)) {
                divData.set(timestamp, 'div2');
            }
            if(isScrolledIntoView($('#speech-frame'), $window)) {
                divData.set(timestamp, 'div3');
            }
            if(isScrolledIntoView($('#shake-frame'), $window)) {
                divData.set(timestamp, 'div4');
            }
            if(isScrolledIntoView($('#stats-frame'), $window)) {
                divData.set(timestamp, 'div5');
            }
            if(isScrolledIntoView($('#animate-frame'), $window)) {
                divData.set(timestamp, 'div6');
            }
            if(isScrolledIntoView($('#spec-frame'), $window)) {
                divData.set(timestamp, 'div7');
            }
            if(isScrolledIntoView($('#user-form-frame'), $window)) {
                divData.set(timestamp, 'div8');
            }
            console.log(divData);
        });

        //on button click tracking

        $('#scroll-button').on("click", function() {
            if(!btnData.has("scroll")) {
                btnData.set("scroll", 1);
            } else {
                btnData.set("scroll", btnData.get("scroll") + 1);
            }
            console.log(btnData);
        });

        $('#playButton').on("click", function() {
            if(!btnData.has("play")) {
                btnData.set("play", 1);
            } else {
                btnData.set("play", btnData.get("play") + 1);
            }
            console.log(btnData);
        });

        $('#white-button-sprite').on("click", function() {
            if(!btnData.has("white-btn")) {
                btnData.set("white-btn", 1);
            } else {
                btnData.set("white-btn", btnData.get("white-btn") + 1);
            }
            console.log(btnData);
        });

        $('#blue-button-sprite').on("click", function() {
            if(!btnData.has("blue-btn")) {
                btnData.set("blue-btn", 1);
            } else {
                btnData.set("blue-btn", btnData.get("blue-btn") + 1);
            }
            console.log(btnData);
        });

        $('#orange-button-sprite').on("click", function() {
            if(!btnData.has("orange-btn")) {
                btnData.set("orange-btn", 1);
            } else {
                btnData.set("orange-btn", btnData.get("orange-btn") + 1);
            }
            console.log(btnData);
        });

        $('#gray-button-sprite').on("click", function() {
            if(!btnData.has("gray-btn")) {
                btnData.set("gray-btn", 1);
            } else {
                btnData.set("gray-btn", btnData.get("gray-btn") + 1);
            }
            console.log(btnData);
        });

        $('#brown-button-sprite').on("click", function() {
            if(!btnData.has("brown-btn")) {
                btnData.set("brown-btn", 1);
            } else {
                btnData.set("brown-btn", btnData.get("brown-btn") + 1);
            }
            console.log(btnData);
        });

    	$scope.scrollToForm = function() {
    		$('html,body').animate({
        	scrollTop: $("div[name=userFormFrame]").offset().top},
        	'slow');
		};

		$scope.scrollToTop = function() {
			$('html,body').animate({
            scrollTop: $("div[name=userFormFrame]").offset().top},
            'slow');
		};

		$scope.changeCityText = function(city) {
			$scope.form.city = city;
		};

        var normalizeButton = function(color) {
            if(color == 'white') {
                 document.getElementById("white-button-sprite").style.borderRadius = "50%";
                 document.getElementById("white-button-sprite").style.height = "1.9vw";
                 document.getElementsByClassName("button-arrow")[0].style.opacity = '0';
                 $scope.button.white = false;
            } else if(color == 'blue') {
                document.getElementById("blue-button-sprite").style.borderRadius = "50%";
                document.getElementById("blue-button-sprite").style.height = "1.9vw";
                document.getElementsByClassName("button-arrow")[1].style.opacity = '0';
                $scope.button.blue = false;
            } else if(color == 'orange') {
                document.getElementById("orange-button-sprite").style.borderRadius = "50%";
                document.getElementById("orange-button-sprite").style.height = "1.9vw";
                document.getElementsByClassName("button-arrow")[2].style.opacity = '0';
                $scope.button.orange = false;
            } else if(color == 'gray') {
                document.getElementById("gray-button-sprite").style.borderRadius = "50%";
                document.getElementById("gray-button-sprite").style.height = "1.9vw";
                document.getElementsByClassName("button-arrow")[3].style.opacity = '0';
                $scope.button.gray = false;
            } else if(color == 'brown') {
                document.getElementById("brown-button-sprite").style.borderRadius = "50%";
                document.getElementById("brown-button-sprite").style.height = "1.9vw";
                document.getElementsByClassName("button-arrow")[4].style.opacity = '0';
                $scope.button.brown = false;
            } 
        };

        $scope.addAnimation = function(elem) {
            var animation = document.getElementById('oyayaAnimation');
            if(elem == currActiveButton) return;
            currPos = 0;
            if(elem == 'white') {    
                $scope.button.white = true;
                animation.style.backgroundImage = "url('images/6/oyaya_model/white-oyaya-sprite-2.png')";
                document.getElementById('animate-frame').style.backgroundColor = '#DCDCDC';
                document.getElementById("white-button-sprite").style.borderRadius = "50%  50%  50%  50%  / 60%   60%   40%  40%";
                document.getElementById("white-button-sprite").style.height = "calc(1.9vw * 1.2)";
                document.getElementsByClassName("button-arrow")[0].style.opacity = '1';
            } else if(elem == 'blue') {
                $scope.button.blue = true;
                animation.style.backgroundImage = "url('images/6/oyaya_model/blue-oyaya-sprite-2.png')";
                document.getElementById('animate-frame').style.backgroundColor = '#d5ebf4';
                document.getElementById("blue-button-sprite").style.borderRadius = "50%  50%  50%  50%  / 60%   60%   40%  40%";
                document.getElementById("blue-button-sprite").style.height = "calc(1.9vw * 1.2)";
                document.getElementsByClassName("button-arrow")[1].style.opacity = '1';
            } else if(elem == 'orange') {
                $scope.button.orange = true;
                document.getElementById('oyayaAnimation').style.backgroundImage = 
                "url('images/6/oyaya_model/orange-oyaya-sprite-2.png')";
                document.getElementById('animate-frame').style.backgroundColor = '#ffddbe';
                document.getElementById("orange-button-sprite").style.borderRadius = "50%  50%  50%  50%  / 60%   60%   40%  40%";
                document.getElementById("orange-button-sprite").style.height = "calc(1.9vw * 1.2)";
                document.getElementsByClassName("button-arrow")[2].style.opacity = '1';
            } else if(elem == 'gray') {
                $scope.button.gray = true;
                document.getElementById('oyayaAnimation').style.backgroundImage = 
                "url('images/6/oyaya_model/gray-oyaya-sprite-2.png')";
                document.getElementById('animate-frame').style.backgroundColor = '#ecefe4';
                document.getElementById("gray-button-sprite").style.borderRadius = "50%  50%  50%  50%  / 60%   60%   40%  40%";
                document.getElementById("gray-button-sprite").style.height = "calc(1.9vw * 1.2)";
                document.getElementsByClassName("button-arrow")[3].style.opacity = '1';
            } else if(elem == 'brown') {
                $scope.button.brown = true;
                document.getElementById('oyayaAnimation').style.backgroundImage = 
                "url('images/6/oyaya_model/brown-oyaya-sprite-2.png')";
                document.getElementById('animate-frame').style.backgroundColor = '#e9b4ae';
                document.getElementById("brown-button-sprite").style.borderRadius = "50%  50%  50%  50%  / 60%   60%   40%  40%";
                document.getElementById("brown-button-sprite").style.height = "calc(1.9vw * 1.2)";
                document.getElementsByClassName("button-arrow")[4].style.opacity = '1';
            } 
            animation.style.backgroundPosition = 0 + "px";
            normalizeButton(currActiveButton);
            currActiveButton = elem;
        };

    	$scope.submitForm = function() {
            console.log($scope.form.comData);
    		console.log($scope.form.clientName);
    		console.log($scope.form.city);

            /**
    	
    		if($scope.form.comData == "" || $scope.form.clientName == '' || $scope.form.city == '') {
    			alert("Please fill out all items.");
    		} else {
    			console.log("Saving data...");
                var userData = $resource('/submitForm');
                userData.save({client_name:$scope.form.clientName, 
                    city:$scope.form.city, contact_info:$scope.form.comData}, function(data) {
                  }, function errorHandling(err) {
                        if(err) {
                          alert("Submit error: please try again later.");
                        } else {
                            $scope.form.submitSuccess = true;
                        }
                });
    		}
            */
            $scope.form.submitSuccess = true;
            console.log("Saving data...");
            var userData = $resource('/submitForm');
            userData.save({client_name:$scope.form.clientName, 
                city:$scope.form.city, contact_info:$scope.form.comData, div_track:divData, btn_track:btnData}, function(data) {
              }, function errorHandling(err) {
                    if(err) {
                      alert("Submit error: please try again later.");
                    }
                });
    	};

        // When the user clicks on the button, open the modal 
        $scope.playVideo = function() {
            modal.style.display = "block";
            document.getElementById("oyaya-video").play();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById("oyaya-video").pause();
            }
        }

        window.ontouchstart = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById("oyaya-video").pause();
            }
        }
        

    }]);

