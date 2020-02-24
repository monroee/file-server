import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAboutComponent } from './file-about.component';

describe('FileAboutComponent', () => {
  let component: FileAboutComponent;
  let fixture: ComponentFixture<FileAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
