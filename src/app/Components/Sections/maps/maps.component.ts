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
  

    darkThemeStyles: google.maps.MapTypeStyle[] = [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
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
      this.echoservice.listenToAllEvents('gps-channel', (data, event) => {
        console.log('Evento recibido:', event);
        console.log('Datos del evento:', data);
      });
        this.loadGoogleMapsApi().then(() => {
          this.mapApiLoaded = true;
          this.initializeMap();
          
        }).catch((error) => {
          console.error('Error loading Google Maps API', error);
        });
    }

    ngOnDestroy() {

    }

    gpsdata(){
      this.sensorservice.getGpsData(this.deviceservice.getStoredIdDevice()).subscribe(
        (data)=>{
        

        }, 
        (err)=>{


        }
      )
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
