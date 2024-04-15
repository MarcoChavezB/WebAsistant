import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { GoogleMap, MapMarker} from '@angular/google-maps';
import { Renderer2, ElementRef } from '@angular/core';
import { environment } from '@environments/environments';
import { SensordataserviceService } from '@services/SensorDataService/sensordataservice.service';
import { DeviceService } from '@services/DeviceService/device.service';
import { EchoService } from '@services/Echo/echo.service';
@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker,
    CommonModule
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  constructor(private renderer: Renderer2, private el: ElementRef, private sensorservice: SensordataserviceService, private deviceservice: DeviceService, private echoservice: EchoService) {}


  @ViewChild(GoogleMap, { static: false }) map!:GoogleMap;

  private mapApiLoaded: boolean = false;
  loaded = false;


    darkThemeStyles: google.maps.MapTypeStyle[] = [
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ];
    
    

    options: google.maps.MapOptions = {
      styles: this.darkThemeStyles
    };

    

    markerOptions: google.maps.MarkerOptions = {
      icon: {
        url: 'assets/backImage.png',
      },
      draggable: false
    };
    
  
    center: google.maps.LatLngLiteral = {lat:  25.534824, lng:-103.334487};

    ngOnInit(){

        this.loadGoogleMapsApi().then(() => {
          this.loaded = true;
          this.mapApiLoaded = true;
          this.initializeMap();

          setTimeout(() => {
            this.gpsdata()
            this.echoservice.listenToNewGpsData((data) => {
              console.log('Datos del evento:', data);
              this.gpsdata()
            });
          }, 5000);

        }).catch((error) => {
          console.error('Error loading Google Maps API', error);
        });
    }

    ngOnDestroy() {
      this.echoservice.leaveChannel('gpschann')
    }

    gpsdata() {
      this.sensorservice.getGpsData(this.deviceservice.getStoredIdDevice()).subscribe(
        (data) => {
          const coordenadas = data.data[0].Valor;
          if (coordenadas) {
            const splitCoords = coordenadas.split(',').map(coord => parseFloat(coord.trim()));
            if (splitCoords.length === 2) {
              this.animateMarker(splitCoords[0], splitCoords[1]);
              console.log(splitCoords[0], splitCoords[1])
            } else {
              console.error('Formato de coordenadas incorrecto', coordenadas);
            }
          } else {
            console.error('No se encontraron coordenadas en la respuesta', data);
          }
        },
        (err) => {
          console.error('Error al obtener datos del GPS:', err);
        }
      );
    }
    


    private loadGoogleMapsApi(): Promise<any> {
      
      return new Promise((resolve, reject) => {
        if (window['google'] && window['google'].maps) {
          resolve(window['google'].maps);
          return;
        }
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}`; 
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(this.el.nativeElement, script);
        script.onload = () => {
          if (window['google'] && window['google'].maps) {
            resolve(window['google'].maps);
          } else {
            reject('Google maps no está disponible');
          }
        };
      });
    }

    
    private initializeMap() {

      if (!this.mapApiLoaded) return;

      this.options = {
        styles: this.darkThemeStyles
      };
  
      this.markerOptions = {
        icon: {
          url: 'assets/backImage80.png',
        },
        draggable: false
      };

    }

    zoom: number = 15; 
        
    markerPositions: google.maps.LatLngLiteral[] = [];


    animateMarker(newLat: number, newLng: number) {
      const deltaLat = (newLat - this.center.lat) / 100;
      const deltaLng = (newLng - this.center.lng) / 100;
    
      let i = 0;
      const moveMarker = () => {
        i++;
        this.center.lat += deltaLat;
        this.center.lng += deltaLng;
    
        this.markerPositions[0] = { lat: this.center.lat, lng: this.center.lng };
        if (this.map) {
          this.map.panTo(new google.maps.LatLng(this.center.lat, this.center.lng));
        }
    
        if (i < 100) {
          requestAnimationFrame(moveMarker);
        }
      };
    
      moveMarker();
    }
    
}
