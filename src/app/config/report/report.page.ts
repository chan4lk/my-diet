import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { Progress } from 'src/app/models/progress.model';
import { ProgressService } from 'src/app/services/progress.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, ViewWillEnter {
  progress: Progress[];

  constructor(
    private store: StoreService,
    private progressService: ProgressService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.userData$
      .pipe(
        take(1),
        switchMap((user) => this.progressService.getProgress(user.id))
      )
      .subscribe((progress) => (this.progress = progress.list));
  }
}
