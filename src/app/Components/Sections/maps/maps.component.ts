import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';


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
    center: google.maps.LatLngLiteral = {lat:  55.437871, lng: -112.011785};
    ngOnInit(){
        this.lastMarket(this.center);
    }
    zoom: number = 4; 
        
    markerOptions: google.maps.MarkerOptions = {draggable: false};
    markerPositions: google.maps.LatLngLiteral[] = [];

    lastMarket(coords: google.maps.LatLngLiteral) {
        this.markerPositions = [];
        this.markerPositions.push(coords);    
    }
}
