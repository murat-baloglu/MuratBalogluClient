import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../../services/common/models/home.service';
import { CarouselImageModel } from '../../../../../contracts/models/carousel-image-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrl: './carousel-section.component.css'
})
export class CarouselSectionComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  carouselImages: CarouselImageModel[];
  carouselImagesCount: number;

  getCarouselImages(): void {
    this.homeService.getCarouselImages().subscribe({
      next: (data: CarouselImageModel[]) => {
        this.carouselImages = data;
        this.carouselImagesCount = data.length;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getCarouselImages();
  }

}
