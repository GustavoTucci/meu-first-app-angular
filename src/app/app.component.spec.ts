import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should start with the default participants', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.participants.length).toBe(6);
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Quem vai levar');
  });

  it('should remove the winner from the list when enabled', () => {
    jasmine.clock().install();
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.removeWinner = true;
    app.participants = ['Ana', 'Bruno'];
    app.participantText = app.participants.join('\n');
    spyOn(Math, 'random').and.returnValue(0);

    app.spin();
    jasmine.clock().tick(4600);

    expect(app.result).toBe('Ana');
    expect(app.participants).toEqual(['Bruno']);
    jasmine.clock().uninstall();
  });
});
