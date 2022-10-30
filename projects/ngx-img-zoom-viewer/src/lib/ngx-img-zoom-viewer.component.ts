import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

export interface ZoomviewerConfig {
  imgHeight?: number;
  megnification?: number;
  priviewBoxSize?: {
    height?: number;
  };
}

@Component({
  selector: 'ngx-img-zoom-viewer',
  template: ``,
  styles: [
    `
      .image_container {
        position: relative;
        display: inline-block;
      }

      .cursor {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
      }

      .img_preview {
        position: fixed;
        top: 10px;
        right: 10px;
        overflow: hidden;
      }

      .img_preview img {
        position: absolute;
      }
    `,
  ],
})
export class NGXImgZoomViewerComponent implements OnInit, OnChanges {
  private host: HTMLElement; // Access for Host Element
  private image!: HTMLImageElement; // Image Element
  private cursor!: HTMLDivElement; // Cursor Element
  private img_preview!: HTMLDivElement; // Image Preview Element

  @Input() config?: ZoomviewerConfig;
  @Input() set src(srcValue: string) {
    if (typeof srcValue === 'string') {
      this._src = srcValue;
      this.createImage();
    } else {
      console.error(
        'src must be of type string, current type found ' + typeof srcValue
      );
    }
  }

  private defaultConfigs = {
    imgHeight: 500,
    megnification: 2.5,
    priviewBoxSize: {
      height: 350,
      width: 350,
    },
  };

  private cursorSize: {
    height: number;
    width: number;
  } = { height: 0, width: 0 };

  private _src: string = '';

  private cursorPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.host = this.renderer.createElement('div');
    this.renderer.addClass(this.host, 'image_container');
    this.renderer.appendChild(el.nativeElement, this.host); // assigning host
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.defaultConfigs.imgHeight =
      this.config?.imgHeight ?? this.defaultConfigs.imgHeight;

    this.defaultConfigs.megnification =
      this.config?.megnification ?? this.defaultConfigs.megnification;

    this.defaultConfigs.priviewBoxSize.height =
      this.config?.priviewBoxSize?.height ??
      this.defaultConfigs.priviewBoxSize.height;

