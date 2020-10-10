import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
})
export class ConsentComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss(accepted: boolean) {
    this.modalController.dismiss({
      accepted,
    });
  }
}
