import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/shared/services/storage.service';
import { bgImages, images } from '@Global/constants';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly images = bgImages;

  tickets: any[] = [];
  background = localStorage.getItem("background") || bgImages[0];

  constructor(private storageService:StorageService) {
    this.background = this.storageService.backgroundSource.getValue();
    this.storageService.background$.subscribe((bg) => {
      this.background = bg;
    });
  }

  ngOnInit(): void{
  }
}