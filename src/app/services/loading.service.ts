import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = false;

  constructor(
    private loadingController: LoadingController,
  ) { }

  async present(message) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: message,
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
