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
  participantColors = ['#e9674f', '#f0c45b', '#6a9a73', '#5b8fa5', '#e6a45e', '#9c789c'];
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
    const previousColors = new Map(this.participants.map((participant, index) => [participant, this.participantColors[index]]));
    const colors = ['#e9674f', '#f0c45b', '#6a9a73', '#5b8fa5', '#e6a45e', '#9c789c'];
    this.participants = this.participantText.split('\n').map((participant) => participant.trim()).filter(Boolean);
    this.participantColors = this.participants.map((participant, index) => previousColors.get(participant) ?? colors[index % colors.length]);
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
        this.participantColors = this.participantColors.filter((_, index) => index !== winnerIndex);
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

  wheelBackground(): string {
    const segmentSize = 360 / Math.max(this.participants.length, 1);
    const segments = this.participants.map((_, index) => {
      const start = index * segmentSize;
      const end = (index + 1) * segmentSize;
      return `${this.participantColors[index]} ${start}deg ${end}deg`;
    });

    return `conic-gradient(${segments.join(', ')})`;
  }
}
