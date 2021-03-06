import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {MDCComponent} from '@angular-mdc/web/base';
import {MDCProgressIndicator} from '@material/progress-indicator/component';
import {strings, MDCLinearProgressFoundation, MDCLinearProgressAdapter} from '@material/linear-progress';

@Component({
  moduleId: module.id,
  selector: 'mdc-linear-progress',
  exportAs: 'mdcLinearProgress',
  host: {
    'role': 'progressbar',
    'class': 'mdc-linear-progress',
    '[class.mdc-linear-progress--indeterminate]': '!determinate',
    '[attr.aria-label]': 'label',
    'aria-valuemin': '0',
    'aria-valuemax': '100'
  },
  template: `
  <div class="mdc-linear-progress__buffering-dots"></div>
  <div class="mdc-linear-progress__buffer"></div>
  <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
   <span class="mdc-linear-progress__bar-inner"></span>
  </div>
  <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
   <span class="mdc-linear-progress__bar-inner"></span>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcLinearProgress extends MDCComponent<MDCLinearProgressFoundation>
  implements MDCProgressIndicator, OnInit {
  _root!: Element;

  /* Label indicating how the progress bar should be announced to the user. */
  @Input() label?: string = undefined;

  @Input()
  get progress(): number {
    return this._progress;
  }
  set progress(value: number) {
    this._progress = coerceNumberProperty(value);
    this._foundation.setProgress(this._progress);
    this._changeDetectorRef.markForCheck();
  }
  private _progress = 0;

  @Input()
  get determinate(): boolean {
    return this._determinate;
  }
  set determinate(value: boolean) {
    this._determinate = coerceBooleanProperty(value);
    this._foundation.setDeterminate(this._determinate);
    this._changeDetectorRef.markForCheck();
  }
  private _determinate = false;

  @Input()
  get buffer(): number {
    return this._buffer;
  }
  set buffer(value: number) {
    this._buffer = coerceNumberProperty(value);
    this._foundation.setBuffer(this._buffer);
    this._changeDetectorRef.markForCheck();
  }
  private _buffer = 0;

  @Input()
  get reversed(): boolean {
    return this._reversed;
  }
  set reversed(value: boolean) {
    this._reversed = coerceBooleanProperty(value);
    this._foundation.setReverse(this._reversed);
    this._changeDetectorRef.markForCheck();
  }
  private _reversed = false;

  getDefaultFoundation() {
    const adapter: MDCLinearProgressAdapter = {
      addClass: (className: string) => this._root.classList.add(className),
      forceLayout: () => (<HTMLElement>this._root).offsetWidth,
      getPrimaryBar: () => this._root.querySelector(strings.PRIMARY_BAR_SELECTOR),
      getBuffer: () => this._root.querySelector(strings.BUFFER_SELECTOR),
      hasClass: (className: string) => this._root.classList.contains(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      setStyle: (el: HTMLElement, styleProperty: string, value: string) => el.style.setProperty(styleProperty, value),
      removeAttribute: (name: string) => this._root.removeAttribute(name),
      setAttribute: (name: string, value: string) => this._root.setAttribute(name, value)
    };
    return new MDCLinearProgressFoundation(adapter);
  }
  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) {
    super(elementRef);

    this._root = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (this._platform.isBrowser) {
      this._asyncInitializeFoundation()
        .then(() => {
          this.progress = this._progress;
          this.buffer = this._buffer;
          this.determinate = this._determinate;
          this._changeDetectorRef.markForCheck();
        });
    }
  }

  open(): void {
    this._foundation.open();
  }

  close(): void {
    this._foundation.close();
  }

  async _asyncInitializeFoundation(): Promise<void> {
    this._foundation.init();
  }
}
