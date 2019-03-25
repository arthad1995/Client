import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFileDownloadComponent } from './public-file-download.component';

describe('PublicFileDownloadComponent', () => {
  let component: PublicFileDownloadComponent;
  let fixture: ComponentFixture<PublicFileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
