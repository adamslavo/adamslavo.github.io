
( function ( $ ) {
	'use strict';

	$( function() {

		ostryaMaps();

		/**
         * Init Google maps
         */
        function ostryaMaps() {
            if (ostryaShortCode.length === 0 || typeof ostryaShortCode.map === 'undefined') {
                return;
            }
            var styles =
            	[
                    {
				        'featureType': 'landscape',
				        'elementType': 'all',
				        'stylers': [
				            { 'saturation': -100 },
				            { 'lightness': 65 },
				            { 'visibility': 'on' }
				        ]
				    },
				    {
						'featureType': 'water',
						'elementType': 'geometry',
						'stylers': [
							{ 'hue': '#009cff' },
							{ 'saturation': 94 },
							{ 'lightness': 4 },
							{ 'visibility': 'on' }
						]
					},{
						'featureType': 'water',
						'elementType': 'labels',
						'stylers': [
							{ 'hue': '#444444' },
							{ 'saturation': -100 },
							{ 'lightness': -65 },
							{ 'visibility': 'off' }
						]
					},{
						'featureType': 'road',
						'elementType': 'geometry',
						'stylers': [
							{ 'hue': '#ffffff' },
							{ 'saturation': -100 },
							{ 'lightness': 100 },
							{ 'visibility': 'on' }
						]
					},{
						'featureType': 'road.highway',
						'elementType': 'labels',
						'stylers': [
							{ 'hue': '#bababa' },
							{ 'saturation': -100 },
							{ 'lightness': 25 },
							{ 'visibility': 'on' }
						]
					},{
						'featureType': 'road.arterial',
						'elementType': 'all',
						'stylers': [
							{ 'hue': '#bababa' },
							{ 'saturation': -100 },
							{ 'lightness': -5 },
							{ 'visibility': 'on' }
						]
					},{
						'featureType': 'poi',
						'elementType': 'all',
						'stylers': [
							{ 'hue': '#f2f2f2' },
							{ 'saturation': -100 },
							{ 'lightness': 77 },
							{ 'visibility': 'on' }
						]
					},{
						'featureType': 'poi',
						'elementType': 'labels',
						'stylers': [
							{ 'hue': '#444444' },
							{ 'saturation': -100 },
							{ 'lightness': -66 },
							{ 'visibility': 'simplified' }
						]
					},{
						'featureType': 'administrative',
						'elementType': 'labels',
						'stylers': [
							{ 'hue': '#444444' },
							{ 'saturation': 0 },
							{ 'lightness': -48 },
							{ 'visibility': 'simplified' }
						]
					},{
						'featureType': 'road.arterial',
						'elementType': 'geometry',
						'stylers': [
							{ 'hue': '#e6e6e6' },
							{ 'saturation': -100 },
							{ 'lightness': 57 },
							{ 'visibility': 'on' }
						]
					}
                ],
                customMap = new google.maps.StyledMapType(styles,
                    {name: 'Styled Map'});

            var mapOptions = {
                scrollwheel: false,
                draggable: true,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                scaleControl: false,
                streetViewControl: false

            };

            var bounds = new google.maps.LatLngBounds();
            var infoWindow = new google.maps.InfoWindow(), marker, i, map;


            $.each(ostryaShortCode.map, function (id, mapData) {
                // Display a map on the page
                mapOptions.zoom = parseInt(mapData.zoom, 10);
                mapOptions.mapTypeControlOptions = {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                };

                map = new google.maps.Map(document.getElementById(id), mapOptions);
                map.mapTypes.set('map_style', customMap);
                map.setMapTypeId('map_style');
                for (i = 0; i < mapData.number; i++) {
                    var lats = mapData.lat,
                        lng = mapData.lng,
                        info = mapData.info;

                    var position = new google.maps.LatLng(lats[i], lng[i]);
                    bounds.extend(position);

                    // Create marker options
                    var markerOptions = {
                        map: map,
                        position: position
                    };
                    if (mapData.marker) {
                        markerOptions.icon = {
                            url: mapData.marker
                        };
                    }

                    // Init marker
                    marker = new google.maps.Marker(markerOptions);

                    // Allow each marker to have an info window
                    googleMaps(infoWindow, map, marker, info[i]);

                    // Automatically center the map fitting all markers on the screen
                    map.fitBounds(bounds);
                }

            });
        }

        function googleMaps(infoWindow, map, marker, info) {
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(info);
                infoWindow.open(map, marker);
            });
        }

	} );
} )( jQuery );
