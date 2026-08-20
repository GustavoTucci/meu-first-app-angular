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

  it('should create one color segment per participant', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.participants = ['Ana', 'Bruno'];
    expect(app.wheelBackground()).toContain('#e9674f 0deg 180deg');
    expect(app.wheelBackground()).toContain('#f0c45b 180deg 360deg');

    app.participants = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa'];
    expect(app.wheelBackground()).toContain('#e9674f 0deg 72deg');
    expect(app.wheelBackground()).toContain('#e6a45e 288deg 360deg');
  });

  it('should keep each remaining participant color after removal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.participants = ['Ana', 'Bruno', 'Carla'];
    app.participantText = app.participants.join('\n');
    app.participantColors = ['#e9674f', '#f0c45b', '#6a9a73'];

    app.participantText = 'Ana\nCarla';
    app.syncParticipants();

    expect(app.participantColors).toEqual(['#e9674f', '#6a9a73']);
  });
});
