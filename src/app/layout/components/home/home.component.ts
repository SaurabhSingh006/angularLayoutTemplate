import { AppService } from '../../../app.service';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavStatus: boolean = true; 

  constructor(
    private appService: AppService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) { }

  ngOnInit() {
    this.appService.sidebarStatus$.subscribe(res => this.sidenavStatus = res);
    //If mobile device update isMobileDevice$ inside app service
    this.mediaMatcher();
  }

  mobileQuery: any;
  _mobileQueryListener: any;

  mediaMatcher() {
    //Code here for knowing whether the screen is mobile or desktop
    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => {
      //Open sidenav for desktop 
      if(!this.mobileQuery.matches) {
        this.appService.sidebarStatus$.next(true);
      }
      return this.changeDetectorRef.detectChanges();
    }  
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onMenuClick() {
    this.appService.sidebarStatus$.next(!this.sidenavStatus);
  }

  onSidenavLinkClick() {
    if(this.mobileQuery.matches) {
      this.appService.sidebarStatus$.next(!this.sidenavStatus);
    }
  }

}
