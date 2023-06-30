export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            let qualityLimit = 50;

            switch (this.items[i].name) {

                // Special Items
                case 'Backstage passes to a TAFKAL80ETC concert':

                    if (this.items[i].sellIn === 0) {
                        this.items[i].quality = 0;
                    } else if (this.items[i].sellIn <= 5) {
                        this.items[i].quality += 3;
                    } else if (this.items[i].sellIn <= 10) {
                        this.items[i].quality += 2;
                    } else {
                        this.items[i].quality += 1;
                    }

                    break;

                case 'Aged Brie':

                    if (this.items[i].sellIn > 0) {
                        this.items[i].quality += 1;
                    } else {
                        this.items[i].quality += 2;
                    }

                    break;


                case 'Sulfuras, Hand of Ragnaros':
                    qualityLimit = 80;
                    break;
                
                case 'Conjured Mana Cake':

                    if (this.items[i].sellIn > 0) {
                        this.items[i].quality -= 2;
                    } else {
                        this.items[i].quality -= 4;
                    }

                    break;

                // Regular Items
                default:

                    if (this.items[i].sellIn > 0) {
                        this.items[i].quality -= 1;
                    } else {
                        this.items[i].quality -= 2;
                    }

                    break;

            }

            // Cap Qualities
            if (this.items[i].quality > qualityLimit) {
                this.items[i].quality = qualityLimit;
            } else if (this.items[i].quality < 0) {
                this.items[i].quality = 0;
            }

        }

        return this.items;
    }
}
