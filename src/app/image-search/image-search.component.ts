import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})

export class ImageSearchComponent implements OnInit {
  public imageData: any = [];
  public keyword: string | undefined;
  public searchValue = null;

  constructor(private flickrService: FlickrService) { }

  ngOnInit(): void {
  }

  searchImages(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService
        .search_keyword(this.keyword)
        .subscribe((data) => (this.imageData = data));
    }
  }

  onPageScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword).subscribe((data) => {
        this.imageData = this.imageData.concat(data);
      });
    }
  }

}
