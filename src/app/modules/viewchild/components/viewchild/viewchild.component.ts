import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { delay, of } from 'rxjs';

interface Card {
  title: string;
  content: string;
}

@Component({
  selector: 'app-viewchild',
  templateUrl: './viewchild.component.html',
  styleUrls: ['./viewchild.component.scss'],
})
export class ViewchildComponent implements OnInit, AfterViewInit {
  @ViewChild('staticCard') staticCard!: ElementRef;
  @ViewChildren('dynamicCard') dynamicCards!: QueryList<ElementRef>;

  cards: Card[] = [];

  ngOnInit(): void {
    // Meghívjuk az adatokat a szerverről
    this.fetchData();
  }

  ngAfterViewInit(): void {
    // Miután betöltött a DOM, manipuláljuk a statikus kártyát
    this.manipulateStaticCard();

    // Miután betöltött a DOM feliratkozunk a dinamikus kártyák változásaira, és ha megjött az adat, akkor manipuláljuk
    this.manipulateDynamicCards();
  }

  fetchData(): void {
    of([
      { title: 'Dynamic Card 1', content: 'Content 1' },
      { title: 'Dynamic Card 2', content: 'Content 2' },
      { title: 'Dynamic Card 3', content: 'Content 3' },
    ])
      .pipe(delay(1000))
      .subscribe((cards: Card[]) => {
        this.cards = cards;
      });
  }

  manipulateStaticCard(): void {
    const staticCardNativeElement = this.staticCard.nativeElement as HTMLElement;
    staticCardNativeElement.style.width = '50rem';
  }

  manipulateDynamicCards(): void {
    this.dynamicCards.changes.subscribe((cards: QueryList<ElementRef>) => {
      // A látványosság kedvéért egy kis késleltetés
      setTimeout(() => {
        const dynamicCardsNativeElements: HTMLElement[] = Array.from(
          cards.toArray().map((card: ElementRef) => card.nativeElement)
        );
        dynamicCardsNativeElements.forEach((cardNativeElement: HTMLElement) => {
          cardNativeElement.style.border = '1px solid red';
        });
      }, 1000);
    });
  }
}
