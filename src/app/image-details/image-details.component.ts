import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  ImageDetails: any;

  constructor(
     private readonly flickrService: FlickrService,
     private readonly activateroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showImageDetails();
  }

  showImageDetails() {
    const imageId = Number(this.activateroute.snapshot.paramMap.get('id'));
    this.flickrService.showImageDetails(imageId).subscribe((data) => {
      this.ImageDetails = data;
    });
  }
}