    this.createImage();
  }

  ngOnInit(): void {
    if (!this._src) console.error('unable to read src attribute');
  }

  @HostListener('mouseleave', ['$event'])
  private onMouseLeave(e: MouseEvent) {
    if(this.cursorSize.width < 50 ) return
    this.renderer.removeChild(this.host, this.cursor);
    this.renderer.removeChild(this.host, this.img_preview);
  }

  @HostListener('mouseenter', ['$event'])
  private onMouseEnter(e: MouseEvent) {
    this.checkwidth();
    if(this.cursorSize.width < 50) return
    if (this.host.children.length > 1) {
      this.onMouseLeave(e);
    }
    this.cursor = this.renderer.createElement('div');
    this.renderer.addClass(this.cursor, 'cursor');
    this.renderer.setStyle(
      this.cursor,
      `height`,
      `${this.cursorSize?.height}px`
    );
    this.renderer.setStyle(this.cursor, `width`, `${this.cursorSize?.width}px`);
    this.renderer.appendChild(this.host, this.cursor);
    this.setCursorPosition(e);

    this.img_preview = this.renderer.createElement('div');
    this.renderer.addClass(this.img_preview, 'img_preview');
    this.renderer.setStyle(
      this.img_preview,
      'height',
      `${this.defaultConfigs.priviewBoxSize.height}px`
    );
    this.renderer.setStyle(
      this.img_preview,
      'width',
      `${this.defaultConfigs.priviewBoxSize.width}px`
    );
    this.renderer.appendChild(this.host, this.img_preview);
  }
  @HostListener('mousemove', ['$event'])
  private onMouseMove(e: MouseEvent) {
    if(this.cursorSize.width < 50) return
    this.setCursorPosition(e);
    this.setImgPreview(e);
  }
  private setCursorPosition(e: MouseEvent) {
    /* handling Left & top position for cursor box */
    let cursorPosition = {
      x:
        e.pageX - this.cursorSize?.width / 2 >= 0 // checking if cursor box left is less then 0
          ? e.pageX - this.cursorSize?.width / 2
          : 0, // making sure if it is then only take 0 not negative value
      y:
        e.pageY - this.cursorSize?.height / 2 >= 0 // checking if cursor box top is less then 0
          ? e.pageY - this.cursorSize?.height / 2
          : 0, // making sure if it is then only take 0 not negative value
    };

    /* handling bottom & right position for cursor box */
    if (cursorPosition.x + this.cursorSize?.width > this.image.offsetWidth) {
      // checking if cursor left + cursor width is greater then image width
      // making sure that any single pixel of cursor box can't go out from image respective on width
      cursorPosition.x = this.image.offsetWidth - this.cursorSize?.width;
    }
    if (cursorPosition.y + this.cursorSize?.height > this.image.offsetHeight) {
      // making sure that any single pixel of cursor box can't go out from image respective on height
      cursorPosition.y = this.image.offsetHeight - this.cursorSize?.height;
    }

    /* setting final value */
    this.renderer.setStyle(this.cursor, 'top', `${cursorPosition.y}px`); // setting cursor box position for y axis
    this.renderer.setStyle(this.cursor, 'left', `${cursorPosition.x}px`); // setting cursor box position for x axis

    this.cursorPosition = cursorPosition; // saving data to global variable
  }
  private setImgPreview(e: MouseEvent) {
    const zoomedImage = this.renderer.createElement('img'); // created new local image element
    this.renderer.setAttribute(zoomedImage, 'src', this._src); // setting src for local image element
    this.renderer.setStyle(
      zoomedImage,
      'height',
      `${this.image.offsetHeight * this.defaultConfigs.megnification}px`
    ); // changed zoomed image height based on real image
    this.renderer.setStyle(
      zoomedImage,
      'width',
      `${this.image.offsetWidth * this.defaultConfigs.megnification}px`
    ); // changed zoomed image width based on real image
    this.renderer.setStyle(
      zoomedImage,
      'top',
      `-${this.cursorPosition.y * this.defaultConfigs.megnification}px`
    ); // changed zoomed image position based on cursor position
    this.renderer.setStyle(
      zoomedImage,
      'left',
      `-${this.cursorPosition.x * this.defaultConfigs.megnification}px`
    ); // changed zoomed image position based on cursor position
    this.img_preview.innerHTML = '';
    this.renderer.appendChild(this.img_preview, zoomedImage); // added image into img_preview box
  }

  private createImage() {
    this.host.innerHTML = '';
    this.image = this.renderer.createElement('img');
    this.renderer.setAttribute(this.image, 'src', this._src);
    this.renderer.addClass(this.image, 'main_image');
    this.renderer.setStyle(
      this.image,
      'height',
      this.defaultConfigs.imgHeight + 'px'
    );
    this.renderer.appendChild(this.host, this.image);
  }

  private checkwidth() {
    const def =
      this.image.x +
      this.image.offsetWidth +
      this.defaultConfigs.priviewBoxSize.width +
      10 -
      window.innerWidth +
      10;

    if (def >= 0) {
      this.defaultConfigs.priviewBoxSize.width =
        this.defaultConfigs.priviewBoxSize.width - def;
    } else {
      const def2 =
        this.image.x +
        this.image.offsetWidth +
        this.defaultConfigs.priviewBoxSize.height +
        10 -
        window.innerWidth + 10;
      if (def2 >= 0)
        this.defaultConfigs.priviewBoxSize.width =
          this.defaultConfigs.priviewBoxSize.height - def2;
      else
        this.defaultConfigs.priviewBoxSize.width =
          this.defaultConfigs.priviewBoxSize.height;
    }

    this.cursorSize.height =
      this.defaultConfigs.priviewBoxSize.height /
      this.defaultConfigs.megnification;

    this.cursorSize.width =
      this.defaultConfigs.priviewBoxSize.width /
      this.defaultConfigs.megnification;
  }
}