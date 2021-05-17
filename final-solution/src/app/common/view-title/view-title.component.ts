import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-view-title',
    templateUrl: './view-title.component.html',
    styleUrls: ['./view-title.component.scss']
})
export class ViewTitleComponent {
    @Input()
    text: string;
}
