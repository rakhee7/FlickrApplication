import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageDetails } from '../common/Models/ImageDetails';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  prevKeyword: string | undefined;
  currentPage = 1;

  constructor(private http: HttpClient) { }
  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this.prevKeyword = keyword;
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currentPage}`;

    return this.http.get(url + params).pipe(
      map((res: any) => {
        const urlArr: any[] = [];
        res.photos.photo.forEach((data: ImageDetails) => {
          const photoObj = {
            url: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}`,
            title: data.title,
            id: data.id,
            owner: data.owner,
            description: data.description,
          };
          urlArr.push(photoObj);
        });
        return urlArr;
      })
    );
  }

  showImageDetails(imageId: number) {
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&';
    const params = `api_key=${environment.flickr.key}&photo_id=${imageId}&format=json&nojsoncallback=1`;
    let imageDetails: any;

    return this.http.get(url + params).pipe(
      map((data: any) => {
        const imageDetails = {
          url: `https://live.staticflickr.com/${data.photo.server}/${data.photo.id}_${data.photo.secret}`,
          id: data.photo.id,
          title: data.photo.title,
          owner: data.photo.owner.username,
          description: data.photo.description._content == "" ? "No Description" : data.photo.description._content,
          isfavorite: data.photo.isfavorite == 0 ? "Mark as favorite" : "Yes",
          notes: data.photo.notes,
          lastupdate: data.photo.dates.lastupdate,
          datePosted: data.photo.dates.posted,
          media: data.photo.dates.media,
       };

        return imageDetails;
      })
    );
  }

}
