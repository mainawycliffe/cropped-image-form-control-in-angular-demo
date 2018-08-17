import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  forwardRef,
  Output
} from '@angular/core';
import { NgxCroppieComponent } from 'ngx-croppie';
import { CroppieOptions } from 'croppie';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-image-form-control',
  templateUrl: './custom-image-form-control.component.html',
  styleUrls: ['./custom-image-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomImageFormControlComponent),
      multi: true
    }
  ]
})

/* Implement the OnInit, OnChanges and ControlValueAccessor interfaces */
export class CustomImageFormControlComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  /* Pass the height of the image to this component */
  @Input()
  public imgCropToHeight = '400';

  /* Pass the width of the image to this component */
  @Input()
  public imgCropToWidth = '400';

  /* Return type of our image */
  @Input()
  private responseType: 'blob' | 'base64' = 'base64';

  /* Our cropped image and the value of our image controller */
  public croppieImage;

  /* Options for the cropped image type and size */
  public outputoption = { type: 'blob', size: 'original' };

  /* Element to paint our form control */
  @ViewChild('ngxCroppie')
  ngxCroppie: NgxCroppieComponent;

  constructor() {}

  ngOnInit() {
    /* Size the outputoptions of our cropped imaged - whether is base64 or blob */
    this.outputoption = { type: this.responseType, size: 'original' };
  }

  ngOnChanges(changes: any) {
    if (this.croppieImage) {
      return;
    }

    if (!changes.imageUrl) {
      return;
    }
    if (!changes.imageUrl.previousValue && changes.imageUrl.currentValue) {
      this.croppieImage = changes.imageUrl.currentValue;
      this.propagateChange(this.croppieImage);
    }
  }

  /**
   * Options for croppie, you can learn more about this here -> https://foliotek.github.io/Croppie/
   */

  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.imgCropToWidth, 10),
      height: parseInt(this.imgCropToHeight, 10)
    };
    opts.boundary = {
      width: parseInt(this.imgCropToWidth, 10) + 50,
      height: parseInt(this.imgCropToWidth, 10) + 50
    };

    opts.enforceBoundary = true;
    return opts;
  }

  /**
   * Event to be activated when you select an image
   */
  imageUploadEvent(evt: any) {
    if (!evt.target) {
      return;
    }
    if (!evt.target.files) {
      return;
    }

    if (evt.target.files.length !== 1) {
      return;
    }

    const file = evt.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif' &&
      file.type !== 'image/jpg'
    ) {
      return;
    }

    const fr = new FileReader();
    fr.onloadend = loadEvent => {
      this.croppieImage = fr.result.toString();
    };
    fr.readAsDataURL(file);
  }

  newImageResultFromCroppie(img: string) {
    this.croppieImage = img;
    this.propagateChange(this.croppieImage);
  }

  /* Takes the value  */
  writeValue(value: any) {
    if (value !== undefined) {
      this.croppieImage = value;
      this.propagateChange(this.croppieImage);
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
