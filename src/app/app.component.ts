import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  participants = ['Ana Souza', 'Bruno Lima', 'Carla Mendes', 'Diego Rocha', 'Elisa Martins', 'Felipe Costa'];
  participantText = this.participants.join('\n');
  history: string[] = [];
  result = '';
  isSpinning = false;
  rotation = 0;
  showAllHistory = false;
  removeWinner = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedHistory = window.localStorage.getItem('sorteio-history');
      if (savedHistory) this.history = JSON.parse(savedHistory);
    }
  }

  syncParticipants(): void {
    this.participants = this.participantText.split('\n').map((participant) => participant.trim()).filter(Boolean);
    this.result = '';
  }

  spin(): void {
    this.syncParticipants();
    if (this.isSpinning || this.participants.length < 2) return;
    const winnerIndex = Math.floor(Math.random() * this.participants.length);
    const segmentSize = 360 / this.participants.length;
    const targetAngle = 360 - (winnerIndex * segmentSize + segmentSize / 2);
    this.isSpinning = true;
    this.result = '';
    this.rotation += 1440 + targetAngle - (this.rotation % 360);
    window.setTimeout(() => {
      this.result = this.participants[winnerIndex];
      this.history = [this.result, ...this.history].slice(0, 20);
      if (this.removeWinner) {
        this.participants = this.participants.filter((_, index) => index !== winnerIndex);
        this.participantText = this.participants.join('\n');
      }
      this.isSpinning = false;
      this.saveHistory();
    }, 4600);
  }

  clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }

  private saveHistory(): void {
    if (typeof window !== 'undefined') window.localStorage.setItem('sorteio-history', JSON.stringify(this.history));
  }
}
