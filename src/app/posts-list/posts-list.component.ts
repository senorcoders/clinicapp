import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PostsListService } from '../posts-list.service';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { IPost } from '../ipost';

@Component({
  selector: 'tsel-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', 
        [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger('50ms',
            animate('550ms ease-out',
            style({ opacity: 1, transform: 'translateY(0px)' } ) ) )
        ], { optional: true })
      ])
    ])
  ]
})
export class PostsListComponent implements OnInit {
  route: string;
  cat: string;
  posts: IPost[];
  constructor( private _postlistService: PostsListService, location: Location, router: Router, private aroute: ActivatedRoute) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
    });
    
    
    
  }

  ngOnInit() {
    this._postlistService.getPostCategories()
    .subscribe( data => this.posts = data );
  }

}
