import { Component, OnInit, inject } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-listall',
  templateUrl: './listall.page.html',
  styleUrls: ['./listall.page.scss'],
})
export class ListallPage implements OnInit {

  private storage: Storage = inject(Storage);
  public listImg: Array<any> = new Array();

  constructor() { }

  ngOnInit() {

    let storageRef = ref(this.storage);

    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(itemRef)
            .then((response) => {
              this.listImg.push(response);
            })
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });


  }

}
