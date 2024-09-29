import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParksService } from './services/parks.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, ReplaySubject, Subject, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  providers: [ParksService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'skate';

  parks = new ReplaySubject<any>();

  newParkForm = new FormGroup({
    name: new FormControl(''),
    lat: new FormControl(''),
    lng: new FormControl(''),
  });

  constructor(
    private parksService: ParksService,
  ) { }

  ngOnInit(): void {

    this.parksService.getParks().subscribe(res => {
      this.parks.next(res)
    })

    this.newParkForm.valueChanges.subscribe(change => {
      console.log(change)
    })

  }

  public submit() {
    this.parksService.postPark(this.newParkForm.value).subscribe(_ => {

      this.parksService.getParks().subscribe(res => {
        this.parks.next(res)
      })

    })
  }

}
