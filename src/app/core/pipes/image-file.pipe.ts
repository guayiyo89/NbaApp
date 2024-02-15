import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image-file'
})
export class ImageFilePipe implements PipeTransform {

  transform(imgFile: string): string {
    const defaultImg = "assets/jpeg/no-image.jpg"
    return imgFile && imgFile.trim() !== '' ? imgFile : defaultImg
  }

}
