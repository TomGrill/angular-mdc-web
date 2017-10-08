import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: '[mdc-permanent-drawer-spacer], mdc-permanent-drawer-spacer'
})
export class MdcPermanentDrawerSpacerDirective {
  @HostBinding('class.mdc-permanent-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-permanent-drawer-content], mdc-permanent-drawer-content'
})
export class MdcPermanentDrawerContentDirective {
  @HostBinding('class.mdc-permanent-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-permanent-drawer-selected]'
})
export class MdcPermanentDrawerSelectedDirective {
  @HostBinding('class.mdc-permanent-drawer--selected') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-permanent-drawer',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdcPermanentDrawerComponent {
  @Input() fixed: boolean = false;
  @HostBinding('class.mdc-permanent-drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';
  @HostBinding('class.mdc-permanent-drawer--fixed') get classFixed(): string {
    return this.fixed ? 'mdc-permanent-drawer--fixed' : '';
  }

  constructor(private _root: ElementRef) { }
}
