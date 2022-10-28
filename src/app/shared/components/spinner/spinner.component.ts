import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading$: BehaviorSubject<boolean> =  this.spinnerService.isLoading$;

  constructor(private readonly spinnerService: SpinnerService) {}
}
