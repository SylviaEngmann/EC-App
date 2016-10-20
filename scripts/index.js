(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	var watchID;
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		document.getElementById("capturePhoto").onclick = function() {
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
				quality : 50,

				destinationType : destinationType.DATA_URL
			});
		}
		  
		// document.getElementById("barcode").onclick = function(){
 	// 		cordova.plugins.barcodescanner.scan(barcodeSuccess, barcodeError,
 	// 			{preferFrontCamera: false, // iOS and Android
  //         		showFlipCameraButton: true, // iOS and Android
  //         		prompt:"Place a barcode inside the scan area" // supported on Android only
  //         		formats:QR_CODE,PDF_417, // default: all but PDF_417 and RSS_EXPANDED
  //         		orientation:landscape} // Android only (portrait|landscape), default unset so it rotates with the device
		// )};

  		document.getElementById("geolocationB").onclick = function(){
  			navigator.geolocation.getCurrentPosition(onSuccessPos,
  														onErrorPos,
  														{ timeout: 30000,
  		  										enableHighAccuracy: true });
  		}
  	
  			watchID = navigator.geolocation.watchPosition(onSuccess,
  		 													onError,
  		  										{ timeout: 30000,
  		  										enableHighAccuracy: true });	
  		
  		
	};

	function onPhotoDataSuccess(imageData) {

		var smallImage = document.getElementById('smallImage');

		smallImage.style.display = 'block';

		smallImage.src = "data:image/jpeg;base64," + imageData;

	}

	function onFail(message){

		alert('Failed because: ' + message);

	}
	function onSuccessPos(position){
		var element = document.getElementById('geolocationB');
		element.innerHTML = 'Latitude: '+position.coords.latitude +
								'<br/'+
							'Longitude:' +position.coords.longitude +
								'<br/'+
							'<hr />' element.innerHTML;
	}
	function onErrorPos(error){
		alert('code:' + error.code +'\n'+
				'message' +error.message + '\n');
	}
	function onSuccess(position){
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: '+position.coords.latitude +
								'<br/'+
							'Longitude:' +position.coords.longitude +
								'<br/'+
							'<hr />' element.innerHTML;
	}
	function onError(error){
		alert('code:' + error.code +'\n'+
				'message' +error.message + '\n');
	}
	
	function barcodeSuccess(result) {
        alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }
    function barcodeError (error) {
        alert("Scanning failed: " + error);
          
      };
})();
