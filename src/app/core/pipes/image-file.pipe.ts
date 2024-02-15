import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFile'
})
export class ImageFilePipe implements PipeTransform {

  transform(imgFile: string | undefined): string {
    const defaultImg = "assets/jpeg/no-image.jpg"
    return imgFile && imgFile.trim() !== '' ? imgFile : defaultImg
  }

}
